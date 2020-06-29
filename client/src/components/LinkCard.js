import React from 'react'


export default function LinkCard({ link }) {
    return (
        <div>
            <h2>Link</h2>
            <p>Ur link:
                <a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a>
            </p>
            <p>From:
                <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a>
            </p>
            <p>Clicks count: <strong>{link.clicks}</strong></p>
            <p>Data: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}