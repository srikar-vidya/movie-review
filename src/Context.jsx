import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
const AppContext=createContext();

export const API_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;



const AppProvider=({children})=>{
    const [movies,setMovies]=useState([]);
const [isLoading,setIsLoading]=useState(true);
const [error,setError]=useState({show:false,msg:""});
const [query,setQuery]=useState("titanic")
    const getMovies=async(url)=>{
        setIsLoading(true)
        try{
        const res= await fetch(url);
        const data=await res.json();
        if(data.Response==="True"){
            setIsLoading(false);
            setError({
                show:false,
                msg:""
            })
            setMovies(data.Search)
        
        }
        else{
            setError({
                show:true,
                msg:data.Error
            })
        }
    }catch(error){
        console.log(error)
    }
    }
    useEffect(()=>{
     let timerOut=   setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);
        },800);
        console.log(timerOut)
        return ()=>clearTimeout(timerOut)
    },[query])
    
    return(
        <AppContext.Provider value={{movies,isLoading,error,query,setQuery}}>
            {children}
        </AppContext.Provider>

    )
   
}
const globalContext=()=>{
    return useContext(AppContext)
}
export { globalContext as useGlobalContext, AppProvider, AppContext }
