


import { useState } from 'react'
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '#' },
//   { name: 'Chat Search', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
]

function HomePageNew() {
  return (
   
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Styles and effect */}
        <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
        >
            <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f97316] to-[#ffc72c] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
        </div>

        <div className="mx-auto max-w-1xl flex flex-col lg:flex-row py-32 sm:py-48 lg:py-56">
            <div className="text-left lg:w-1/2 lg:pr-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Unleashing Product Discovery and Data Solutions
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                Unlock the power of seamless product discovery and data extraction with our cutting-edge application. 
                Users can effortlessly search and export products from a rich, extensive database. 
                Elevating the experience, the application seamlessly connects to ChatGPT, enabling users to effortlessly upload files and obtain insightful data tailored to their needs.
                </p>
            </div>

            {/* First Card */}
            <div className="mt-n12 lg:w-1/2">
                <div className="mt-12 lg:w-1/2">
                    <Link to="/productsearch">
                        <div className="p-6 bg-orange shadow-md rounded-md transition-all hover:bg-orange-300 hover:text-white">
                            {/* First Card Content */}
                            {/* Add your first card content here */}
                            <p className="text-3xl font-bold text-orange-300 hover:text-white">Product Search</p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 lg:w-1/2">
                    <div className="p-6 bg-orange shadow-md rounded-md transition-all hover:bg-orange-300 hover:text-white">
                        {/* First Card Content */}
                        {/* Add your first card content here */}
                        <p className="text-3xl font-bold text-orange-300 hover:text-white">GPT Search</p>
                    </div>
                </div>

                <div className="mt-12 lg:w-1/2">
                    <Link to="/panelestimator">
                        <div className="p-6 bg-orange shadow-md rounded-md transition-all hover:bg-orange-300 hover:text-white">
                            {/* First Card Content */}
                            {/* Add your first card content here */}
                            <p className="text-3xl font-bold text-orange-300 hover:text-white">Panel Estimator</p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 lg:w-1/2">
                    <Link to="/productcategorycompare">
                        <div className="p-6 bg-orange shadow-md rounded-md transition-all hover:bg-orange-300 hover:text-white">
                            {/* First Card Content */}
                            {/* Add your first card content here */}
                            <p className="text-3xl font-bold text-orange-300 hover:text-white">Product Comparision</p>
                        </div>
                    </Link>
                </div>
            </div>
            
        </div>

        {/* Styles and effects*/}
        <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
        >
            <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f97316] to-[#ffc72c] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
        </div>
        
      </div>
 
  )
}


export default HomePageNew