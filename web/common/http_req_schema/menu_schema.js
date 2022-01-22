exports.menuSaveSchema = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Menu title is required'
        }
    }
}


exports.menuIsActiveSchema = {
    isActive: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Is Active flag is required'
        }
    }
}
