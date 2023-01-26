import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,dateTime,auth}=this.props;
    return (
        <div className="card my-3 mx-3">
        <img src={imageUrl?imageUrl:"https://c8.alamy.com/comp/2H5RADC/globe-world-news-flat-icon-vector-illustration-news-symbol-logo-illustration-2H5RADC.jpg"} className="card-img-top" alt="..." style={{height:"200px"}}/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} target="_blanck" className="btn btn-sm btn-primary">Read More...</a>
          <h6 className="card-text my-2">Author: {auth}</h6>
          <h6 className="card-text my-2">Date: {new Date(dateTime).toGMTString()}</h6>
        </div>
      </div>
    )
  }
}

export default Newsitem