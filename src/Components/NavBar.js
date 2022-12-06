import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class 
  extends Component {
  render() {
    return (
      <div>
         <div style={{display:'flex',background:'lightblue',justifyContent:'center',alignItems:'center'}}>
            <Link to='/' style={{textDecoration:'none'}}>
              <h1>Movies</h1>
            </Link>
            <Link to='/fav' style={{textDecoration:'none'}}>
            <h2 style={{marginLeft:'2rem'}}>Favourites</h2>
            </Link>
         </div>
      </div>
    )
  }
}
