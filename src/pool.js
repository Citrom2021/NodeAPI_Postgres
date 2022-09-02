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

 // this approach via class supporting multiple DB conn
 
 class Pool {
    _pool = null;

    connect(options) {
        this._pool = new pg.Pool(options);
        return this._pool.query('SELECT 1 + 1');
    }

    close() {
        return this._pool.end();
    }

    // BIG SECURITY ISSUE HERE TO FIX! -> fixed via params and array in repo
    query(sql,params) {
        return this._pool.query(sql, params);
    }
 }

 module.exports = new Pool();
 