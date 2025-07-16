import React from 'react'
import { useGlobalContext } from './Context'
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const {movies,isLoading}=useGlobalContext();
  if(isLoading){
    return(
      <div className='"movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }
  // console.log(movies)
  return (
    <div className='complete'>
    <section className='movie-page'>
      <div className='container grid grid-4-col'>
    {movies.map((currMovie,ind)=>{
      const {imdbID,Title,Poster}=currMovie;
      return (
        <NavLink to={`movie/${imdbID}`} key={imdbID}>
          <div className='card'>
            <div className='card-info'>
              <h2>{Title}</h2>
              <img src={Poster!=="N/A" ? Poster:"https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"} 
              alt={imdbID}
               className="movie-poster" style={{height:"200px",height:"300px",objectFit:"cover",borderRadius: "10px"}} />
            </div>
          </div>
        </NavLink>
      )
    })}
    </div>
    </section>
    </div>
     
  )
}

export default Movies