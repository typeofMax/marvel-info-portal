import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const { loading, error, clearError, getComicses } = useMarvelService();
    const [comicses, setComicses] = useState([]);
    const [offset, setOffset] = useState(210);

    useEffect(() => {
        updateComicses();
        // eslint-disable-next-line
    }, []);

    const updateComicses = (offset) => {
        clearError();
        getComicses(offset).then(onComicsesLoaded);
    };

    const onComicsesLoaded = (newComicses) => {
        setComicses((comicsesList) => [...comicsesList, ...newComicses]);
        setOffset((offset) => offset + 8);
    };

    const renderComicsesList = (comicses) => {
        const comicsesListItems = comicses.map(
            (comic, i) => {
                return (
                    <li className='comics__item' key={i}>
                        <Link to={`${comic.id}`}>
                            <img
                                src={comic.thumbnail}
                                alt={comic.title}
                                className='comics__item-img'
                            />
                            <div className='comics__item-name'>
                                {comic.title}
                            </div>
                            <div className='comics__item-price'>
                                {comic.price}
                            </div>
                        </Link>
                    </li>
                );
            }
        );
        return <ul className='comics__grid'>{comicsesListItems}</ul>;
    };

    const listOfComicses = renderComicsesList(comicses);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className='comics__list'>
            {listOfComicses}
            {errorMessage}
            {spinner}
            <button
                onClick={() => updateComicses(offset)}
                className='button button_main button_long'
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
