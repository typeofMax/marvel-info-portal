import './errorMessage.scss';
import errorImg from './undertaleError.gif';

const ErrorMessage = () => {
    return (
        <div className='error-message'>
            <img
                src={errorImg}
                alt='Error 404'
                className='error-message__img'
            />
        </div>
    );
}

export default ErrorMessage;