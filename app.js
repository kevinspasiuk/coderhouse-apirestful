const express = require('express');

const productosRouter = require('./routes/productos');

const app = express()
const port = process.env.port || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.use('/api/productos',productosRouter)

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
  
server.on('error', error => console.log('Error on server: ', error))
  