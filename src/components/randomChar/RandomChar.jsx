import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';

import Mjolnir from '../../resources/img/Mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: {},
        };
        this.updateCharacter();
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({ char });
    };

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id).then(this.onCharLoaded);
        
    };

    render() {
        const {
            char: { name, description, thumbnail, homepage, wiki },
        } = this.state;

        return (
            <div className='random-char'>
                <div className='random-char__block'>
                    <img
                        src={thumbnail}
                        alt={name}
                        className='random-char__img'
                    />
                    <div className='random-char__info'>
                        <p className='random-char__name'>{name}</p>
                        <p className='random-char__descr'>{description}</p>
                        <div className='random-char__btns'>
                            <a href={homepage} className='button button_main'>
                                <div className='inner'>HOMEPAGE</div>
                            </a>
                            <a href={wiki} className='button button_secondary'>
                                <div className='inner'>WIKI</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='random-char__static'>
                    <p className='random-char__title'>
                        Random character for today! Do you want to get to know
                        him better?
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
    }
}

export default RandomChar;
