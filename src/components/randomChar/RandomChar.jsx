import './randomChar.scss';
import thor from '../../resources/img/Thor.jpg';
import Mjolnir from '../../resources/img/Mjolnir.png';

const RandomChar = () => {
    return (
        <div className='random-char'>
            <div className='random-char__block'>
                <img src={thor} alt='Thor' className='random-char__img' />
                <div className='random-char__info'>
                    <p className='random-char__name'>THOR</p>
                    <p className='random-char__descr'>
                        As the Norse God of thunder and lightning, Thor wields
                        one of the greatest weapons ever made, the enchanted
                        hammer Mjolnir. While others have described Thor as an
                        over-muscled, oafish imbecile, he's quite smart and
                        compassionate...
                    </p>
                    <div className='random-char__btns'>
                        <a href='#' className='button button_main'>
                            <div className='inner'>HOMEPAGE</div>
                        </a>
                        <a href='#' className='button button_secondary'>
                            <div className='inner'>WIKI</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='random-char__static'>
                <p className='random-char__title'>
                    Random character for today! Do you want to get to know him
                    better?
                </p>
                <p className='random-char__title'>Or choose another one</p>
                <button className='button button_main'>
                    <div className='inner'>try it</div>
                </button>
                <img
                    src={Mjolnir}
                    alt='Mjolnir and Capitan America shield'
                    className='random-char__decoration'
                />
            </div>
        </div>
    );
};

export default RandomChar;