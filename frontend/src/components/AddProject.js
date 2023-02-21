
import './AddProject.css'
import { useState } from 'react'
import { createProject } from './../ApiCaller.js'

const AddProject = ({refresh}) => {
    
  const [project, setProject] = useState("");

  const handleSubmit = (event) => {
    createProject(project)
    setProject("")
    refresh()
  }


    return (
        <div className="create">
            <div>
            <form onSubmit={handleSubmit}>
                <input id='submit-project' type="submit" value="New project" className='create-button'></input>
                <div>
                    <input id='new-project' type="text" required maxLength={15} value={project} onChange={(e) => setProject(e.target.value.replace(/\s/g, ''))}>
                    </input>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddProject