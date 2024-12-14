import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASEURL
const apiKey = import.meta.env.VITE_API_KEY

export const getMovieList = async () => {
    const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    return movie.data.results
}

export const getUpcomingMovies = async () => {
    const upcomingMovies = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
    return upcomingMovies.data.results
}


export const searchMovie = async (query) => {
    const searchMovie = await axios.get(`${baseUrl}/search/movie?query=${query}&api_key=${apiKey}`)
    return searchMovie.data
}