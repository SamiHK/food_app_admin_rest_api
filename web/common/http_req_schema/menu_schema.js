exports.menuSaveSchema = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Menu title is required'
        }
    }
}
