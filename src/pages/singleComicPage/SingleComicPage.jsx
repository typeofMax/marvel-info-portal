import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../../components/appBanner/AppBanner';
import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/Error/ErrorMessage';

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
	const viewContent = !(loading || error || !comic) ? <View comic={comic} /> : null;

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
	const navigate = useNavigate();

	const { title, description, pageCount, thumbnail, price } = comic;

	return (
		<div className='single-comic'>
			<Helmet>
				<meta name='description' content={`${title} comic page`} />
				<title>{title}</title>
			</Helmet>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>Language: en-us</p>
				<div className='single-comic__price'>{price}</div>
			</div>
			<p className='single-comic__back' onClick={() => navigate(-1)}>
				Сome back
			</p>
		</div>
	);
};

export default SingleComicPage;
