import React, { useContext, useEffect, useState } from 'react';
import Task from './Task';
import axios from 'axios'
import { UserIdContext } from '../Contexts/UserIdContext';
import * as Icon from 'react-bootstrap-icons'
import { MDBInput } from 'mdb-react-ui-kit';
import { APIPathContext } from '../Contexts/APIPathContext';

export default function TaskList(props) {
    axios.defaults.withCredentials = true
    let APIpath = useContext(APIPathContext)

    const days = ["Mondy", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let day = days[new Date().getDay()-1]

    let [tasks, setTasks] = useState([]);
    const  userId = useContext(UserIdContext)
    
    useEffect(() => {
        (async () => {
            await axios.get(`${APIpath}/task/usertasks/${userId}`)
                .then((res) => {
                    if (res) {
                        console.log(res.data)
                        setTasks(res.data.tasks)
                    } else {
                        console.log("Data not found!")
                    }
                })
                .catch(err => console.log(err))
        })();
    }, [userId, APIpath])


    // Add Task
    let [ isWriting, setIsWriting ] = useState(false)
    let [task, setTask] = useState("");

    function toggleInput() {
        setIsWriting(!isWriting)
    }

    function handleAddTask(e) {
        e.preventDefault();

        axios.post(`${APIpath}/task/add`, {title: task, userId: userId})
        .then((res) => {
            let newArray = [...tasks, res.data.task]
            setTasks(newArray);
            setIsWriting(!isWriting)
        })
        .catch(err => console.log(err))

    }


    return (

        <div className='main-task-list-container'>
            <h3 className='fw-bold mb-0 day text-white mb-5'> {day} </h3>
            {

                tasks.map((task) => {
                    return (
                        < Task title={task.title} id={task._id} tasks={tasks} setTasks={setTasks}/>
                    )
                })

            }


            {/* Add Task */}
            {
                !isWriting && <div onClick={toggleInput} className="add-task-container mb-5">

                    <div className='d-flex align-items-center'>

                        <Icon.Plus className="plus" size="20px" />
                        <div className='ms-3'>
                            <p className='fw-light mb-0'>Add task</p>
                        </div>
                    </div>

                </div>
            }

            {
                isWriting && <div className="add-task-container mb-5">

                    <div className='d-flex align-items-center'>
                        <form onSubmit={handleAddTask} className="addTaskForm" action="addtask" style={{display: 'grid', gridAutoColumns: '1fr 100px', width: '100%'}}>
                            <MDBInput type="text" size="sm" className="addTaskInput my-2" placeholder="Task name" autoFocus required onChange={(e) => setTask(e.target.value)}/>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '.25em'}}>
                                <button type='button' className="text-white bg-danger mr-2" onClick={() => setIsWriting(!isWriting)}>Cancel</button>
                                <button type="submit" className="text-white ml-2">Add task</button>
                            </div>
                        </form>
                    </div>

                </div>
            }
        </div>
    );
}