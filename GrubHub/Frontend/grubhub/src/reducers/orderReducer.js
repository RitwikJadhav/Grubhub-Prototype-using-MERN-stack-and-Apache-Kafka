import { PLACE_ORDER } from '../actions/types';

const initialState = {
    itemsToOrder : {}
};

export default function(state = initialState, {type, payload}) {
    switch(type) {
        case PLACE_ORDER : 
            return {
                ...state,
                itemsToOrder: payload
            };

        default :
            return state;
    }
}
