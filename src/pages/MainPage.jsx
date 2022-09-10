import { useState } from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

import decoration from '../resources/img/vision.png';

const MainPage = () => {
	const [charId, setCharId] = useState(null);

	const onCharSelected = (selectetCharId) => {
		setCharId(selectetCharId);
	};
	return (
		<>
			<Helmet>
				<meta
					name='description'
					content='Marvel information portal about Marvel characters and comics'
				/>
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className='char__content'>
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo selectetCharId={charId} />
				</ErrorBoundary>
			</div>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</>
	);
};

export default MainPage;
