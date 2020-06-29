import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMesasge } from '../hooks/message.hook'
import { AuthContext } from '../context/authContext'

export function AuthPage() {

    const auth = useContext(AuthContext)

    const { loading, error, request, clearError } = useHttp()
    const message = useMesasge()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {
            console.log(e)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Cut down the links</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Autherisation</span>
                        <div>

                            <div className="input-field">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="validate"
                                    placeholder="Email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='btn yellow darken-4'
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Sign In
                        </button>

                        <button
                            className='btn grey lighten-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}