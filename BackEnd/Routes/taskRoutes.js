const router = require('express').Router()
const taskControllers = require('../Controllers/taskControllers')

router.get('/tasks', taskControllers.getTasks)

router.post('/add', taskControllers.addTask)

router.put('/update/:id', taskControllers.updateTask)

router.delete('/delete/:id', taskControllers.deleteTask)

router.get('/usertasks/:id', taskControllers.getUserTasks)

module.exports = router