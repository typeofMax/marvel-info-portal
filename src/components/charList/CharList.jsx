import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        offset: 210,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacters();
    }

    updateCharacters = (offset) => {
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onLoadingError);
    };

    onCharLoaded = (newCharacters) => {
        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            offset: offset + 9,
        }));
    };

    onLoadingError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    renderCharactersList = (arrayOfCharacters) => {
        const charactersListItems = arrayOfCharacters.map((char) => {
            let imgStyle = { objectFit: 'cover' };

            if (
                char.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'fill' };
            }
            return (
                <li
                    key={char.id}
                    className='char__item'
                    onClick={() => this.props.onCharSelected(char.id)}
                >
                    <img
                        src={char.thumbnail}
                        alt={char.name}
                        style={imgStyle}
                    />
                    <div className='char__name'>{char.name}</div>
                </li>
            );
        });

        return <ul className='char__grid'>{charactersListItems}</ul>;
    };

    render() {
        const { characters, loading, error, offset } = this.state;
        const listOfCharacters = this.renderCharactersList(characters);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const viewContent = !(loading || error) ? listOfCharacters : null;

        return (
            <div className='char__list'>
                {errorMessage}
                {spinner}
                {viewContent}
                <button
                    className='button button_main button_long'
                    onClick={() => this.updateCharacters(offset)}
                >
                    <div className='inner'>load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
