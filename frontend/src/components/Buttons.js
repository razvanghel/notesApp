import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'
import "./styles/AddButton.css"
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'

export const EditButton = ({onClick}) => {
    return (
        <button className="btn edit" onClick={onClick}>
            <span>
                <FaEdit/>
            </span>
        </button>
    )
}

export const ConfirmButton = ({onClick}) => {
    return (
        <button className="btn confirm" onClick={onClick}>
            <span>
                <FaCheck/>
            </span>
        </button>
    )
}

export const DeleteButton = ({onClick}) => {
    return (
        <button className="btn delete" onClick={onClick}>
            <span>
                <FaTrash/>
            </span>
        </button>
    )
}

export const AddButton = () => {
    return (
        <Link to="/task/new" className="floating-button">
            <AddIcon />
        </Link>
    )
}

export const CancelButton = ({onClick}) => {
    return (
        <button className="btn cancel" onClick={onClick}>
            <span>
                X
            </span>
        </button>
    )
}
