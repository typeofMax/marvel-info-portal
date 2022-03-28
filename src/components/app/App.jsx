import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [charId, setCharId] = useState(null);

    const onCharSelected = (selectetCharId) => {
        setCharId(selectetCharId);
    };

    return (
        <div className='app'>
            <AppHeader />
            <main>
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
            </main>
        </div>
    );
};

export default App;
