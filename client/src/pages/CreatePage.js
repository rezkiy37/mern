import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/authContext'
import { useHistory } from 'react-router-dom'

export function CreatePage() {
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const history = useHistory()
    const [link, setLink] = useState('')

    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate',
                    'POST',
                    { from: link },
                    { Authorization: `Bearer ${auth.token}` }
                )

                history.push(`/detail/${data.link._id}`)
            } catch (e) { }
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className='col s8 offset-s2'>
                <h1> CreatePage</h1>
                <input
                    id='link'
                    type='text'
                    placeholder='Paste the link'
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor='link'>Paste the link</label>
            </div>
        </div>

    )
}