import axios from 'axios';
// import * as json from './data.json';

// const {json_file} = json;

// console.log(json);

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        try {
            // const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            const res = await axios.get(`http://127.0.0.1:5000/access4dean`).then(response => {
                console.log(response);
            });
            console.log(res);
            this.result = res;

        } catch (error) {
            console.log('We got an error, chief');
            console.log(error);
        }

    }

}