import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './randomChar.scss';

import Mjolnir from '../../resources/img/Mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, []);

    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onCharLoadingError);
    };

    const onCharLoaded = (char) => {
        if (
            char.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ) {
            updateCharacter();
            return;
        }
        setChar(char);
        setLoading(false);
    };

    const onCharLoading = () => {
        setLoading(true);
        setError(false);
    };

    const onCharLoadingError = () => {
        setLoading(false);
        setError(true);
    };

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
                    Random character for today! Do you want to get to know him
                    better?
                </p>
                <p className='random-char__title'>Or choose another one</p>
                <button
                    className='button button_main'
                    onClick={updateCharacter}
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
};

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
