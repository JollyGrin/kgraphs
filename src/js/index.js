import Search from './models/Search';
import {elements, renderLoader } from './views/base';
import * as searchView from './views/searchView';

/** Global state of the app
 * Search object
 */
const state = {};

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    if (query) {
        // new search object & add to state
        state.search = new Search(query);
    }

    // prepare UI for results
    searchView.clearResults();
    elements.searchTerm.innerHTML = searchView.getInput();

    // search for recipes
    await state.search.getResults(query);

    // render results to ui
    console.log(`searching for ${searchView.getInput()}`);
    console.log(state.search.result);
    searchView.renderResults(state.search.result.slice(0,5)); //renders first 5 results
    searchView.clearInput();
    
    
};

const controlFilter = () => {

    // clear existing filters
    
    // get value of all the filters
    
    // add filters to state

    // render filter to tags

};

// Submits search on enter
elements.searchInput.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        controlSearch();
        e.preventDefault();
    }
});

// Submits search on button click
elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});


