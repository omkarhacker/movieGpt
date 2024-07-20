import configReducer from "./configSlice";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice"
import { configureStore } from "@reduxjs/toolkit";


const appStore=configureStore({


    reducer:{
        user:userReducer,
        movies:moviesReducer,
        gpt:gptReducer,
        config:configReducer
    },
})

export default appStore;