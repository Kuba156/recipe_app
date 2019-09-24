import React, { Component } from 'react';
import './App.css';

import { recipes } from './temp_data/tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { config } from './config'

class App extends Component {

  state = {
    // hook up mockup data
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=" + config.key,
    base_url: "https://www.food2fork.com/api/search?key=" + config.key,
    details_id: 35382,
    pageIndex: 1,
    search: "",
    query: "&q=",
    error: ""
  }

  getRecipes() {
    try {
      fetch(this.state.url)
      .then(resp => {
        resp.json()
        .then(json => {
          if (json.error !== undefined) {
            if (json.error === "limit") {
              console.error("the API call limit has been reached")
              return;
            } 
          } 
          if (json.recipes.length === 0) {
            this.setState(() => {
              return {
                error: "your search didn't return any results."
              }
            })
          }
          else
          {
            this.setState(() => {
              return {
                recipes: json.recipes,
                error: ""
              }
            })
          }

        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return (<RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails} value={this.state.search} handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={this.state.error}/>);
      case 0:
        return (<RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />)
    }
  }

  handleIndex = (index) => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search } = this.state;
    this.setState(() => {
      return {
        url: base_url + query + search,
        search: ""
      }
    }, () => {
      this.getRecipes();
    })
  } 

  render() {
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;