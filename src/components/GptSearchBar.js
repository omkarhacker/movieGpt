import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movies) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movies +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

//   const handleGptSearchClick = async () => {
//     const gptQuery =
//       "Act as a Movie Recommendation system ans suggest some movies for the query :" +
//       searchText.current.value +
//       ". only give me name of 5 movies , comma seprated like the example given ahead. Exaple Results: Gadar, Sholy, Don, Golmal, Koi mil gaya";
//     const gptResults = await openai.chat.completions.create({
//       messages: [{ role: "user", content: gptQuery }],
//       model: "gpt-3.5-turbo",
//     });
//     const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

//     const promiceArray = gptMovies.map((movie) => searchMovieTMDB(movie));
//     const tmdbResult = await Promise.all(promiceArray);

//     dispatch(addGptMoviesResult(tmdbResult));
//   };

const genAI = new GoogleGenerativeAI(OPENAI_KEY);
const handleGptSearchClick= async ()=>{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "Act as a Movie Recommendation system ans suggest some movies for the query :" +
       searchText.current.value +
       ". only give me name of 5 movies , comma seprated like the example given ahead. Exaple Results: Gadar, Sholy, Don, Golmal, Koi mil gaya";
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const gptMovies = text.split(",");
    const promiceArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResult = await Promise.all(promiceArray);
    dispatch(addGptMoviesResult({movieNames:gptMovies,movieResults:tmdbResult}));
}

  return (
    <div className="pt-[10%] flex justify-center ">
      <form
        className="w-1/2 grid grid-cols-12 bg-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].getSearchPlaceholder}
        ></input>
        <button
          className="col col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
