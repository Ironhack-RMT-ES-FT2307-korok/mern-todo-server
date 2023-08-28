const router = require("express").Router();

const Todo = require("../models/Todo.model")

// aqui van todas nuestras rutas de Todo

// GET "/api/todo" => enviar solo los titulos de todos los Todo
router.get("/", async (req, res, next) => {

  try {
    
    // 1. buscar la data en BD
    // 2. pedirle que me de los titulos de los Todo
    const response = await Todo.find().select({title: 1})
    // 3. enviar la info al lado del cliente
    res.json(response)

  } catch (error) {
    next(error)
  }

})

// POST "/api/todo" => recibir data para crear un nuevo Todo
router.post("/", async (req, res, next) => {

  try {
    
    // 1. recibir la data del FE
    console.log(req.body)

    // 2. crear el Todo
    await Todo.create({
      title: req.body.title,
      description: req.body.description,
      isUrgent: req.body.isUrgent
    })

    // 3. enviarle una respuesta al FE de que todo bien
    res.json("Todo bien, documento creado")

  } catch (error) {
    next(error)
  }

})

// GET "/api/todo/:todoId" => envia los detalles de un Todo por su id
router.get("/:todoId", async (req, res, next) => {

  try {
    
    const response = await Todo.findById(req.params.todoId)

    res.json(response)

  } catch (error) {
    next(error)
  }


})


// DELETE "/api/todo/:todoId" => borrar un documento por su id
router.delete("/:todoId", async (req, res, next) => {

  const { todoId } = req.params

  try {
    
    await Todo.findByIdAndDelete(todoId)
    res.json("documento borrado")

  } catch (error) {
    next(error)
  }

})

// PUT "/api/todo/:todoId" => actualizar toda la info de un Todo
router.put("/:todoId", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)
  const { title, description, isUrgent } = req.body

  try {
    
    const response = await Todo.findByIdAndUpdate(req.params.todoId, {
      title, 
      description, 
      isUrgent
    }, { new: true })

    res.json(response)


  } catch (error) {
    next(error)
  }

})

// diferencia entre PUT y PATCH
// PUT => se usa para actualizar TODO el documento
// PATCH => es una actualizacion parcial, solo voy a editar alguna de las propiedades


module.exports = router;
