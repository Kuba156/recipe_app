import React, { Component } from 'react'
import { recipe } from '../temp_data/tempDetails';
import { config } from '../config';


export default class RecipeDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recipe: recipe,
            url: config.apiGetKey + this.props.id
        }
    }

    componentDidMount() {
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
                            this.setState({
                                recipe: json.recipe
                            })
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { image_url, publisher, publisher_url, source_url, title, ingredients } = this.state.recipe;
        const {handleIndex} = this.props;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3" >
                            <button type="button" className="btn btn-warning mb-5 text-capitalize" onClick={() => handleIndex(1)}>back to recipe list</button>
                            <img src={image_url} className="d-block w-100" alt="recipe" />
                        </div>

                        {/* details */}
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h6 className="text-uppeprcase">{title}</h6>
                            <h6 className="text-warning text-capitalize text-slanted">provided by {publisher}</h6>
                            <a href={publisher_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2 text-capitalize">publisher webpage</a>
                            <a href={source_url} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-2 mx-3 text-capitalize">recipe url</a>
                            <ul className="list-group mt-4">
                                <h2 className="mt-3 mb-4">Ingredients</h2>
                                {
                                    ingredients.map((item, index) => {
                                        return (
                                            // index used as a key, bad practice, remember to use truly unique keys
                                            <li key={index} className="list-group-item text-slanted">{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
