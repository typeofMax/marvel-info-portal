import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
    const _urlBase = 'https://gateway.marvel.com:443/v1/public/';
    const _APIkey = process.env.REACT_APP_API_KEY;
    const _baseOffset = 210;

    const { loading, request, error, clearError } = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_urlBase}characters?limit=9&offset=${offset}&apikey=${_APIkey}`
        );
        return res.data.results.map(_transformCharacterData);
    };

    const getCharacter = async (id) => {
        const res = await request(
            `${_urlBase}characters/${id}?apikey=${_APIkey}`
        );
        return _transformCharacterData(res.data.results[0]);
    };

    const _transformCharacterData = (char) => {
        const description = char.description
            ? `${char.description.slice(0, 207)}...`
            : 'There is no description for this character';

        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicses: char.comics.items,
        };
    };

    return { loading, error, clearError, getAllCharacters, getCharacter };
};

export default useMarvelService;
