const fs = require('fs');
require('dotenv').config({ override: true });
const mysql = require('mysql2/promise');

const logStream = fs.createWriteStream('debug_output.txt');
function log(msg) {
    console.log(msg);
    logStream.write(msg + '\n');
}

async function debug() {
    log("Starting debug...");
    log(`DB_HOST: '${process.env.DB_HOST}'`);
    log(`DB_USER: '${process.env.DB_USER}'`);
    log(`DB_PASSWORD: '${process.env.DB_PASSWORD}'`);
    log(`DB_NAME: '${process.env.DB_NAME}'`);

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };

    // Test createConnection
    try {
        log("Testing createConnection...");
        const conn = await mysql.createConnection(config);
        log("✅ createConnection SUCCESS");
        await conn.end();
    } catch (err) {
        log(`❌ createConnection FAILED: ${err.message}`);
    }

    // Test createPool
    try {
        log("Testing createPool...");
        const pool = mysql.createPool(config);
        const conn = await pool.getConnection(); // Helper to test
        log("✅ createPool SUCCESS");
        conn.release();
    } catch (err) {
        log(`❌ createPool FAILED: ${err.message}`);
    }
}

debug().catch(err => log(`Fatal: ${err}`));
