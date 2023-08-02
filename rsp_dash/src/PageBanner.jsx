import React from 'react'
import "./PageBanner.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome  } from '@fortawesome/free-solid-svg-icons';
import {
	Link
} from 'react-router-dom';

function PageBanner({name}) {
  return (
    <div className='priceMan_nav'>
        <Link className= "priceMan_nav_link" to="/"><FontAwesomeIcon icon={faHome} size='2x' /> RSP Supply</Link>
        <h1>{name}</h1>
    </div>
  )
}

export default PageBanner