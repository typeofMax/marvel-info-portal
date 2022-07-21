//@Libs
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//@Components
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
//@Styles
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
		const comicsesListItems = comicses.map((comic, i) => {
			return (
				<CSSTransition key={i} timeout={1000} classNames='item' in={true}>
					<li className='comics__item' >
					<Link to={`${comic.id}`}>
						<img
							src={comic.thumbnail}
							alt={comic.title}
							className='comics__item-img'
						/>
						<div className='comics__item-name'>{comic.title}</div>
						<div className='comics__item-price'>{comic.price}</div>
					</Link>
				</li>
				</CSSTransition>
			);
		});
		return <ul className='comics__grid'>{comicsesListItems}</ul>;
	};

	const listOfComicses = renderComicsesList(comicses);

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;

	return (
		<div className='comics__list'>
			<TransitionGroup component={null}>{listOfComicses}</TransitionGroup>
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
