import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ListProject.css'
import {DeleteButton, EditButton, CancelButton, ConfirmButton} from './Buttons.js'
import { updateProject, deleteProject } from '../ApiCaller.js'
import { reload } from '../Helper.js'

const ListProject = ({ project: project, history}) => {

    const projectDelete = () =>{
        deleteProject(project.name)
        setTimeout(() => {
            window.location.reload()
          }, 1010)
    }

    const [readOnly, setReadOnly] = useState(true)
    const [text, setText] = useState(project.name)
    const [prj, setPrj] = useState(project)

    const changeReadOnly = () => {
        setText(prj.name)
        setReadOnly(!readOnly)
    }

    const changeProjectName = () => {
        var name = prj.name
        setPrj(prj => ({ ...prj, 'name': text }))
        prj.name = text
        updateProject(name, prj)
        changeReadOnly()
    }

    const onClick = () => {
        if(readOnly)
            reload()
    }

    return (
        

            <div id={"project-"+project.name} className="projects-item">
                    <Link to={`/project/${project.name}/`} onClick={onClick}>
                        <ul className='left-side'>
                            {
                                readOnly?
                                <h3>{prj.name}</h3>: <input id={'input-project-'+prj.name} type="text"  maxLength={15} defaultValue={text} onChange={(e) => {setText(e.target.value)}}></input>
                            }
                        </ul>
                    </Link>
                    {
                        project.name !== "Inbox"?
                            readOnly?
                            <ul className='right-side'>
                                <div id={"edit-"+prj.name}>
                                    <EditButton  onClick={changeReadOnly}/>
                                </div>
                                <div id={"delete-"+prj.name}>
                                    <DeleteButton onClick={projectDelete}/>
                                </div>
                            </ul>:
                            <ul className='right-side'>
                                <div id={"confirm-"+prj.name}>
                                    <ConfirmButton onClick={changeProjectName}/>
                                </div>
                                <CancelButton onClick={changeReadOnly}/>
                            </ul>
                        : <div></div>
                    }
            </div>
    )
}

export default ListProject
