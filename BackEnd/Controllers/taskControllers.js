const Task = require('../Models/tasks.model')


const getTasks = (req, res) => {
    res.json("Here are all the tasks")
}

const addTask = async (req, res) => {
    let {title, description, userId} = req.body
    await Task.create({title, description, userId})
    .then((task) => {
        res.json({message: 'success', task: task})
    })
    .catch(err => res.json(err))
}

const updateTask = async (req, res) => {
    const id = req.params.id
    const updatedTask = req.body

    await Task.findByIdAndUpdate(id, updatedTask, {new: true})
    .then((task) => {
        res.json({message: "success", task: task})
    })
    .catch(err => res.json(err))
}

const deleteTask = (req, res) => {
    const id = req.params.id

    Task.deleteOne({_id: id})
    .then((task) => {
        res.json({message: 'success', task: task})
    })
    .catch(err => res.json(err))
}


const getUserTasks = (req, res) => {
    const id = req.params.id

    Task.find({userId: id})
    .then((tasks) => {
        res.json({message: "success", tasks: tasks})
    })
    .catch((err) => res.json(err))
}

module.exports = {getTasks, addTask, updateTask, deleteTask, getUserTasks}