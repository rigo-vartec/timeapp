
const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNNECTION_LOST'){
            console.error('LA CONEXION FUE CERRADA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION FUE RECHAZADA');
        }
    }

    if (connection) connection.release();
    console.log('BASE DE DATOS CONECCTADA');
    return;
});

//convertir callbacks a promesas
pool.query = promisify(pool.query);

module.exports = pool;