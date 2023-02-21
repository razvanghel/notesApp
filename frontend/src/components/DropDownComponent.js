import React, { useEffect, useState } from 'react'
import { ReactComponent as DownArrow } from '../assets/down-arrow.svg'
import "./ListItem.css"
import './styles/AddButton.css'
import './DropDownComponent.css'

const DropDownComponent = ({selected, setSelected}) => {

    const [isActive, setIsActive] = useState(false)
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        if(projects == null)
            getProjectsArray().then((result) =>{
                setProjects(result)
            })
    })

    const getProjectsArray = async () => {
        
        let response = await fetch(`/api/projects/`)
        let data = await response.json()
        return await data
    }

    return (
        <div className='dropdown'>
            <div className='dropdown-btn' onClick = {e => setIsActive(!isActive)}>
                <h3>
                    {
                        selected == null ?
                        "Inbox": selected
                    }
                </h3>
                <div className="dropdown-button-icon">
                    <DownArrow/>
                </div>
            </div>
            {isActive && (
                <div className='dropdown-content'>
                    {
                    
                    projects.map(option => (
                        <div onClick = {(e) => {
                            setSelected(option["name"])
                            setIsActive(false)
                            }
                        }
                        className='dropdown-item' key={option["name"]}>
                            {option["name"]}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default DropDownComponent
