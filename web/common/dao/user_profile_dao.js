var { query } = require('../../db');


exports.updateUserProfile = async(userProfile) => {
    let params = {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName
    }
    let sql = `insert into auth_user_profile(id, first_name, last_name) values (UUID_TO_BIN(:id), :firstName, :lastName) 
    on duplicate key update first_name = :firstName, last_name = :lastName;
    select up.first_name as firstName, up.last_name as lastName, concat_ws(' ', up.first_name, up.last_name) as fullName 
    from auth_user_profile up where up.id = UUID_TO_BIN(:id)`;
    return query(sql, params);
}
