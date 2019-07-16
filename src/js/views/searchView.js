import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.resultsPanel.innerHTML = '';
    elements.searchTerm.innerHTML = '';
};

export const clearFilters = () => {
    elements.filterTagDiv.innerHTML = '';

    console.log('filter tags reset')
};

export const filterInit = () => {
    elements.filterCountry.value = 'Select Country';
    elements.filterGrade.value = 'Select Grade';
    elements.filterMin.value = '';
    elements.filterMax.value = '';
    elements.filterCur.value = '€ million';

    console.log('filter menu reset')

}

// export const getFilters = () => {
//     elements.filterCountry.value;
//     elements.filterGrade.value;
// };


const renderResult = result => {
    const noi = parseFloat(result[1].has_NOI_yield, 10);
    const markup = `
        <article class="post">
                <h4>${result[0]}</h4>
                <div class="media">
                    
                    <div class="media-content">
                        <div class="content">
                            <p>
                                Constructed in:
                                <span class="tag">${result[1].has_construction_year}</span>
                                GLA:
                                <span class="tag">${result[1].has_GLA}</span>
                                NOI Yield:
                                <span class="tag">${(noi*100).toFixed(2)}%</span>
                                Area Income:
                                <span class="tag ${tagColor(result[1].has_area_income)}">${result[1].has_area_income}</span>
                            </p>
                        </div>
                    </div>
                    <div class="media-right">
                        <span><a href="https://www.google.com/maps/search/${result[0]}+${result[1].is_located_in_country}"><i class="fas fa-map-pin"></i> ${result[1].is_located_in_country}</a></span>
                    </div>
                </div>
        </article>
    `;

    elements.resultsPanel.insertAdjacentHTML('beforeend', markup);
};

const tagColor = (res) => {
    if (res == 'Low') {
        return 'is-danger';
    } else if (res == 'Medium') {
        return 'is-info';
    } else if (res == 'High') {
        return 'is-primary';
    }
}

const renderFilter = (result, tag) => {
    console.log(result, tag, 'test');
    
    const markup = `
        <span id="${tag}" class="tag is-info is-medium">
            ${result}
            <button class="delete is-small"></button>
        </span>
    `;

    elements.filterTagDiv.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (results, page = 1, resPerPage = 10) => {
    // const start = 0; //needed later for paginations
    // const end = 10;
    results.forEach(renderResult); 
    // console.log(results);   
};

export const renderFilters = results => {
    (results.country == 'Select Country') ? '' : renderFilter(`Country: ${results.country}`);
    (results.grade == 'Select Grade') ? '' : renderFilter(`Grade: ${results.grade}`);
    (results.min && results.max) ? renderFilter(`range: ${results.min} - ${results.max}${results.cur}`) : '';
};