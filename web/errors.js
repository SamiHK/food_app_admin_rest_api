class CustomError extends Error {
    code = null;
    name = null;
    message = null;
    constructor(message, name = 'Error', code = 'ERROR'){
        super(message)
        this.message = message
        this.code = code
        this.name = name
    }
}

exports.CustomError = CustomError