import mysql from 'mysql2/promise'; /// promise => is allow to use await and async functions 
import conf from './config/conf.js';

// Create a connection pool with promises
const pool = mysql.createPool({
  connectionLimit: 10, // Number of connections to maintain
  host: conf.profileproHost,
  user: conf.profileproUser,
  password: conf.profileproPassword,
  database: conf.profileproDatabase,
});

export default pool;
