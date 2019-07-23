import axios from 'axios';

export default class Modal {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    async getResults () {

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const apiURL = `${proxy}https://knowledge-graph-backend.herokuapp.com/modal`;
        const options = {
            'individual': this.name,
            'property_x': this.x,
            'property_y': this.y
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
