import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';

const search = new Search('pizza');
search.getResults();
