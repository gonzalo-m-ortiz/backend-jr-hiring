const sift = require('sift');
const { BadRequest, NotFound, ServerError } = require('./test/utils/errors');

class Server {
    constructor(db) {
        this.db = db;
    }

    async find(collectionName, query) {
        try {
            const response = this.db[collectionName].filter(sift(query));
    
            // check response is empty
            if (Array.isArray(response) && !response.length) {
                return new NotFound();
            }
    
            return response;
        } catch (err) {
            return new ServerError(err.message);
        }
    }

    async findOne(collectionName, documentId) {
        try {
            const response = this.db[collectionName].find(document => document.id === documentId);
    
            // check response is empty
            if (!response) {
                return new NotFound(`No data found with the id equal as "${documentId}".`);
            }
    
            return response;
        } catch (err) {
            return new ServerError(err.message);
        }
    }

    async updateOne(collectionName, documentId, dataToUpdate) {
        try {
            const documentIndex = this.db[collectionName].findIndex(document => document.id === documentId);

            // check if document exists
            if (documentIndex === -1) {
                return new NotFound(`No data for update found with the id equal as "${documentId}".`);
            }

            const documentUpdated = Object.assign(this.db[collectionName][documentIndex], dataToUpdate);

            return documentUpdated;
        } catch (err) {
            return new ServerError(err.message);
        }
    }
}

module.exports = Server;
