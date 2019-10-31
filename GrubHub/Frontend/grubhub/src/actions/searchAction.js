import { SEARCH_ITEM } from './types';
import axios from 'axios';

export const searchItem = (userData) => dispatch => {
    console.log('Search item action called');
    axios.post('http://localhost:3001/SearchResults',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : SEARCH_ITEM,
        payload : test
    })); 
};