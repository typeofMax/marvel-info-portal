import './charList.scss';
import abbys from '../../resources/img/abbys.jpg';

const CharList = () => {
    return (
        <div className='char__list'>
            <ul className='char__grid'>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item char__item_selected'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
                <li className='char__item'>
                    <img src={abbys} alt='abbys' />
                    <div className='char__name'>Abbys</div>
                </li>
            </ul>
            <button className='button button_main button_long'>
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

export default CharList;
