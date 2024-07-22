import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies=useSelector((store)=>store.movies);

  return (
    movies.nowPlayingMovies && 
    
    <div className=' bg-black'>
        <div className='mt-0 md:-mt-52 pl-4 md:p-12 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies}/>

        </div>
      
      
      
    </div>
  )
}

export default SecondaryContainer
