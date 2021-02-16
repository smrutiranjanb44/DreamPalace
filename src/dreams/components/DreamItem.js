import React, { useState, useContext, useEffect } from 'react'
import Button from '../../shared/Form Elements/Button'
import Card from '../../shared/UI Elements/Card'
import './DreamItem.css'
import { AuthContext } from '../../shared/context/auth-context'

import Modal from 'react-modal'
import LoadingSpinner from '../../shared/UI Elements/LoadingSpinner'
Modal.setAppElement('#root')

const DreamItem = props => {

    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()

    const auth = useContext(AuthContext)

    const [showConfirmModal, setshowConfirmModal] = useState(false)

    const showDeleteWarningHandler = () => {
        setshowConfirmModal(true)
    }
    const cancelDeleteHandler = () => {
        setshowConfirmModal(false)
    }




    const confirmDeleteHandler = () => {
        setshowConfirmModal(false)
        console.log('Deleting...')
        const sendRequest = async () => {
            setisLoading(true)
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/dreams/${props.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + auth.token,
                    },
                    body: null,
                })

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                props.onDelete(props.id)
                //history.push("/" + props.id + "/dreams")

            } catch (err) {
                setError(err.message);
            }
            setisLoading(false);
        };
        sendRequest()
    }

    return (
        <>
            <Modal
                isOpen={showConfirmModal}
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
                            bottom: '20vh',
                            color: 'black',
                            overflow: 'auto',
                            border: '2px solid tomato'
                        }
                    }
                }>
                <h2>Are You Sure?</h2>
                <p>Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.</p>
                <Button inverse onClick={cancelDeleteHandler}>
                    CANCEL
            </Button>
                <Button danger onClick={confirmDeleteHandler}>
                    DELETE
            </Button>
            </Modal>
            <li className="dream-item">
                {isLoading && <LoadingSpinner asOverlay />}
                <Card className="dream-item__content">
                    <div className="dream-item__image">
                        <img src={props.image}></img>
                    </div>
                    <div className="dream-item__info">
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div className="dream-item__actions">
                        {auth.userId === props.creatorId && (
                            <>
                                <Button to={`/dreams/${props.id}`}>EDIT</Button>
                                <Button onClick={showDeleteWarningHandler}> DELETE</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    )
}

export default DreamItem
