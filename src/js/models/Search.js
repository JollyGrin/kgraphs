import axios from 'axios';
import * as json from './data.json';

// console.log(json);

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        try {
            this.result = json;
        } catch(error) {
            console.log('We got an error, chief');
            console.log(error);  
        }
        
    }
    
}