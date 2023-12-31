import express from 'express'
import __dirname from '../dirname.js'
import handlebars from 'express-handlebars'
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import mongoose from 'mongoose'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.routes.js'
import Handlebars from "handlebars";


const app = express()
const port = 8080

app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  }))
app.set('views',__dirname + '/src/views')
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewsRouter)




app.listen(port,() => {
    console.log("Server listening in port: " + port)
})

mongoose
    .connect('mongodb://127.0.0.1:27017/segunda_entrega')
    .then( db => console.log(`-> sucessfuly connected to database.`) )
    .catch( err => console.error(`-> can't connect to database due to following error: ${err}.`) )