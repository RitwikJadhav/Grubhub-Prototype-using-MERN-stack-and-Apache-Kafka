import { SIGNUP_BUYER } from './types';
import { SIGNUP_OWNER } from './types';
import axios from 'axios';

export const signUpBuyer = (userData) => dispatch => {
    console.log('Signup Request action called');
    axios.post('http://localhost:3001/Signup/Buyer',userData)
        .then(response => response.status)
        .then(test => dispatch({
            type : SIGNUP_BUYER,
            payload : test
    })); 
};

export const signUpOwner = (userData) => dispatch => {
    console.log('Signup Request action called');
    axios.post('http://localhost:3001/Signup/Owner',userData)
        .then(response => response.status)
        .then(test => dispatch({
            type : SIGNUP_OWNER,
            payload : test
    })); 
};
