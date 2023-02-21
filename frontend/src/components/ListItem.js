import React from 'react'
import { Link } from 'react-router-dom'
import "./ListItem.css"


const getDeadline = (task) => {
    return new Date(task.deadline).toLocaleDateString()
}

const getTitle = (task) => {

    let title = task.title.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}

const getContent = (task) => {
    let content = task.description.replaceAll('\n', ' ')
    content = content.replaceAll(getTitle(task), '')

    if (content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}

const ListItem = ({task: task}) => {
    return (
        <Link to={`/task/${task.id}`}>
            <div className="list-item" >
                <h3>{getTitle(task)}</h3>
                <p><span>Deadline: {getDeadline(task)}</span></p><p>{getContent(task)}</p>
            </div>

        </Link>
    )
}

export default ListItem
