class MarvelService {
    #urlBase = 'https://gateway.marvel.com:443/v1/public/';
    #APIkey = process.env.REACT_APP_API_KEY;

    getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Server response: ${res.statusText}`);
        }

        return res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResources(
            `${this.#urlBase}characters?apikey=${this.#APIkey}`
        );
        return res.data.results.map(this.#transformCharacterData);
    };

    getCharacter = async (id) => {
        const res = await this.getResources(
            `${this.#urlBase}characters/${id}?apikey=${this.#APIkey}`
        );
        return this.#transformCharacterData(res.data.results[0]);
    };

    #transformCharacterData = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        };
    };
}

export default MarvelService;
