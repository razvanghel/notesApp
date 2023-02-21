import React, { useState, useEffect } from 'react'
import ListProject from './../components/ListProject.js'
import AddProject from './AddProject.js'
import { getProjects } from './../ApiCaller.js'
import './ProjectListComponent.css'

const ProjectListComponent = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        initProjects()
    }, [])


    const initProjects = async () => {
        getProjects().then(result => {
            setTimeout(() => {
                setProjects(result)
            }, 100)
        })
    }

    return (
        
        <div className="projects">
            
            <AddProject refresh={initProjects}/>
            <ul className="projects-list">
                 {projects.map((project, index) => (
                    <li>
                        <ListProject key = {index} project = {project} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectListComponent
