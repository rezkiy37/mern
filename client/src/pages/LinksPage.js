import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/authContext'
import Loader from '../components/Loader'
import LinksList from '../components/LinksList'

export function LinksPage() {

    const { loading, request } = useHttp()
    const [links, setLinks] = useState([])

    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>LinksPage</h1>
            {!loading && <LinksList links={links} />}
        </div>
    )
}