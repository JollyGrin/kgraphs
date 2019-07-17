import axios from 'axios';

export default class Search {
    constructor(query, country, grade, footfall) {
        this.query = query;
        this.country = country;
        this.grade = grade;
        // this.footfall = footfall;
    }

    async getResults () {

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const apiURL = `${proxy}https://knowledge-graph-backend.herokuapp.com/dev`;
        const options = {
            'query': this.query,
            'country': this.country,
            'quality_grade_apg': this.grade
            // 'footfall_external1': this.footfall
        };

        console.log('Searching database with the following criteria:')
        console.log(options)

        try {
            const result = await axios.post(apiURL, options);
            this.result = result.data;

        } catch (err) {
            console.log(err);
        }
    }
};
