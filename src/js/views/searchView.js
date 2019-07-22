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
};

export const filterInit = () => {
    elements.filterCountry.value = '';
    elements.filterGrade.value = '';
    elements.filterFMin.value = '';
    elements.filterFMax.value = '';
}

// export const getFilters = () => {
//     elements.filterCountry.value;
//     elements.filterGrade.value;
// };


const renderResult = result => {
    console.log(result, 'result from search query');
    
    // convert the object into an array
    const res = Object.entries(result);
    // select the result array
    const resArr = res[0];
    // define the title of the result
    const resTitle = resArr[0];
    // define the properties of the result
    const prop = resArr[1];
    
    const markup = `
        <article class="post">
                <h4>${resTitle}</h4>
                <div class="media">
                    
                    <div class="media-content">
                        <div class="content">
                            <p>
                                Grade APG/External:
                                <span class="tag">${prop['has quality grade apg']} / ${prop['has quality grade external1']}</span>
                                GLA:
                                <span class="tag">${prop['has gla']}</span>
                                NOI APG/External:
                                <span class="tag">${prop['has noi yield apg']} / ${prop['has noi yield external1']}</span>
                                Area Income:
                                <span class="tag ${tagColor(prop['has area income'])}">${prop['has area income']}</span>
                                Footfall:
                                <span class="tag">${Math.round((prop['has footfall external1']*100))/100}</span>
                                Catchment:
                                <span class="tag">${Math.round(prop['has catchment external2'])}</span>
                                Sales:
                                <span class="tag">€${Math.round(prop['has sales investee'])} million</span>
                                Occupancy:
                                <span class="tag">${Math.round(prop['has occupancy rate'])}%</span>
                            </p>
                        </div>
                    </div>
                    <div class="media-right">
                        <span><a href="https://www.google.com/maps/search/${resTitle}+${prop['has city']}+${prop['has country']}"><i class="fas fa-map-pin"></i> ${prop['has city']}, <br> ${prop['has country']}</a></span>
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
    } else if (res == 'Very High') {
        return 'is-primary';
    }
}

const renderFilter = (result, tag) => {        
    const markup = `
        <span id="${tag}" class="tag is-info is-medium">
            ${result}
            <button class="delete is-small"></button>
        </span>
    `;

    elements.filterTagDiv.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (results, page = 1, resPerPage = 10) => {
    results.forEach(renderResult); 
};

export const renderFilters = results => {
    (results.country == '') ? '' : renderFilter(`Country: ${results.country}`, 'country');
    (results.grade == '') ? '' : renderFilter(`Grade: ${results.grade}`, 'grade');
    // (results.footfall[0] === '' && results.footfall[1] === '') ? '' : renderFilter(`Footfall: ${results.footfall[0]} - ${results.footfall[1]}`, 'footfall')
};