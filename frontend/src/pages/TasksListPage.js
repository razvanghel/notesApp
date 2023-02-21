import React, { useState, useEffect } from 'react'
import ListItem from './../components/ListItem.js'
import {AddButton} from './../components/Buttons.js'
import './TasksListPage.css'
import { getTasksFromProject } from './../ApiCaller.js'
import { reload } from './../Helper.js'

const TasksListPage = ({match, history}) => {

    let project = match.params.name
    let [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    let getTasks = async () => {
        if(project.name != null)
            getTasksFromProject(project).then(result => {
                if(result==="Project not exists"){
                    history.push('/project/Inbox')
                    reload()
                }
                else
                    setTasks(result)
            })
    }

    return (
        <div className="tasks">
            <div className="task-header">
                <h2 className="tasks-title">&#9782; Tasks {project}</h2>
                <p className="tasks-count">{tasks.length}</p>
            </div>

            <div className="tasks-list">
                 {tasks.map((task, index) => (
                    <label>
                            <ListItem key={index} task={task} project={project}/>
                    </label>
                ))}
            </div>
            <div id="new-task">
                
                <AddButton/>
            </div>
        </div>
    )
}

export default TasksListPage
