import Search from './models/Search';
import Filter from './models/Filter';
import {elements, renderLoader } from './views/base';
import * as searchView from './views/searchView';

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

    // search for recipes
    await state.search.getResults(query);

    // render results to ui
    // console.log(state.search.result); //for testing, display search results
    searchView.renderResults(state.search.result.slice(0,5)); //renders first 5 results
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


