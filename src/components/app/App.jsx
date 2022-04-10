import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsesPage } from '../pages';

const App = () => {
    return (
        <BrowserRouter>
            <div className='app'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='comicses' element={<ComicsesPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
