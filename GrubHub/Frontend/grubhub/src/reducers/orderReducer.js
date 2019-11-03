import { PLACE_ORDER } from '../actions/types';
import { GET_ACTIVE_ORDER } from '../actions/types';
import { GET_DELIVERED_ORDER } from '../actions/types';

const initialState = {
    itemsToOrder : {},
    ordersReceived : {},
    ordersDelivered : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case PLACE_ORDER : 
            return {
                ...state,
                itemsToOrder: payload
            };

        case GET_ACTIVE_ORDER : 
            return {
                ...state,
                ordersReceived: payload
            };

        case GET_DELIVERED_ORDER : 
            return {
                ...state,
                ordersDelivered: payload
            };

        default :
            return state;
    }
}
