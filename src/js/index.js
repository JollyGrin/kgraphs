// import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';

// const search = new Search('pizza');
// console.log(search);

import axios from 'axios';

async function getResults(query) {
    // const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const key = '9c407b7c371776692fb3786445ef8801';
    // try {
    //     const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
    //     this.result = res.data.recipes;
    //     console.log(this.result);
    // } catch (error) {
    //     console.log(error)
    // }

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '9c407b7c371776692fb3786445ef8801';
    try {
        const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch(error) {
        console.log(error);
    }
    
}


getResults('pasta');

// async function getResults(query) {
//     axios('http://www.food2fork.com/api/search');
// }