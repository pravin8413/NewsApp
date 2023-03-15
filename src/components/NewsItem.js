import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl,author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageUrl ? "https://static.toiimg.com/photo/98600846.cms" : imageUrl} className="card-img-top" alt="loading" />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span class="badge position-absolute top-0 translate-middle rounded-pill bg-danger" style={{zIndex:1,left:'85%'}}>{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className=''>By {author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" target="_blank" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
