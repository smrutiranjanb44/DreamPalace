import { React, useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'

import ErrorModal from '../../shared/UI Elements/ErrorModal'
import LoadingSpinner from '../../shared/UI Elements/LoadingSpinner'
import Button from '../../shared/Form Elements/Button'
import './DreamForm.css'
import { AuthContext } from '../../shared/context/auth-context'



const NewDream = () => {

    const auth = useContext(AuthContext)
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()

    const history = useHistory()

    const ApiRequest = values => {

        const sendRequest = async () => {
            setisLoading(true)
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/dreams', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token,
                    },
                    body: JSON.stringify({
                        title: values.title,
                        description: values.description,
                        creator: auth.userId
                    })
                })

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                history.push("/")

            } catch (err) {
                setError(err.message);
            }
            setisLoading(false);
        };
        sendRequest();

    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },

        onSubmit: values => {
            console.log('Form values', values)
            ApiRequest(values)
        },

        validate: values => {
            let errors = {}
            if (!values.title) {
                errors.title = 'Required'
            } else if (values.title.length < 5) {
                errors.title = 'Title must be more than 5 Characters'
            }

            if (!values.description) {
                errors.description = 'Required'
            } else if (values.description.length < 5) {
                errors.description = "Desciption must be more than 5 Characters"
            }
            return errors
        },
    })

    const errorHandler = () => {
        setError(null)
    }


    return (
        <>
            <ErrorModal isOpen={error} onClose={errorHandler} />
            <div className="dream-form">
                {isLoading && <LoadingSpinner asOverlay />}
                <form className="form-control" onSubmit={formik.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}>
                    </input>

                    {formik.touched.title && formik.errors.title ? <div className="errorDiv">{formik.errors.title}</div> : null}

                    <label htmlFor='description'>Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}>
                    </textarea>

                    {formik.touched.description && formik.errors.description ? <div className="errorDiv">{formik.errors.description}</div> : null}

                    <Button type="submit">Add Dream</Button>
                </form>
            </div>
        </>
    )
}

export default NewDream
