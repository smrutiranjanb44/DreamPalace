import { React, useEffect, useState } from 'react'
import UserList from '../components/UserList'
import ErrorModal from '../../shared/UI Elements/ErrorModal'
import LoadingSpinner from '../../shared/UI Elements/LoadingSpinner'

const Users = () => {

    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()
    const [LoadedUsers, setLoadedUsers] = useState()
    /*  const USERS = [
         {
             id: 'u1',
             name: 'Smruti Ranjan',
             image: doll,
             dream: 3
         }, 
     ]*/

    useEffect(() => {
        const sendRequest = async () => {
            setisLoading(true);
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users');

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setisLoading(false);
        };
        sendRequest();

    }, [])

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            <ErrorModal isOpen={error} onClose={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>

            )}
            {!isLoading && LoadedUsers && <UserList items={LoadedUsers} />}
        </>
    )
}

export default Users
