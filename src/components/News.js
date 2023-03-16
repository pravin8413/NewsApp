import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import { articles } from '../articles';
export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    News.defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {
        props.set(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page}&pageSize=${props.pageSize}`
        this.setState({ loading: true })
        await fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setArticles(json.articles)
                setTotalResults(json.totalResults)
                setLoading(false)
            })
        props.set(100)

    }
    useEffect(() => {
        document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
    }, [])
    // async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page}&pageSize=${props.pageSize}`
    // this.setState({ loading: true })
    // await fetch(url)
    //     .then((res) => res.json())
    //     .then((json) => {
    //         this.setState({
    //             articles: json.articles,
    //             totalResults: json.totalResults,
    //             loading: false
    //         })
    //     })
    // this.updateNews()
    // console.log(this.state.apiKey);



    // const handlePrevious = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page - 1}&pageSize=${props.pageSize}`
        // this.setState({ loading: true })
        // await fetch(url)
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             page: this.state.page - 1,
        //             articles: json.articles,
        //             loading: false
        //         })
        //     })
    //     setPage(page-1)
    //     updateNews()
    // }
    // const handleNext = async () => {

        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {


        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page + 1}&pageSize=${props.pageSize}`
        //     this.setState({ loading: true })
        //     await fetch(url)
        //         .then((res) => res.json())
        //         .then((json) => {
        //             this.setState({
        //                 page: this.state.page + 1,
        //                 articles: json.articles,
        //                 loading: false
        //             })
        //         })
        // }
    //     setPage(page+1)
    //     updateNews()
    // }
 const fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page}&pageSize=${props.pageSize}`
        // this.setState({ loading: true })
        await fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setArticles(articles.concat(json.articles))
                setTotalResults(json.totalResults)
                setLoading(false)
                

                
            })
    };


    return (
        <>
            <h2 className='text-center' style={{ margin: '100px 0px',marginTop: '90px'}}>NewsMonkey - Top Headline from {capitalizeFirstLetter(props.category)} category</h2>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((element) => {
                            return <div key={element.url} className='col-md-4'>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unkown" : element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div></InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNext}>Next &rarr;</button>

                </div> */}

        </>
    )
}

