class ValidationError{
    constructor(message, httpStatus,status, extensionCode){
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = status
        this.extensionCode = extensionCode
    }
}

module.exports = ValidationError;