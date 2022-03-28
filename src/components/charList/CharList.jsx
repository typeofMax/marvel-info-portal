import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const [charactersList, setCharactersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacters();
        // eslint-disable-next-line
    }, [])

    const updateCharacters = (offset) => {
        marvelService
            .getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onLoadingError);
    };

    const onCharLoaded = (newCharacters) => {
        setCharactersList((charactersList) => [...charactersList, ...newCharacters]);
        setLoading(false);
        setOffset(offset => offset + 9);
    };

    const onLoadingError = () => {
        setLoading(false);
        setError(true);
    };

    const itemsRef = useRef([]);

    const focusOnItem = (i) => {
        itemsRef.current.forEach(item => {
            item.classList.remove('char__item_selected');
        })

        itemsRef.current[i].classList.add('char__item_selected');
        itemsRef.current[i].focus();
    }

    function renderCharactersList(arrayOfCharacters) {
        const charactersListItems = arrayOfCharacters.map((char, i) => {
            let imgStyle = { objectFit: 'cover' };

            if (
                char.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'fill' };
            }
            return (
                <li
                    ref={el => itemsRef.current[i] = el}
                    key={char.id}
                    tabIndex={0}
                    className='char__item'
                    onClick={() => {
                        props.onCharSelected(char.id);
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            props.onCharSelected(char.id);
                            focusOnItem(i);
                        }
                    }}
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

        const listOfCharacters = renderCharactersList(charactersList);
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
                    onClick={() => updateCharacters(offset)}
                >
                    <div className='inner'>load more</div>
                </button>
            </div>
        );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
};

export default CharList;
