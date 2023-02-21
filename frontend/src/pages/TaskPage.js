import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import './TaskPage.css'
import DateTimePicker from 'react-datetime-picker'
import DropDownComponent from '../components/DropDownComponent.js'
import { deleteTask, updateTask, createTask } from './../ApiCaller.js'
import { reload } from './../Helper.js'

const TaskPage = ({ match, history }) => {

    let taskId = match.params.id
    let [task, setTask] = useState(null)

    useEffect(() => {
        getTask()
    }, [taskId, null])

    const returnToProjectsPage = () => {
        if(task?.project == null)
            history.push(`/project/Inbox/`) //by default a new note with no project selected will be assigned to Inbox
        else
            history.push(`/project/${task.project}/`)
        reload()
    }

    const onChange = (e) => {
        changeDeadline(e.toISOString())
    }

    const getTask = async () => {
        if (taskId === 'new') {
            changeTitle('')
            return
        }
        let response = await fetch(`/api/tasks/${taskId}/`)
        let data = await response.json()
        setTask(data)
    }

    const taskCreate = async () => {
        createTask(task)
        
        returnToProjectsPage()
    }

    const taskUpdate = async () => {
        updateTask(taskId, task)
        
        returnToProjectsPage()
    }

    const taskDelete = () => {
        deleteTask(taskId)
        returnToProjectsPage()
    }

    const handleSubmit = () => {
        if (taskId !== 'new' && task?.title === '') {
            taskDelete()
        } else if (taskId !== 'new' && task?.title !== '') {
            taskUpdate()
        } else if (task?.description && taskId === 'new') {
            taskCreate()
        }
        returnToProjectsPage()
    }
    
    const handleChangeProject = (value) => {
        setTask(task => ({ ...task, 'project': value }))    
    }

    const handleChange = (value) => {
        setTask(task => ({ ...task, 'description': value }))
    }

    const changeTitle = (value) => {
        setTask(task => ({ ...task, 'title': value }))
    }

    const changeDeadline = (value) => {
        setTask(task => ({ ...task, 'deadline': value }))
    }

    const handleCheck = () => {
        setTask(task => ({...task, 'completed': !task.completed}))
    }

    const getDeadline = (task) => {
        if (task == null || task.deadline == null){
            return null
        }
        return new Date(task.deadline)
    }
    
    return (
        <div className="task" >
            <div className="task-header">
                <h3 id="arrow-left">
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {taskId !== 'new' ? (
                    <button id="delete-btn" onClick={taskDelete}>Delete</button>
                ) : (
                    <button id="done-btn" onClick={handleSubmit}>Done</button>
                )}
                </div>
                
            <label>Task:</label>
                <textarea 
                className='textarea title' 
                onChange={(e) => { changeTitle(e.target.value) }} 
                value={task?.title}>
                </textarea>
            <br></br>
            <label>
                Status: <input 
                className='checkbox task'
                type="checkbox"
                checked={task?.completed}
                onChange={handleCheck}
                /> 
            </label> 
            <br></br>
            <label>
                Deadline: 
                <DateTimePicker 
                minDate={new Date()}
                className = "datetimepick"
                value={getDeadline(task)}
                clearIcon = {null}
                mode = 'date'
                onChange={onChange} 
                >

                </DateTimePicker>
                
            </label>
            <br></br>
            <div>
                Project<DropDownComponent 
                selected = {task?.project} 
                setSelected={handleChangeProject}
                 />
            </div>
            <h1>
                Description
            </h1>
            <label>
                <textarea 
                className='textarea body' 
                onChange={(e) => { handleChange(e.target.value) }} 
                value={task?.description}></textarea>
            </label>
        </div>
    )
}

export default TaskPage
