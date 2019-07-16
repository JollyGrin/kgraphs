import Search from './models/SearchAPI';
import Filter from './models/Filter';
import { elements, stateFilters } from './views/base';
import * as searchView from './views/searchView';
import axios from 'axios';

const state = {
    filter: {
        country:'',
        grade:'',

    }
};

const init = () => {
    // searchView.clearResults();
    elements.searchTerm.innerHTML = '...';
};
init();

const controlSearch = async () => {
    // get query from search bar
    const query = searchView.getInput();

    // define filters from state
    const country = state.filter.country;
    const grade = state.filter.grade;

    console.log(state);

    if (query) {
        // new search object & add to state
        state.search = new Search(query, country, grade);


        // prepare UI for results
        searchView.clearResults();
        elements.searchTerm.innerHTML = `
        ${searchView.getInput()}
        `; // add search term in searching for:
        elements.searchTerm.innerHTML = searchView.getInput(); // add search term in searching for:

        // search
        await state.search.getResults();


        // render results to ui
        searchView.renderResults(state.search.result.slice(0, 9)); //renders first 10 results
        searchView.clearInput();

    }
};

const controlFilter = () => {

    // clear existing filters
    searchView.clearFilters();

    // get value of all the filters and add to state
    state.filter = new Filter(
        elements.filterCountry.value,
        elements.filterGrade.value
        // elements.filterMin.value,
        // elements.filterMax.value,
        // elements.filterCur.value
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

// remove filter on clicking x inside the tag
elements.filterTagDiv.addEventListener('click', e => {

    // select the filter
    const del = e.target.closest('.delete').parentNode;

    // grab id of filter
    const delID = del.id;

    // delete the selected ID from state
    function delFilter(id) {
        // set the ID element's state to null
        state.filter[id] = '';

        // clear all filters
        searchView.clearFilters();

        // render filters from state
        searchView.renderFilters(state.filter);
    };
    delFilter(delID);

    controlSearch();
});


// clear filters on "clear filters"
elements.filterClear.addEventListener('click', e => {
    e.preventDefault();
    searchView.clearFilters();
    searchView.filterInit();
    state.filter = {};
});


