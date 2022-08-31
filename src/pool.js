const pg = require ('pg');

// NORMALLY , create a pool like this: BUT this approach doesn't work well multiple DB

/*
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork2nodeAPI',
    user: 'DBusername',
    password: 'DBpassword'
  });

 module.exports = pool;
  
 */

 class Pool {
    _pool = null;

    connect(options) {
        this._pool = new pg.Pool(options)
    }
 }

 module.exports = new Pool();
 