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
            <p className='error-message__text'>
                Failed to load character, sorry!
                <br /> 
                Please try again
            </p>
        </div>
    );
}

export default ErrorMessage;