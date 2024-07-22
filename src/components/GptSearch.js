import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggection from './GptMovieSuggection'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          src={BG_URL}
          alt="logo"
        ></img>
      </div>
     <GptSearchBar/>
     <GptMovieSuggection/>

    </div>
  )
}

export default GptSearch
