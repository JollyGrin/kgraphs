import {elements} from './base';

export const renderSpinner = (where) => {
    const markup = `
    <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
    </div>
    `;

    if(where === 'results') {
        elements.resultsPanel.insertAdjacentHTML('afterbegin', markup);
    } else {
        document.getElementById('modal-id').insertAdjacentHTML('afterbegin', markup);
    }

    

    
};

export const rmSpinner = () => {


    document.querySelector('.spinner').parentNode.removeChild(document.querySelector('.spinner'));
};

