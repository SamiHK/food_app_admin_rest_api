const _name = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'name is required',
    }
}
const _code = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'code is required',
    }
}
const _address = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'address is required',
    }
}

exports.branchSaveSchema = {
    name: _name,
    code: _code
}
