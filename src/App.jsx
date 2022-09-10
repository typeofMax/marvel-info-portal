import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './components/appHeader/AppHeader';
import { MainPage, ComicsPage, Page404, SingleComicPage } from './pages';

const App = () => {
	return (
		<BrowserRouter>
			<div className='app'>
				<AppHeader />
				<main>
					<Routes>
						<Route path='/marvel-info-portal/' element={<MainPage />} />
						<Route path='/marvel-info-portal/comics' element={<ComicsPage />} />
						<Route
							path='/marvel-info-portal/comics/:comicId'
							element={<SingleComicPage />}
						/>
						<Route path='*' element={<Page404 />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
