import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.resultsPanel.innerHTML = '';
    elements.searchTerm.innerHTML = '';
};

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
}

export const renderResults = results => {
    results.forEach(renderResult);
}