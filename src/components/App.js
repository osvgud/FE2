import React from 'react';
import axios from 'axios';
import Card from './Card';
import {endpoints} from '../../config';
import Genre from "./Genre";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            movieList: [],
            genreList: [],
            activeGenre: {
                id: -1,
                name: 'none'},
            likedList: [],
        };
        this.handler = this.handler.bind(this);
        this.requestMovies();
        this.requestGenres();
        this.handleClick = this.handleClick.bind(this);
    }

    handler = (id, name) => {
        this.setState({
            activeGenre: {
                id,
                name,
            },
        });

        axios
            .get(endpoints.genreMovies(id))
            .then((res) => this.setMovieList(res.data.results))
            .catch((error) => console.log(error));
    };

    likesHandler = (newid) => {
        const {likedList} = this.state;
        const arr = likedList;
        if(likedList.includes(newid))
        {
            arr.splice(newid, 1);
            this.setState({
                likedList: arr,
            })
        }
        else {
            arr.push(newid);
            this.setState({
                likedList: arr,
            })
        }

        console.log(likedList);
    }

    requestMovies = () => {
        axios
            .get(endpoints.mostPopularMovies())
            .then((res) => this.setMovieList(res.data.results))
            .catch((error) => console.log(error));
    };

    requestGenres = () => {
        axios
            .get(endpoints.genres())
            .then((res) => this.setGenreList(res.data.genres))
            .catch((error) => console.log(error));
    }

    setMovieList = (movieList) => {
        movieList.forEach(function(el){
            el.liked = false;
        });
        this.setState({
            movieList,
        })
    };

    setGenreList = (genreList) => {
        this.setState({
            genreList,
        })
    }

    handleClick = () => {
        console.log('Paspausta');
    }

    render() {
        const {movieList, genreList, activeGenre, likedList} = this.state;

        return (
            <div>
                <div className="cards">
                    {likedList.map((like) => <p>{like}-</p>)}
                </div>
                <h1>Active Genre: {activeGenre.name}</h1>
                <div className="cards">
                    {genreList.map((genre) => <Genre genre={genre} action={this.handler}/>)}
                </div>
                <div className="cards">
                    {movieList.map((movie) => <Card movie={movie} likedlist={likedList} action={this.likesHandler}/>)}
                </div>
            </div>
        );
    }
}
