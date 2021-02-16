import {React,useState} from 'react'
import Modal from 'react-modal'
import Button from '../Form Elements/Button'
import './ErrorModal.css'

Modal.setAppElement("#root")

const ErrorModal = props => {

    return (
        <Modal
            
            isOpen={props.isOpen}
            style={
                {
                    overlay: {
                        backgroundColor: 'grey'
                    },
                    content: {
                        position: 'absolute',
                        background: 'white',
                        top: '20vh',
                        left: '20vw',
                        right: '20vw',
                        bottom: '30vh',
                        color: 'black',
                        overflow: 'auto',
                        border: '2px solid tomato'
                    }
                }
            }>
                <h2>An Error Occurred</h2>
                <p style={
                    {
                        fontStyle: 'italic',
                        color: 'red'
                    }
                }>{props.isOpen}</p>
                <Button  onClick={props.onClose}>Close</Button>
        </Modal >
    )
}

export default ErrorModal
