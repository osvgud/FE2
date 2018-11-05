import React, {Component} from 'react';

class Genre extends Component {
    constructor() {
        super();
    }
    render() {
        const {
            genre: {
                id,
                name,
            },
        } = this.props;

        return (
            <button className='genre' onClick={() => {this.props.action(id, name)}}>
                {name}
            </button>
        );
    }
}

export default Genre;