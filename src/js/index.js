import Search from './models/SearchAPI';
import Filter from './models/Filter';
import {elements, renderLoader } from './views/base';
import * as searchView from './views/searchView';
// import * as json from './models/data.json';

import axios from 'axios'; 



const test = async testQ => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    
    try {
        // const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        const res = await axios.get(`${proxy}https://76e8427b.ngrok.io/access4dean`,
        {
            test: 'hi'
        }).then(response => {
            console.log(response.data.tasks);
        });
        console.log(res);
        this.result = res;

    } catch (error) {
        console.log('We got an error, chief');
        console.log(error);
    }
};

test();









// const test = 0;

/** Global state of the app
 * Search object
 */
const state = {
    // filter: {
    //     country: '',
    //     grade: '',
    //     min_range: 0,
    //     max_range: 0
    // }
};

const init = () => {
    // searchView.clearResults();
    elements.searchTerm.innerHTML = 'Bulma';
};

init();

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
    

    if (query) {
        // new search object & add to state
        state.search = new Search(query);
    }

    // prepare UI for results
    searchView.clearResults();
    elements.searchTerm.innerHTML = searchView.getInput(); // add search term in searching for:

    // // structure json
    // const arrJson = Object.entries(json);
    // // console.log(arrJson);
    // const j1 = arrJson;
    // // console.log(j1);


    // render results to ui
    // console.log(state.search.result); //for testing, display search results
    searchView.renderResults(query.slice(0,6)); //renders first 5 results
    searchView.clearInput();
};

const controlFilter = () => {

    // clear existing filters
    searchView.clearFilters();
    
    // get value of all the filters to state
    state.filter = new Filter(
        elements.filterCountry.value,
        elements.filterGrade.value,
        elements.filterMin.value,
        elements.filterMax.value,
        elements.filterCur.value
    );

    // render filter to tags
    searchView.renderFilters(state.filter);

};

// Submits search on enter
elements.searchInput.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        // controlFilter();
        controlSearch();
    }
});

// Submits search on button click
elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    // controlFilter();
    controlSearch();
});

// add filters
elements.filterButton.addEventListener('click', e => {
   e.preventDefault();
   controlFilter(); 
});

// clear filters on x
elements.filterClear.addEventListener('click', e => {
    e.preventDefault();
    searchView.clearFilters();
    searchView.filterInit();
});


