import Search from './models/SearchAPI';
import Filter from './models/Filter';
import Modal from './models/Modal';
import { elements, stateFilters } from './views/base';
import * as searchView from './views/searchView';
import axios from 'axios';

const state = {
    filter: {
        country: '',
        grade: '',
        footfall: [],

    }
};

const init = async () => {
    // searchView.clearResults();
    elements.searchTerm.innerHTML = '...';
    console.log('Last Update applied on July 23 @ 15.17');
};
init();

const controlModal = async (res) => {
    const name = res;
    const y = 'quality_grade_apg';
    const x = 'noi_yield_apg';
    
    // new modal object and add to state
    state.modal = new Modal(name, x, y);

    // get results from modal search and add to state.modal.result
    await state.modal.getResults();

    // console.log(state.modal, 'test modal');
    // console.log(state.modal.result, 'test result');



    await searchView.renderModal(state.modal);
    searchView.toggleModal();

};

const controlSearch = async () => {
    // get query from search bar
    const query = searchView.getInput();

    // define filters from state
    const country = state.filter.country;
    const grade = state.filter.grade;
    const footfall = state.filter.footfall;

    // new search object & add to state
    state.search = new Search(query, country, grade);


    // prepare UI for results
    searchView.clearResults();
    elements.searchTerm.innerHTML = `${searchView.getInput()}`; // add search term in searching for:
    elements.searchTerm.innerHTML = searchView.getInput(); // add search term in searching for:

    // search
    await state.search.getResults();


    // render results to ui
    searchView.renderResults(state.search.result.slice(0, 9)); //renders first 10 results
    searchView.clearInput();

};

const controlFilter = () => {

    // clear existing filters
    searchView.clearFilters();

    // get value of all the filters and add to state
    state.filter = new Filter(
        elements.filterCountry.value,
        elements.filterGrade.value,
        elements.filterFMin.value,
        elements.filterFMax.value
        // elements.filterCur.value
    );

    // render filter to tags
    console.log(state.filter, 'logging filters')
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

// select title and render modal
elements.resultsPanel.addEventListener('click', e => {
    const titleDiv = e.target.closest('.result__title');
    const title = titleDiv.innerHTML;
    
    controlModal(title);
});

// close modal
elements.modalID.addEventListener('click', e => {
    const del = e.target.closest('.delete');

    if(del) {
        searchView.toggleModal();
        searchView.clearModal();
        state.modal = '';
    }
});

// remove filter on clicking x inside the tag
elements.filterTagDiv.addEventListener('click', e => {

    // select the filter
    const del = e.target.closest('.delete').parentNode;

    // grab id of filter
    const delID = del.id;
    // console.log(delID, 'delID');

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


