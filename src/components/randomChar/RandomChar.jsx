import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './randomChar.scss';

import Mjolnir from '../../resources/img/Mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: {},
            loading: true,
            error: false,
        };
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onCharLoadingError);
    };

    onCharLoaded = (char) => {
        if (
            char.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ) {
            this.updateCharacter();
            return;
        }
            this.setState({
                char,
                loading: false,
            });
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false,
        });
    };

    onCharLoadingError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const randomBlockContent = !(loading || error) ? (
            <View char={char} />
        ) : null;

        return (
            <div className='random-char'>
                {errorMessage}
                {spinner}
                {randomBlockContent}
                <div className='random-char__static'>
                    <p className='random-char__title'>
                        Random character for today! Do you want to get to know
                        him better?
                    </p>
                    <p className='random-char__title'>Or choose another one</p>
                    <button
                        className='button button_main'
                        onClick={this.updateCharacter}
                    >
                        <div className='inner'>try it</div>
                    </button>
                    <img
                        src={Mjolnir}
                        alt='Mjolnir and Capitan America shield'
                        className='random-char__decoration'
                    />
                </div>
            </div>
        );
    }
}

const View = (props) => {
    const {
        char: { name, description, thumbnail, homepage, wiki },
    } = props;

    let imgStyle = { objectFit: 'cover' };

    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }
    return (
        <div className='random-char__block'>
            <img
                src={thumbnail}
                alt={name}
                className='random-char__img'
                style={imgStyle}
            />
            <div className='random-char__info'>
                <p className='random-char__name'>{name}</p>
                <p className='random-char__descr'>{description}</p>
                <div className='random-char__btns'>
                    <a href={homepage} className='button button_main'>
                        <div className='inner'>HOMEPAGE</div>
                    </a>
                    <a href={wiki} className='button button_secondary'>
                        <div className='inner'>WIKI</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
