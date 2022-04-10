import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../error/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, clearError, getComic } = useMarvelService();

    useEffect(() => {
        updateComic(comicId);
        // eslint-disable-next-line
    }, [comicId]);

    const updateComic = (id) => {
        clearError();
        getComic(id).then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const viewContent = !(loading || error || !comic) ? (
        <View comic={comic} />
    ) : null;

    return (
        <>
            <AppBanner />
            {spinner}
            {errorMessage}
            {viewContent}
        </>
    );
};

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, price } = comic;

    return (
        <div className='single-comic'>
            <img src={thumbnail} alt={title} className='single-comic__img' />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
                <p className='single-comic__descr'>{pageCount}</p>
                <p className='single-comic__descr'>Language: en-us</p>
                <div className='single-comic__price'>{price}</div>
            </div>
            <Link to={'/comics'} className='single-comic__back'>
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
