const userDao = require('../dao/user_dao');


exports.getUsers = async (req, res) => {
    try {
        const users = await userDao.getUsers();
        res.send(users)
    } catch (err) {
        res.send({
            error: err
        })        
    }
}

exports.getUser = async (req, res) => {
    try {
        usernameOrEmail = req.params.usernameOrEmail;
        console.log(`username: ${usernameOrEmail}`);
        const user = await userDao.getUser(usernameOrEmail);
        res.send(user);        
    } catch (err) {
        res.send({
            error: err
        })
    }
}