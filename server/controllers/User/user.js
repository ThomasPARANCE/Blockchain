const pool = require('../../core/pool');


function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        console.log("Debut fonction user find");
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'pseudo';
            console.log(field);
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = '${user}'`;
        pool.query(sql, function(err, result) {
            if(err) throw err
            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },
    login : function(username, password, callback)
    {
        // find the user data by his username.
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                console.log()
                if(password  == user.password) {
                    // return his data.
                    callback(user);
                    return;
                } else {
                    callback(null);
                    return;
                }
            }
            // if the username/password is wrong then return null.
            callback(null);
            return;
        });
    }

}

module.exports = User;