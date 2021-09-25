var express = require('express');
var router = express.Router();
const Contenedor = require('../model/contenedor.js')

const productos = new Contenedor()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(productos.getAll());
});

router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);

  try{
    const producto = productos.getById(id)
    res.send(producto)
  } catch (err) {
    res.statusCode = 404
    res.send({ "error": 'producto no encontrado'})
  }
});

router.post('/', function(req, res, next) {
  const producto = req.body
  const id = productos.save(producto)
  res.send(productos.getById(id));
});

router.put('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const producto = req.body
  try{
    productos.replaceById(producto, id)
    res.send( productos.getById(id) );
  } catch (err){
    res.statusCode = 404
    res.send({ "error": 'producto no encontrado'})
  }
});

router.delete('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    productos.deleteById(id)
    res.send({"message": 'Borrado ok'});
  } catch (err){
    res.statusCode = 404
    res.send({ "error": 'producto no encontrado'})
  }
});


module.exports = router;
