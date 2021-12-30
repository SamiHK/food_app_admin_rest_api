_username = {
    in : ['body'],
    notEmpty: {
        errorMessage: 'Username or email is required',
    }
}

_email = {
    in : ['body'],
    isEmail: {
        errorMessage: 'Invalid email ',
    }
}

_password = {
    in : ['body'],
    errorMessage: 'Password is required',
    notEmpty: {}
}

_confirm_password = {
    in : ['body'],
    notEmpty: {
        errorMessage : 'Confirm password is required'
    },
    custom: {
        options: (value, {req}) => {
            if( value != undefined && value != null && value != '' && value !== req.body.password ){
                throw new Error('Password confirmation is incorrect');
            } 
            return true;
        }
    }
}

exports.userLoginSchema = {
    username: _username,
    password: _password
}

exports.userRegisterSchema = {
    email: _email,
    password: _password,
    confirm_password: _confirm_password,
}

exports.managerRegisterSchema = {
    username: _username
}

exports.emailSchema = {
    email: _email
}

exports.updatePasswordSchema = {
    password: _password,
    confirmPassword: _confirm_password,
}
