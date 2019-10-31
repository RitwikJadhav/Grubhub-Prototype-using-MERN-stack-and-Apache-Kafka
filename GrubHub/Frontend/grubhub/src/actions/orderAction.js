import { PLACE_ORDER } from './types';
import axios from 'axios';

export const placeCheckedOrder = (data) => dispatch => {
    console.log('Checked order placement action called');
    axios.post('http://localhost:3001/Restaurant/CheckoutOrders',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : PLACE_ORDER,
        payload : test
    })); 
};