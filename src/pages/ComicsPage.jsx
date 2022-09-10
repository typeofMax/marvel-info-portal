import { Helmet } from 'react-helmet';

import ComicsList from '../components/comicsList/ComicsList';
import AppBanner from '../components/appBanner/AppBanner';

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta name='description' content='The page about Marvel comics' />
				<title>Marvel comics</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</>
	);
};

export default ComicsPage;
