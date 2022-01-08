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

const _address_line1 = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'address line 1 is required',
    }
}

const _required = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'this field is required',
    }
}

exports.branchSaveSchema = {
    name: _name,
    code: _code
}

exports.branchAddressSchema = {
    formattedAddress: _address_line1,
    cityId: _required,
    latLng: _required
}
