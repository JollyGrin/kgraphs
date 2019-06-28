import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        // Notifies via console if the API limit was reached
        const apiLimitCatch = function (result) {
            const resultD = result.data.error;
            
            if (resultD === 'limit') {
                console.log('API error limit reached. Make a new account at food2fork.com and input the new api key');
            }
        };
    
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const key = '259a740ab0267df343cd20b4177a3d16';
        // const key = '9c407b7c371776692fb3786445ef8801';
        const key = '6fc289cb24c4596f929ebbd12997fe33';

        try {
            const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            apiLimitCatch(res); // will consolelog if daily api limit of food2fork is reached
            // console.log(this.result);
        } catch(error) {
            console.log('We got an error, chief');
            console.log(error);  
        }
        
    }
    
}