"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'fish_user',
    host: 'localhost',
    password: 'password',
    database: 'fish',
    port: 5432
});
