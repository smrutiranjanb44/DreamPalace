import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import {useHistory} from 'react-router-dom'
import Card from '../../shared/UI Elements/Card'
import Button from '../../shared/Form Elements/Button'
import DreamList from '../components/DreamList'
import ErrorModal from '../../shared/UI Elements/ErrorModal'
import LoadingSpinner from '../../shared/UI Elements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'

/* 
const DUMMY_DREAMS = [
    {
      id: 'd1',
      title: 'Traveller',
      description: 'One of the most famous traveller in the world!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      imageUrl: doll,
      creator: 'u1'
    },
    {
      id: 'd2',
      title: 'Swimming Pool',
      description: 'One of the most famous traveller in the world!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      creator: 'u1'
    }
  ]; */

const UserDream = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState()
  const [LoadedDreams, setLoadedDreams] = useState()

  useEffect(() => {
    const sendRequest = async () => {
      setisLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/dreams/user/${userId}`);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedDreams(responseData.dreams);
      } catch (err) {
        setError(err.message);
      }
      setisLoading(false);
    };
    sendRequest();

  }, [])

  const errorHandler = () => {
    setError(null)
    history.push("/")
  }

  const dreamDeleteHandler = deleteDreamId => {
    setLoadedDreams(prevDreams =>
      prevDreams.filter(dream => dream.id !== deleteDreamId)
    )
  }

  const userId = useParams().userID

  return (
    <>
      { auth.userId == userId && !LoadedDreams &&  (
        <div className="dream-list-zero">
          <Card>
            <h2>No dreams found. Maybe create one?</h2>
            <Button to="/dreams/new">Share Dream</Button>
          </Card>
        </div>
      )

      }
      {auth.userId !== userId && <ErrorModal isOpen={error} onClose={errorHandler} />}
      {isLoading && (<div className="center">
        <LoadingSpinner asOverlay />
      </div>
      )}
      {!isLoading && LoadedDreams && <DreamList items={LoadedDreams} onDeleteDream={dreamDeleteHandler} />}
    </>
  )
}

export default UserDream
