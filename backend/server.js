const express= require('express')
const app= express()
const cors= require('cors')
require('dotenv').config();
const usersRoutes= require('./routes/users')
const recipesRoutes= require('./routes/recipes')
const groupsRoutes= require('./routes/groups')
//const PORT= process.env.PORT || 3000
const {Pool}= require({pg})

app.use(cors())
app.use(express.json())

app.use('/users',usersRoutes)
app.use('/recipes',recipesRoutes)
app.use('/groups',groupsRoutes)

app.get('/',(req,res)=>{
    res.send('Backend funcionando')
})

const pool= new pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV==='production'
})

/* const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recetas",
  password: "bionicle2006",
  port: 5432,
}); */

module.exports= pool

/* app.listen(PORT,()=>{
    console.log(`Corriendo en el puerto http://localhost:${PORT}`)
}) */