import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import { articles } from '../articles';
export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews() {
        this.props.set(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        await fetch(url)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: json.articles,
                    totalResults: json.totalResults,
                    loading: false,
                
                })
                this.props.set(100)
            })
    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page}&pageSize=${this.props.pageSize}`
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
        this.updateNews()
        console.log(this.state.apiKey);


    }
    handlePrevious = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
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
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNext = async () => {

        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {


        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
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
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58ae6e330aa14d33bed7dc93d5b1be1e&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        await fetch(url)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    articles: this.state.articles.concat(json.articles),
                    totalResults: json.totalResults,
                    loading: false,
                
                })
            })
      };

    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top Headline from {this.capitalizeFirstLetter(this.props.category)} category</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles?.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className='container'>
                    <div className='row'>
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className='col-md-4'>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unkown" : element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                        </div>
                    </div></InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNext}>Next &rarr;</button>

                </div> */}

            </>
        )
    }
}
