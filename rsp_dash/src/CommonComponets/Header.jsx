import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const navigation = [
  { name: 'Home', href: '#' },
//   { name: 'Chat Search', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
]

function Header() {
  return (
     <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 bg-gray-300" aria-label="Global" >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                  className="h-20 w-auto bg-gray-300"
                src="https://rspsupply.com/extensions/images/logo.png"
                alt=""
              />
            </a>
          </div>
          <Link to="/">
          <div className="hidden lg:flex lg:gap-x-20 items-center">
            {navigation.map((item) => (
                <a key={item.name} href={item.href} className="flex items-center text-lg font-bold leading-6 text-white">
                <FontAwesomeIcon icon={faHome} className="text-orange-300 mr-2" style={{ fontSize: '1.5em' }}/>
            
                </a>
            ))}
            </div>
          </Link>
          
          
        </nav>
       
      </header> 
  )
}

export default Header