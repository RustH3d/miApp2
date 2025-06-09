const { Pool } = require("pg");

/* const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recetas",
  password: "bionicle2006",
  port: 5432,
}); */

const pool= new pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV==='production'
})

module.exports = pool;
