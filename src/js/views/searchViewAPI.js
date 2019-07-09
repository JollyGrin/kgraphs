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
    elements.filterCountry.value = 'Select Country';
    elements.filterGrade.value = 'Select Grade';
    elements.filterMin.value = '';
    elements.filterMax.value = '';
    elements.filterCur.value = '€ million';

}

// export const getFilters = () => {
//     elements.filterCountry.value;
//     elements.filterGrade.value;
// };


const renderResult = result => {
    const markup = `
        <article class="post">
                <h4>${result.title}</h4>
                <div class="media">
                    
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <a href="${result.f2f_url}">${result.publisher}</a> replied 34 minutes ago &nbsp;
                                <span class="tag">Question</span>
                            </p>
                        </div>
                    </div>
                    <div class="media-right">
                        <span class="has-text-grey-light"><i class="fa fa-comments"></i> 1</span>
                    </div>
                </div>
        </article>
    `;

    elements.resultsPanel.insertAdjacentHTML('beforeend', markup);
};

const renderFilter = result => {
    const markup = `
        <span class="tag is-info is-medium">
            ${result}
        </span>
    `;

    elements.filterTagDiv.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = results => {
    results.forEach(renderResult);
};

export const renderFilters = results => {
    (results.country == 'Select Country') ? '' : renderFilter(`Country: ${results.country}`);
    (results.grade == 'Select Grade') ? '' : renderFilter(`Grade: ${results.grade}`);
    (results.min && results.max) ? renderFilter(`range: ${results.min} - ${results.max}${results.cur}`) : '';
};