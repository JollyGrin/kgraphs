import Search from './models/SearchAPI';
import Filter from './models/Filter';
import Modal from './models/Modal';
import { elements, stateFilters } from './views/base';
import * as searchView from './views/searchView';
import axios from 'axios';
import * as spin from './views/spin.js';

const state = {
    filter: {
        country: '',
        grade: '',
        footfall: [],

    }
};

const init = () => {
    // searchView.clearResults();
    elements.searchTerm.innerHTML = '...';
    console.log('Last Update applied on July 23 @ 15.27');

};
init();

export const controlModal = async (res, x = 'noi_yield_apg', y = 'quality_grade_apg') => {
    const name = res;

    // new modal object and add to state
    state.modal = new Modal(name, x, y);

    searchView.toggleModal();

    spin.renderSpinner();

    // get results from modal search and add to state.modal.result


    await state.modal.getResults();


    await searchView.renderModal(state.modal);

    spin.rmSpinner();

};

const controlSearch = async (page) => {

    // get query from search bar
    const query = searchView.getInput();

    // define filters from state
    const country = state.filter.country;
    const grade = state.filter.grade;
    const pageNum = page;

    // new search object & add to state
    state.search = new Search(query, country, grade, pageNum);


    // prepare UI for results
    searchView.clearResults();
    elements.searchTerm.innerHTML = `${searchView.getInput()}`; // add search term in searching for:
    elements.searchTerm.innerHTML = searchView.getInput(); // add search term in searching for:

    spin.renderSpinner('results');

    // search
    await state.search.getResults();


    // render results to ui
    searchView.renderResults(state.search.result.slice(0, 10)); //renders first 10 results
    // searchView.clearSearchInput();
    spin.rmSpinner();

};

const controlFilter = () => {

    // clear existing filters
    searchView.clearFilters();

    // get value of all the filters and add to state
    state.filter = new Filter(
        elements.filterCountry.value,
        elements.filterGrade.value,
        // elements.filterFMin.value,
        // elements.filterFMax.value
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


        // hardcode highlight page1
        searchView.toggleCurrentPage();
        elements.page1.classList.add('is-current');
        controlSearch(1);
    }
});

// Submits search on button click
elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    // controlFilter();


    // hardcode highlight page1
    searchView.toggleCurrentPage();
    elements.page1.classList.add('is-current');
    controlSearch(1);
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

    if (del) {
        resetModal();
    }
});

export const resetModal = () => {
    searchView.toggleModal();
    searchView.clearModal();
    state.modal = '';
};

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

    // hardcode highlight page1
    searchView.toggleCurrentPage();
    elements.page1.classList.add('is-current');
    controlSearch(1);
});


// clear filters on "clear filters"
elements.filterClear.addEventListener('click', e => {
    e.preventDefault();
    searchView.clearFilters();
    searchView.filterInit();
    state.filter = {};
});

// pagination: page 1
elements.page1.addEventListener('click', e => {

    searchView.toggleCurrentPage();
    controlSearch(1);

    elements.page1.classList.add('is-current');

});

// pagination: page 2
elements.page2.addEventListener('click', e => {

    searchView.toggleCurrentPage();
    controlSearch(2);

    elements.page2.classList.add('is-current');

});

// pagination: page 2
elements.page3.addEventListener('click', e => {

    searchView.toggleCurrentPage();
    controlSearch(3);

    elements.page3.classList.add('is-current');

});




