import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";


const useMovieTrailer=({movieId})=>{

    console.log(movieId);
    const dispatch=useDispatch();

    const trailerVideo=useSelector(store=>store.movies.trailerVideo);

    const getMovieVideos=async ()=>{
    const data=await fetch("https://api.themoviedb.org/3/movie/"+
        movieId
        +"/videos?language=en-US",
        API_OPTIONS);
    const json=await data.json();
    
    const trailer =json.results.filter(video=>video.type==="Trailer");
    const finalTrailer=trailer.length?trailer[0]:json.results[0];
    console.log(finalTrailer);
    dispatch(addTrailerVideo(finalTrailer));
  }

  useEffect(()=>{
    if(!trailerVideo){
      getMovieVideos();
    }
    
  },[]) 
}

export default useMovieTrailer;