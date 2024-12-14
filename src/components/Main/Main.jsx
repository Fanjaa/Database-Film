// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { getMovieList, getUpcomingMovies, searchMovie } from '../../config/tmdb'
import { useState } from 'react'


const Main = () => {

  const [popularMovies, setPopularMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState([])
  const [inputLength, setInputLength] = useState(0);
  
  const gridRef = useRef(null);
  const gridRefUpcoming = useRef(null);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({
        left: 600, 
        behavior: 'smooth', 
      });
    }
  };

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({
        left: -600, 
        behavior: 'smooth', 
      });
    }
  };

  const scrollRightUpcoming = () => {
    if (gridRefUpcoming.current) {
      gridRefUpcoming.current.scrollBy({
        left: 600, 
        behavior: 'smooth', 
      });
    }
  };

  const scrollLeftUpcoming = () => {
    if (gridRefUpcoming.current) {
      gridRefUpcoming.current.scrollBy({
        left: -600, 
        behavior: 'smooth', 
      });
    }
  };

  useEffect (() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };

    const moviesToDisplay = popularMovies.slice(0, 12);

    return (
      <>
        {moviesToDisplay.map((movie, index) => {
          const truncatedTitle = truncateText(movie.title, 15);
          const releaseYear = movie.release_date.split('-')[0];

          return (
              /* <div>{movie.release_date}</div> */
              <div className="card" key={index}>
                <a href={`${import.meta.env.VITE_HREF}/${movie.id}`} target='_blank' rel='noopener noreferrer'>
                <img src={`${import.meta.env.VITE_IMAGE}/${movie.poster_path}`} alt="" />
                </a>
                <p>{truncatedTitle}</p>
                <p>{releaseYear} <span> {movie.vote_average}</span></p>
              </div>
            );
          })}
        </>
      );
    };

    
    useEffect (() => {
      getUpcomingMovies().then((result) => {
        setUpcomingMovies(result)
      })
    }, [])

    const UpcomingMovieList = () => {
    
      const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };
  
      const upcomingMoviesToDisplay = upcomingMovies.slice(0, 12);
  
      return (
        <>
          {upcomingMoviesToDisplay.map((upcomingMovie, index) => {
            const truncatedTitle = truncateText(upcomingMovie.title, 15);
            const releaseYear = upcomingMovie.release_date.split('-')[0];
  
            return (
                <div className="card" key={index}>
                  <a href={`${import.meta.env.VITE_HREF}/${upcomingMovie.id}`} target='_blank' rel='noopener noreferrer'>
                  <img src={`${import.meta.env.VITE_IMAGE}/${upcomingMovie.poster_path}`} alt="" />
                  </a>
                  <p>{truncatedTitle}</p>
                  <p>{releaseYear} <span> {upcomingMovie.vote_average}</span></p>
                </div>
              );
            })}
          </>
        );
      };

      const search = async (query) => {
        if (query.length >= 3) {
          const queryList = await searchMovie(query);
          setSearchMovies(queryList.results);
        } else {
          setSearchMovies([]);
        }
      };

      const handleSearch = debounce((query) => search(query), 500);

      useEffect (() => {
        getMovieList().then((result) => {
          setSearchMovies(result)
        })
      }, [])
    
      const SearchMovieList = () => {
        
        const truncateText = (text, maxLength) => {
          if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
          }
          return text;
        };
    
      const searchMoviesToDisplay = searchMovies.slice(0, 12);
  
      return (
        <>
          {searchMoviesToDisplay.map((movie, index) => {
            const truncatedTitle = truncateText(movie.title, 28);
  
            return (
                <tr key={index}>
                  <td> <a href={`${import.meta.env.VITE_HREF}/${movie.id}`} target='_blank' rel='noopener noreferrer'>{truncatedTitle}</a></td>
                </tr>
              );
            })}
          </>
        );
      };
    
console.log({searchMovies})
  return (
    <div className='main'>

      {/* Home Section */}
      <div className="container" id='home'>
          <div className='box-left'>
            <h2>FIND MOVIES</h2>
            <h1>TV SHOWS AND MORE</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae cupiditate provident reiciendis similique minus tenetur incidunt id praesentium, sint doloremque nesciunt veniam animi corporis. Ad dicta neque obcaecati dolore odit.</p>  
            <div className="box-left-input">
              <img src={assets.search_icon} className='search-icon' alt="" />
              <input type="text" placeholder='Search Movies' onChange={({ target }) => {
                const inputValue = target.value;
                setInputLength(inputValue.length);
                handleSearch(target.value)}
              }/>
            </div>
            <div className="list-search" style={{ display: inputLength < 1 ? "none" : "block" }}>
              <div className="list-search-table">
              {inputLength <= 3 ? (
                <p>*Minimal input {'>'} 3</p>
              ) : searchMovies.length > 0 ? (
                <table>
                  <SearchMovieList />
                </table>
              ) : (
                <p>No results found.</p>
              )}
              </div>
            </div>
          </div>

          <div className="box-right">
              <div className="box-right-image">
            <img src={assets.pemimpi_poster} alt="" />
            <img src={assets.aadc_poster} alt="" />
              </div>
          </div>
        </div>

      {/* Heading Popular */}
      <div className="heading" >
        <div className="heading-title" id='popular'>
          <img src={assets.trending_icon} alt="" />
          <h4>Popular</h4>
            <span className="divider"></span>
          <p>See More</p>
        </div>
        </div>
       
        {/* Popular Section */}
        <div className="cards-container">
          <div className="cards"  ref={gridRef}>
          <PopularMovieList/>
          <button className='scroll-cards-left' onClick={scrollLeft}><img src={assets.arrow_back_icon} alt="" /></button>
          <button className='scroll-cards-right' onClick={scrollRight}><img src={assets.arrow_forward_icon} alt="" /></button>
          </div>
        </div>

      {/* Heading Upcoming */}
      <div className="heading" id='upcoming'>
        <div className="heading-title">
          <h4>Upcoming</h4>
            <span className="divider"></span>
          <p>See More</p>
        </div>
      </div>

      {/* Upcoming Section */}
      <div className="cards-container" id='upcoming'>
        <div className="cards"  ref={gridRefUpcoming}>
        <UpcomingMovieList/>
        <button className='scroll-cards-left' onClick={scrollLeftUpcoming}><img src={assets.arrow_back_icon} alt="" /></button>
        <button className='scroll-cards-right' onClick={scrollRightUpcoming}><img src={assets.arrow_forward_icon} alt="" /></button>
        </div>
      </div>

    </div>
  )
}

export default Main
