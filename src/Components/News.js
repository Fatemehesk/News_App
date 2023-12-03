import React, { Component } from 'react';
import NewSingle from './NewSingle';
import Error from './Error';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };
    }
    
    componentDidMount(){
        const url= `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=${process.env.REACT_APP_API}`;
        console.log(url ,"url");
        fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        news: data.articles
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Handle error state or display an error message to the user
    });
}
        renderItems() {
            if (!this.state.error) {
                return this.state.news.map((item) => (
                    <NewSingle key={item.url} item={item}/>
            ));
            } else {
                return <Error />
            }
          }
          render() {
            return (
              <div className='row'>
                {this.renderItems()}
              </div>
            );
          }
}

export default News;
