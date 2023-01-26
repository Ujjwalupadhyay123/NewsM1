import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general'
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1,
            Nextdisable:false
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }

     async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data =  await fetch(url);
        let parsedData= await data.json(); //convert raw data into json format
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        });
    }
    // fetchMoreData = async () => {
    //     this.setState({page:this.state.page+1});
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd769968bece424c8e32a536e037206e&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data =  await fetch(url);
    //     let parsedData= await data.json(); //convert raw data into json format
    //     this.setState({
    //         articles:this.state.articles.concat(parsedData.articles),
    //         totalResults:parsedData.totalResults,
    //         loading:false
    //     });
    //   };
    handleNext=async ()=>{
      console.log("Next");
      if(this.state.page+1<=Math.ceil(this.state.totalResults/this.props.pageSize)){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data =  await fetch(url);
        let parsedData= await data.json(); //convert raw data into json format
        this.setState({
            articles:parsedData.articles,
            page:this.state.page+1,
            loading:false
        });
        if(this.state.page+1===Math.ceil(this.state.totalResults/this.props.pageSize)){
            this.setState({Nextdisable:true});
        }
     }
     else{
        this.setState({Nextdisable:true});
     }
      
    }
    handlePrev=async ()=>{
      console.log("Prev");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data =  await fetch(url);
      let parsedData= await data.json(); //convert raw data into json format
      this.setState({
        articles:parsedData.articles,
        page:this.state.page-1,
        loading:false,
        Nextdisable:false
    });
    }
  render() {
    return (
      <>
          <h2 className='text-center mb-3'>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
          {this.state.loading &&<Spinner/>}
          {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        > */}
          <div className="container my-5">
             <div className="row">
                 {this.state.articles.map((val)=>{
                    
                   return <div className="col-md-4" key={val.url}>
                          <NewsItem  title={val.title?val.title.slice(0,22):""} description={val.description?val.description.slice(0,40):""} imageUrl={val.urlToImage} newsUrl={val.url} dateTime={val.publishedAt} auth={val.author?val.author:'Secret Sources'}/>
                          </div>
                 })}
             </div>
          </div>
          {/* </InfiniteScroll>  */}
          <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
          <button disabled={this.state.Nextdisable} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div>
      </>
    )
  }
}

export default News