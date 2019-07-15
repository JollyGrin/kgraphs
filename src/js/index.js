import Search from './models/Search';
import Filter from './models/Filter';
import { elements, renderLoader } from './views/base';
import * as searchView from './views/searchView';
import * as json from './models/data.json';

/** Global state of the app
 * Search object
 */
export const state = {
    filter: {
        // country: '',
        // grade: '',
        // min_range: 0,
        // max_range: 0
    }
};

const init = () => {
    // searchView.clearResults();
    elements.searchTerm.innerHTML = 'Bulma';
};

init();

const filterDisplay = () => {
    // turn object of filters into an array
    const objArr = Object.entries(state.filter);
    
    // create accumulator to store results
    let acc = [];

    // run a foreach on each filter
    objArr.forEach(function (el) {
    // select filter value of each row
        const el1 = el[1];
    if (el1 == 'Select Country' || el1 == 'Select Grade' || el1 == 'Select Currency' || el1 == '') {
        // skips blank lines
    } else {
        const string = ` ${el[1]}`;
        acc.push(string);
    }
        
    });
    
    if (acc.length !== 0) {
        return ` + ${acc}`;
    } else {
        return '';
    }
};

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();


    if (query) {
        // new search object & add to state
        state.search = new Search(query);
    }

    // prepare UI for results
    searchView.clearResults();
    elements.searchTerm.innerHTML = `
        ${searchView.getInput()}${filterDisplay()}
        `; // add search term in searching for:

    // structure json
    const arrJson = Object.entries(json);
    // console.log(arrJson);
    const j1 = arrJson;
    // console.log(j1);


    // render results to ui
    // console.log(state.search.result); //for testing, display search results
    searchView.renderResults(j1.slice(0, 6)); //renders first 5 results
    // searchView.clearInput();
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

// clear filters on "clear filters"
elements.filterClear.addEventListener('click', e => {
    e.preventDefault();
    searchView.clearFilters();
    searchView.filterInit();
});

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

export const rmFilterState = () => {
    state.filter = '';
};


