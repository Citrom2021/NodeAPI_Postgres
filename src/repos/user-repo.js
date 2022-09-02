const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case')
//async operation

// Option 3 via static methods -> no need to call instance class
class UserRepo {
    static async find() {

        const {rows} = await pool.query(`SELECT * FROM users;`);

        /*
        // parsing from _ SQL standard to Js standard camelCase
        const parsedRows = rows.map( row => {
            const replaced = {};

            //iterating in rows and replacing _
            for (let key in row) {
                const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
                $1.toUpperCase().replace('_','')
                );
                
                replaced[camelCase] = row[key];
            }

            return replaced;
        });*/

        return toCamelCase(rows);

        //return parsedRows;

        // result.rows // array of results

    }

    static async findById(id) {
        // SEC ISSUE to fix jsut test => http://localhost:3005/users/1;DROP TABLE users; => right now allowed -> SQL injection
        // SELECT * FROM users WHERE id = ${id} LIMIT 1 -> string concat -> to avoid
        const {rows} = await pool.query(`
        SELECT * FROM users WHERE id = $1;`, 
        [id]); //[id, username]); // SELECT * FROM users WHERE id = $1 AND username = $2;
        // array to fix SQL injection
        return toCamelCase(rows)[0];

    }

    static async insert( username, bio) {
        const {rows} = await pool.query(
            'INSERT INTO users(username, bio) VALUES ($1, $2) RETURNING *;',
        [username,bio]
        );

        return toCamelCase(rows)[0];

    }

    static async update(id, username, bio) {
        const {rows} = await pool.query(
            'UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;',
        [username,bio,id]
        );

        return toCamelCase(rows)[0];

    }

    static async delete(id){

        const {rows} = await pool.query(
            'DELETE from users WHERE id = $1 RETURNING *;',
        [id]
        );

        return toCamelCase(rows)[0];

    }

    static async count() {

        const {rows} = await pool.query( 'SELECT COUNT(*) FROM users;');

        return parseInt(rows[0].count);
    }

}

// In another file...
// UserRepo.insert()
// UserRepo.findById()

module.exports = UserRepo;

/* Option 1 => plain obejct and couple of functions
module.exports = {

    find() {

    },

    findById() {

    },

    insert() {

    },
}
*/ 

/* Option 2 -> Instance functions

class UserRepo {
    find() {

    }

    findById() {

    },

    insert() {

    }

}

module.exports = new UserRepo(); // instance of class 1st to access functions
*/
