import axios from 'axios';

export default class Search {
    constructor(query, country, grade) {
        this.query = query;
        this.country = country;
        this.grade = grade;
    }

    async getResults () {

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const apiURL = `${proxy}https://knowledge-graph-backend.herokuapp.com/dev`;
        const options = {
            'query': this.query,
            'country': this.country,
            'grade': this.grade
        };

        console.log(options, 'log of options variable')

        try {
            const result = await axios.post(apiURL, options);
            this.result = result.data;

        } catch (err) {
            console.log(err);
        }
    }
};
