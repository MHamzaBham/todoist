import React, { useContext, useState } from "react";
import {  MDBInput } from 'mdb-react-ui-kit';
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios'
import { APIPathContext} from "../Contexts/APIPathContext";

export default function Task(props) {
    axios.defaults.withCredentials = true;
    let APIpath = useContext(APIPathContext)
    
    let [isEditing, setIsEditing] = useState(false);
    let [isCompleted, setIsCompleted] = useState(false)

    function deleteTask(e) {
        axios.delete(`${APIpath}/task/delete/${e.currentTarget.id}`)
            .then((res) => {
                if(res.data.message === 'success') {
                    let newArray = props.tasks.filter((task) => task._id !== props.id);
                    props.setTasks(newArray);
                }
            })
            .catch((err) => console.log(err))
    }

    let [editedTask, setEditedTask] = useState(props.title);
    function handleEditTask(e) {
        axios.put(`${APIpath}/task/update/${props.id}`, {title: editedTask})
            .then((res) => {
                setEditedTask(res.data.task.title)
            })
            .catch((err) => console.log(err))
        setIsEditing(!isEditing);
    }

    function handleTaskComplete() {
        setIsCompleted(!isCompleted)
        axios.put(`${APIpath}/task/update/${props.id}`, {isCompleted: isCompleted})
            .then((res) => {
                // alert("Congrats on task completion" + isCompleted);
            })
            .catch((err) => console.log(err))
    }


    return (
        <>


            {
                !isEditing && <div className="task-container">
                    <div className='d-flex align-items-center text-container'>
                        <div
                            style={{ width: '20px', height: '20px', border: '1px solid', cursor: 'pointer' }}
                            className='rounded-circle complete-circle' onClick={handleTaskComplete}
                        >
                            <Icon.Check2 className="tick" />
                        </div>
                        <div className='ms-3 text-container' >
                            {
                                isCompleted && <p className='fw-bold mb-0 text completedTask text-success'> {editedTask} </p>
                            }
                            {
                                !isCompleted && <p className='fw-bold mb-0 text'> {editedTask} </p>
                            }
                        </div>
                    </div>

                    <div>
                        <Icon.PencilFill className="pencil mx-2 icon" style={{ cursor: 'pointer' }} id={props.id} onClick={() => setIsEditing(!isEditing)} />
                        <Icon.TrashFill className="trash icon" style={{ cursor: 'pointer' }} id={props.id} onClick={deleteTask} />
                    </div>
                </div>
            }


            {

                isEditing && <div className="">
                    <div className="add-task-container mb-2">

                        <div className='d-flex align-items-center'>
                            <form onSubmit={handleEditTask} className="addTaskForm" action="addtask" style={{ display: 'grid', gridAutoColumns: '1fr 100px', width: '100%' }}>
                                <MDBInput value={editedTask} type="text" size="sm" className="editTaskInput my-2" placeholder={props.title} autoFocus onChange={(e) => setEditedTask(e.target.value)} />
                                <button type="submit" className="text-white">Edit task</button>
                            </form>
                        </div>

                    </div>

                </div>

            }
        </>
    )
}