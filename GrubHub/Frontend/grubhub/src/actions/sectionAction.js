import { SECTION_ADD } from './types';
import { SECTION_REMOVE } from './types';
import axios from 'axios';

export const sectionAddition = (userData) => dispatch => {
    console.log('Item addition Request action called');
    axios.post('http://localhost:3001/Menu/SectionAddPage',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.status)
    .then(test => dispatch({
        type : SECTION_ADD,
        payload : test
    })); 
};

export const sectionRemoval = (userData) => dispatch => {
    console.log('Item deletion action called');
    axios.post('http://localhost:3001/Menu/SectionRemove',userData,{
        headers : {
            Authorization : 'JWT '+localStorage.getItem('Token')
        }
    })
    .then(response => response.status)
    .then(test => dispatch({
        type : SECTION_REMOVE,
        payload : test
    })); 
};