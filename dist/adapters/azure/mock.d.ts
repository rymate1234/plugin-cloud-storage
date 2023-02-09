export namespace BlobServiceClient {
    function fromConnectionString(): {
        getContainerClient: () => {
            createIfNotExists: () => null;
        };
    };
}
