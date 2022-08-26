import React from 'react'
import './CardMovieStyle.css'

function CardMovie({title, summary, img, url}) {
    return (
        <div className='card'>
            <img src={img} alt={`${title} movie`}/>
            <h3>{title}</h3>
            <span>{summary}</span>
            <a href={url} rel="noreferrer">{title} movie</a>
        </div>
    )
}

export default CardMovie