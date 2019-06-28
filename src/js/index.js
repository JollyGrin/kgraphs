import Search from './models/Search';

/** Global state of the app
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // get query from view
    const query = 'pizza';

    if (query) {
        // new search object & add to state
        state.search = new Search(query);
    }

    // prepare UI for results

    // search for recipes
    await state.search.getResults(query);

    // render results to ui
    console.log(state.search.result);
};

document.querySelector('.search__div').addEventListener('click', e => {
    controlSearch();
    console.log('test: search button clicked');
});
