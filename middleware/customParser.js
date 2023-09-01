const customParser = () => {
    //this parser to make all the fields in both express.json and formidable
    //in the same request .body
    return function (request, response, next) {
      if (request.fields) {
        request.body = request.fields
        delete request.fields;
        return next()
      }
      return next()
    }
  
  };

module.exports = customParser