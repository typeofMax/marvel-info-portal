import { Link } from 'react-router-dom';

import ErrorMessage from '../error/ErrorMessage';

const Page404 = () => {
    return (
        <>
            <ErrorMessage />
            <p
                style={{
                    marginTop: '25px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '48px',
                }}
            >
                <span style={{ color: '#9F0013', textTransform: 'uppercase' }}>
                    Error 404|
                </span>
                Page not found
            </p>
            <Link
                to='/'
                style={{
                    display: 'block',
                    marginTop: '30px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '48px',
                }}
            >
                Go to main page
            </Link>
        </>
    );
};

export default Page404;
