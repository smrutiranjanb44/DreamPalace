import { React, useState, useContext } from 'react'
import { useFormik } from 'formik'

import { AuthContext } from '../../shared/context/auth-context'

import Button from '../../shared/Form Elements/Button'
import LoadingSpinner from "../../shared/UI Elements/LoadingSpinner";
import ErrorModal from '../../shared/UI Elements/ErrorModal';
import './Auth.css'


const Auth = () => {

    const auth = useContext(AuthContext)


    const [isLogin, setisLogin] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()


    const switchModeHandler = () => {
        setisLogin(prevMode => !prevMode)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },

        onSubmit: async values => {
            console.log('Form values', values)

            if (isLogin) {

                try {
                    setisLoading(true)
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: values.email,
                            password: values.password,
                        })
                    })
                    const responseData = await response.json()
                    if (!response.ok) {
                        throw new Error(responseData.message)
                    }
                    setisLoading(false)
                    auth.login(responseData.userId, responseData.token)
                } catch (err) {
                    console.log(err)
                    setError(err.message || 'Something Went Wrong')
                }

            } else {
                try {
                    setisLoading(true)

                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: values.name,
                            email: values.email,
                            password: values.password,
                        })
                    })


                    const responseData = await response.json()
                    if (!response.ok) {
                        throw new Error(responseData.message)
                    }
                    console.log(responseData)
                    setisLoading(false)
                    auth.login(responseData.userId, responseData.token)
                } catch (err) {
                    console.log(err)
                    setError(err.message || 'Something Went Wrong')
                }
            }
            setisLoading(false)
        },

        validate: values => {
            let errors = {}

            if (isLogin) {
                values.name = undefined
            }

            if (!isLogin) {
                if (!values.name) {
                    errors.name = 'Required'
                } else if (values.name.length < 3) {
                    errors.name = 'Name must be more than 3 Characters'
                }
            }



            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
                errors.email = "Please enter a valid email"
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 5) {
                errors.password = "Password must be more than 5 Characters"
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
            <div className="auth-form">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <form className="form-control" onSubmit={formik.handleSubmit}>

                    {!isLogin &&
                        <>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}>
                            </input>
                            {formik.touched.name && formik.errors.name ? <div className="errorDiv">{formik.errors.name}</div> : null}
                        </>
                    }


                    <label htmlFor='email'>Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}>
                    </input>


                    {formik.touched.email && formik.errors.email ? <div className="errorDiv">{formik.errors.email}</div> : null}

                    <label htmlFor='password'>Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}>
                    </input>


                    {formik.touched.password && formik.errors.password ? <div className="errorDiv">{formik.errors.password}</div> : null}

                    <Button type="submit" >{isLogin ? 'LogIn' : 'SignUp'}</Button>
                </form>
                <div className="auth-action">
                    <Button onClick={switchModeHandler}> {isLogin ? 'Create new account' : 'Already have an account'}</Button>
                </div>
            </div>
        </>
    )
}

export default Auth
