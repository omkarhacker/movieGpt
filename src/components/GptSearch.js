import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggection from './GptMovieSuggection'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
      <div>
      <div className="fixed -z-10 w-screen h-screen">
        <img className="h-full object-cover w-full "
          src={BG_URL}
          alt="logo"
        ></img>
      </div>
      <div className="">
      <GptSearchBar/>
      <GptMovieSuggection/>
    </div>
    </div>
  )
}

export default GptSearch
