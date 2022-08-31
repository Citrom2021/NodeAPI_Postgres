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

    static async findById() {

    }

    static async insert() {

    }

    static async update() {

    }

    static async delete(){

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