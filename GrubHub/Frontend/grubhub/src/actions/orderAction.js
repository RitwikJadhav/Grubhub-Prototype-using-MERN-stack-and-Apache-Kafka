import { PLACE_ORDER } from './types';
import { GET_ACTIVE_ORDER } from './types';
import { GET_DELIVERED_ORDER } from './types';
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

export const getActiveOrders = (data) => dispatch => {
    console.log('active order action called');
    axios.post('http://localhost:3001/Order/GetRecentOrderRequest',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : GET_ACTIVE_ORDER,
        payload : test
    })); 
};

export const getDeliveredOrders = (data) => dispatch => {
    console.log('delivered order action called');
    axios.post('http://localhost:3001/Order/GetDeliveredItems',data,{
        headers : {
            Authorization : 'JWT ' + localStorage.getItem('Token')
        }
    })
    .then(response => response.data)
    .then(test => dispatch({
        type : GET_DELIVERED_ORDER,
        payload : test
    })); 
};