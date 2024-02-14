import { Pool } from 'pg';

export const pool = new Pool({
    user: 'fish_user',
    host: 'localhost',
    password: 'password',
    database: 'fish',
    port: 5432
});