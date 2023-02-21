

const responseOk = (response, message) => {
    if (!response.ok) {
        throw new Error(message);
    }
}

export const createTask = async (task) => {
    fetch(`/api/tasks/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

export const updateTask = async (id, task) => {
    fetch(`/api/tasks/${id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

export const deleteTask = async (id) => {
    fetch(`/api/tasks/${id}/`, {
        method: 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
}

export const getTasksFromProject = async (project) => {
    let response = await fetch(`/api/projects/${project}/`, {
        method: "GET",
    })
    let data = await response.json()
    return await data
}

export const createProject = async (project) => {
    const response = await fetch(`/api/projects/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: project
        })
    })
    responseOk(response, "Failed to create project")
}

export const getProjects = async() => {
    
    let response = await fetch('/api/projects/', {
        method: "GET",
    })
    let data = await response.json()
    return await data
}

export const deleteProject = async(projectName) => {
    const response = await fetch(`/api/projects/${projectName}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    responseOk(response, "Failed to delete project.")
    return true
}

export const updateProject = async (id, project) => {
    fetch(`/api/projects/${id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
}