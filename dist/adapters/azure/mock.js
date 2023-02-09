"use strict";
exports.BlobServiceClient = {
    fromConnectionString: function () { return ({
        getContainerClient: function () { return ({
            createIfNotExists: function () { return null; },
        }); },
    }); },
};
//# sourceMappingURL=mock.js.map