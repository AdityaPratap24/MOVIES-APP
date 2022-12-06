import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from 'axios';
export default class extends Component {
  constructor() {
    // console.log('constructor is called')
    super();
    this.state = {
      hover: "",
      parr: [1],//ab tak main konse page par hu , or what page result am i showing ,
      currPage: 1,
      movie:[],
      favMov:[],//this will store id's of movie that are set to favourite
    };
  }

  handleEnter = (id) => {
    this.setState({
      hover: id,
    });
  };

  handleLeave = () => {
    this.setState({
      hover: "",
    });
  };

  changeMovie = async () => {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e29b59b15579f02c42c7c2144f8f98ed&language=en-US&page=${this.state.currPage}`);
    // console.log(res.data);
    this.setState({
        movie : [...res.data.results],
    })
  }

  handlePrev = () => {
    if(this.state.currPage != 0){
        this.setState({
            currPage: this.state.currPage - 1,
        },this.changeMovie)//this.changeMovie is callback means first state will change then changeMovie fn will be called    
    }
  }

  handleNext = () => {
    let tempArr = [];
    for(let i=1;i<=this.state.parr.length +1;i++){
        tempArr.push(i);
    }
    this.setState({
        parr : [...tempArr],
        currPage: this.state.currPage + 1,
    },this.changeMovie)//this.changeMovie is callback means first state will change then changeMovie fn will be called
    
  }

  handlePageNum = (pageNum) =>{
    this.setState({
        currPage : pageNum,
    },this.changeMovie);
  }

  handleFavourites = (movieObj) => {
    let localeStorageMovies = JSON.parse(localStorage.getItem('movies')) || [];

    if(this.state.favMov.includes(movieObj.id)){
      localeStorageMovies = localeStorageMovies.filter(
        (movie) => movie.id != movieObj.id
      );
    }
    else localeStorageMovies.push(movieObj);
    console.log(localeStorageMovies);
    localStorage.setItem("movies",JSON.stringify(localeStorageMovies));
    let tempData = localeStorageMovies.map((movieObj) => movieObj.id);
    this.setState({
      favMov : [...tempData]
    })
  }

  async componentDidMount(){
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e29b59b15579f02c42c7c2144f8f98ed&language=en-US&page=${this.state.currPage}`);
    // console.log(res.data);
    this.setState({
        movie : [...res.data.results],
    })
  }

  render() {
    // console.log('render is called')
    let allMovies = this.state.movie;
    return (
      <div>
        {allMovies.length == 0 ? (
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="trending">Trending</h3>
            <div className="movies-list">
              {allMovies.map((movie) => {
                return (
                  <div
                    className="card movie-card"
                    onMouseEnter={() => this.handleEnter(movie.id)}
                    onMouseLeave={() => this.handleLeave()}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      className="card-img-top movie-img"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title movie-title">
                        {movie.original_title}
                      </h5>
                      <div className="button-wrapper">
                        {this.state.hover === movie.id ? (
                          <a  className="btn btn-danger movie-button" onClick={() => this.handleFavourites(movie)}>
                            {this.state.favMov.includes(movie.id)?"Remove from favourites":"Add to favourites"}
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href = '#' onClick={this.handlePrev}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((pnum) => (
                    <li class="page-item">
                      <a class="page-link" href = '#' onClick={() => {this.handlePageNum(pnum)}}>
                        {pnum}
                      </a>
                    </li>
                  ))}

                  <li class="page-item" >
                    <a class="page-link"  href = '#' onClick={this.handleNext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    );
  }
}
