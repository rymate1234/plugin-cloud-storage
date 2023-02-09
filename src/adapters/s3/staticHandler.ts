import path from 'path'
import type { Readable } from 'stream'
import type * as AWS from '@aws-sdk/client-s3'
import type { CollectionConfig } from 'payload/types'
import type { StaticHandler } from '../../types'
import { getFilePrefix } from '../../utilities/getFilePrefix'

interface Args {
  getStorageClient: () => AWS.S3
  bucket: string
  collection: CollectionConfig
}

export const getHandler = ({ getStorageClient, bucket, collection }: Args): StaticHandler => {
  return async (req, res, next) => {
    try {
      const prefix = await getFilePrefix({ req, collection })

      const object = await getStorageClient().getObject({
        Bucket: bucket,
        Key: path.posix.join(prefix, req.params.filename),
      })

      res.set({
        'Content-Length': object.ContentLength,
        'Content-Type': object.ContentType,
        ETag: object.ETag,
      })

      if (object?.Body) {
        return (object.Body as Readable)
          .pipe(res)
          .on('error', err => {
            // eslint-disable-next-line
            req.payload.logger.error(`S3 Stream Error with ${req.params.filename}`)
            console.log(object)
            req.payload.logger.error(err)
          })
          .on('close', () => {
            req.payload.logger.info(`S3 Stream Closed for ${req.params.filename}`)
          })
      }

      return next()
    } catch (err: unknown) {
      req.payload.logger.error(err)
      return next()
    }
  }
}
