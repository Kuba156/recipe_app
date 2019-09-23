import React, { Component } from 'react';
import './App.css';

import { recipes } from './temp_data/tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {

  state = {
    // hook up mockup data
    recipes: recipes,
    // recipes: [],
    url: "***REMOVED***",
    details_id: 35382,
    pageIndex: 1
  }

  // ASYNC VERSION
  // async getRecipes() {
  //   try {
  //     const data = await fetch(this.state.url);
  //     const jsonData = await data.json();
  //     const { recipes } = jsonData.recipes;
  //     this.setState({
  //       state: recipes
  //     });
  //     console.log(this.state.recipes);
  //     console.log(recipes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // PROMISES VERSION
  getRecipes() {
    try {
      fetch(this.state.url)
      .then(resp => {
        resp.json()
        .then(json => {

          this.setState({
            recipes: json.recipes
          })
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    // this.getRecipes();
  }

  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return (<RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails}/>);
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

  render() {
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;
