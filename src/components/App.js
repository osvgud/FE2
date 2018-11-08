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
        this.requestMovies();
        this.requestGenres();
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

    addLike = (id) =>
    {
        const { likedList } = this.state;
        likedList.push(id);
        this.setState({
            likedList,
        })
    };

    unLike = (id) => {
        const { likedList } = this.state;

        this.setState({
            likedList: likedList.filter((currentId) => currentId !== id),
        })
    };

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
    };
    render() {
        const {movieList, genreList, activeGenre, likedList} = this.state;

        return (
            <div>
                <h1>Active Genre: {activeGenre.name}</h1>
                <div className="cards">
                    {genreList.map((genre) => <Genre genre={genre} action={this.handler}/>)}
                </div>
                <div className="cards">
                    {movieList.map((movie) =>
                        <Card
                            movie={movie}
                            likedList={likedList}
                            onAddLike={() => this.addLike(movie.id)}
                            onUnlike={() => this.unLike(movie.id)}/>)}
                </div>
            </div>
        );
    }
}
