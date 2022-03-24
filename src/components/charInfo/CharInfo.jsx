import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectetCharId !== this.props.selectetCharId) {
            this.updateCharacter();
        }
    }

    updateCharacter = () => {
        const { selectetCharId } = this.props;

        if (!selectetCharId) {
            return;
        }

        this.onCharLoading();
        
        this.marvelService
            .getCharacter(selectetCharId)
            .then(this.onCharLoaded)
            .catch(this.onLoadingError);
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false,
        });
    };

    onCharLoaded = (character) => {
        this.setState({
            character,
            loading: false,
        });
    };

    onLoadingError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    render() {
        const { character, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const skeleton = !(error || loading || character) ? <Skeleton /> : null;
        const viewContent = !(error || loading || !character) ? (
            <View character={character} />
        ) : null;

        return (
            <div className='char__info'>
                {errorMessage}
                {spinner}
                {skeleton}
                {viewContent}
            </div>
        );
    }
}

const View = (props) => {
    const {
        character: { name, description, thumbnail, homepage, wiki, comicses },
    } = props;

    let imgStyle = { objectFit: 'cover' };

    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'fill' };
    }

    return (
        <>
            <div className='char__basics'>
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className='char__info-name'>{name}</div>
                    <div className='char__btns'>
                        <a href={homepage} className='button button_main'>
                            <div className='inner'>HOMEPAGE</div>
                        </a>
                        <a href={wiki} className='button button_secondary'>
                            <div className='inner'>WIKI</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='char__descr'>{description}</div>
            <div className='char__comics'>Comics:</div>
            <ul className='char__comics-list'>
                {comicses.map((comics, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;

                    return (
                        <li key={i} className='char__comics-item'>
                            {comics.name}
                        </li>
                    );
                })}
                <li className='char__comics-item'>
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    selectetCharId: PropTypes.number,
};

export default CharInfo;
