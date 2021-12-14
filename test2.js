const { ServerError, NotFound } = require('./test/utils/errors');

module.exports = async function Test2 (server, queries) {
    try {
        const response = await server.query(queries); // Will return an array with the results, empty array or error
        const responseParsed = JSON.parse(response);
        
        if (Array.isArray(responseParsed) && !responseParsed.length) {
            return new NotFound(); // return NotFound error if array is empty
        }

        return responseParsed;
    } catch (err) {
        if (err instanceof ServerError) {
            return err;
        }
        
        return new ServerError(err.message);
    }
}
