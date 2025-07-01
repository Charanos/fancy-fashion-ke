import { useLocation } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

const Searchbar = () => {
    const location = useLocation()
    const { searchQuery, setSearchQuery, showSearch, setShowSearch } = useContext(ShopContext)

    useEffect(() => {
        if (location.pathname !== '/collections') {
            setShowSearch(false)
        } else {
            setShowSearch(true)
        }
    }, [location.pathname, setShowSearch])

    return showSearch ? (
        <div className="md:static bg-white px-4 py-3 md:my-3 flex items-center gap-3 z-[1000] shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff] md:mx-4 md:rounded-lg">
            <div className="flex items-center rounded-full gap-2 w-full md:px-6 px-4 md:py-1 shadow-[inset_4px_4px_6px_#d1d9e6,_inset_-4px_-4px_6px_#ffffff]">
                <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    placeholder="Search products..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-2 md:p-3 text-sm md:text-base rounded-lg focus:outline-none transition-all duration-300"
                />
                <img 
                    src={assets.search_icon} 
                    alt="search" 
                    className="w-5 md:w-6  cursor-pointer hover:scale-110 transition-transform duration-300"
                />
            </div>

            <button
                onClick={() => setShowSearch(false)}
                className="px-3 py-2 md:px-4 md:py-3 bg-black text-white text-sm md:text-base 
                         rounded-lg hover:bg-gray-700 transition-all duration-300 flex-shrink-0
                         shadow-[4px_4px_8px_#d1d1d1,_-4px_-4px_8px_#ffffff]
                         hover:shadow-[2px_2px_4px_#d1d1d1,_-2px_-2px_4px_#ffffff]"
            >
                Close
            </button>
        </div>
    ) : null
}

export default Searchbar