import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import Genre from "./Genre";
import { getMovies, getGenres, getActiveGenre, addLike, unLike, addLog } from '../thunks';

class App extends React.Component {
    constructor(props) {
        super(props);
        props.onGetGenres();
        props.onGetMovies();
    }

    componentDidMount() {
        const { logsList, onAddLog } = this.props;
        onAddLog('Aplikacija uzkrauta', logsList);
    }


    render() {
        const { movieList, genreList, likedList, logsList } = this.props;

        return (
            <React.Fragment>
                <div className="cards">
                    {genreList.map((genre) => <Genre genre={genre} action={() => this.props.onGetActiveGenre(genre, logsList)}/>)}
                </div>
                <div className="cards">
                    {movieList.map((movie) => (
                        <Card
                            movie={movie}
                            likedList={likedList}
                            onAddLike={() => this.props.onAddLike(movie, likedList, logsList)}
                            onUnlike={() => this.props.onUnLike(movie, likedList, logsList)}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    // function to get data from redux store to this components props
    (state) => {
        return {
            movieList: state.movies.list,
            genreList: state.genres.list,
            likedList: state.likes.list,
            logsList: state.logs.list,
        };
    },
    // function to pass action callers to this components props
    (dispatch) => {
        return {
            // onSetMovies - simplest way to pass data to store
            onGetMovies: () => dispatch(getMovies()),
            onGetGenres: () => dispatch(getGenres()),
            onGetActiveGenre: (genre, logsList) => dispatch(getActiveGenre(genre, logsList)),
            onAddLike: (movie, likedList, logsList) => dispatch(addLike(movie, likedList, logsList)),
            onUnLike: (movie, likedList, logsList) => dispatch(unLike(movie, likedList, logsList)),
            onAddLog: (logText, logsList) => dispatch(addLog(logText, logsList)),
        };
    },
)(App);