const express =require('express')
const app =express()
const mongoose =require('mongoose')
const path = require("path")
const productRoutes =require('./routes/productRoute')
const cors =require('cors')

const router = require("./routes/route");
const bodyParser =require('body-parser')
const productRouter =require("./routes/productRoute")


app.use(cors())
app.use(bodyParser.json()); 

app.use(express.urlencoded({ extended: false }))
app.use('/user',router)
app.use('/product',productRouter) 
PORT=process.env.PORT||5000;

mongoose.connect("mongodb://localhost:27017/ProductAPI",{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log(`connected to database`))





app.listen(PORT ,()=>console.log(`server started at ${PORT}`))