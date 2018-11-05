import React from 'react';
import {getImageUrl} from '../../config';

export default class Card extends React.Component {
    constructor() {
        super();

        this.state = {
            opened: false,
            liked: false,
        };
        const check = JSON.parse(localStorage.getItem('liked'));
        if(!check)
        {
            const arr = [];
            localStorage.setItem('liked', JSON.stringify(arr));
        }
        else
        {
            localStorage.setItem('liked', JSON.stringify(check));
        }
        console.log(JSON.parse(localStorage.getItem('liked')));
    }

    componentWillMount()
    {
        this.setState({
            liked: this.props.movie.liked,
        })
    }

    componentWillUpdate()
    {
        const arr = JSON.parse(localStorage.getItem('liked'));
        const index = this.findWithAttr(arr, 'id', this.props.movie.id)
        {
            if(index != -1)
            {
                console.log(index);
            }
        }
    }

    findWithAttr(array, attr, value) {
        for(let i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    toggleLiked = () => {
        const {liked} = this.state;
        if(this.props.movie.liked)
        {
            this.setState({
                liked: false
            })
            const arr = JSON.parse(localStorage.getItem('liked'));
            const index = this.findWithAttr(arr, 'id', this.props.movie.id);
            if (index > -1) {
                arr.splice(index, 1);
            }
            localStorage.setItem('liked', JSON.stringify(arr));
        }
        else{
            this.setState({
                liked: true
            })
            const arr = JSON.parse(localStorage.getItem('liked'));
            arr.push(this.props.movie);
            localStorage.setItem('liked', JSON.stringify(arr));
        }
    };

    toggleSummary = () => {
        const {opened} = this.state;

        this.setState({
            opened: !opened,
        });
    };

    render() {
        const {
            movie: {
                id,
                backdrop_path,
                original_title,
                overview,
                release_date,
                vote_average,
                vote_count,
            },
        } = this.props;
        const {opened} = this.state;
        const arr = JSON.parse(localStorage.getItem('liked'));
        const index = this.findWithAttr(arr, 'id', this.props.movie.id);


        return (
            <div className="card">
                <div
                    className="card__image"
                    style={{backgroundImage: `url(${getImageUrl(backdrop_path)})`}}
                />

                <div className="card__title">
                    {original_title}
                </div>

                <div className="card__like">
                    <i className={index > -1 ? 'fa fa-heart' : 'fa fa-heart-o'} onClick={() => {this.toggleLiked()}} />
                </div>

                <div className="card__subtitle">
                    <span>{release_date}</span>
                    <span>{vote_average} ({vote_count} votes)</span>
                </div>

                <div className="card-info">
                    <div className="card-info__header" onClick={this.toggleSummary}>
                        Summary
                    </div>

                    {opened
                        ? <div className="card-info__description">{overview}</div>
                        : null
                    }

                </div>
            </div>
        );
    }
}
