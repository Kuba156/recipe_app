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
    url: "***REMOVED***"
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
        console.log(resp);
        resp.json()
        .then(json => {
          console.log(json);
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
    //this.getRecipes();
  }

  render() {
    return (
      <React.Fragment>
        <RecipeList recipes={this.state.recipes}/>
        <RecipeDetails />
      </React.Fragment>
    );
  }
}

export default App;
