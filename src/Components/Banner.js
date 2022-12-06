import React, { Component } from 'react';
import { movies } from './getMovies';

export default class Banner extends Component {
  render() {
    let movie = movies.results[0];
    return (
      <div>
       { movie == "" ? (
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (
            <div class="card banner-card">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="card-img-top banner-img"
                    alt= "..."
                />
                <div class="card-body banner-title">
                    <h5 class="card-title">{movie.original_title}</h5>
                    <p class="card-text banner-text">{movie.overview}</p>
                    <a href="#" class="btn btn-primary">Add to Favourites</a>
                 </div>
                </div>
            )}
        </div>
    );
  }
}
