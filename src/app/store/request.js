import { createStore } from 'redux';

const initialState = {
    request:{
        method: 'GET',
        url: '',
        headers: [],
        data: {
            "id": 0,
            "category": {
            "id": 0,
            "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
            "string"
            ],
            "tags": [
            {
                "id": 0,
                "name": "string"
            }
            ],
            "status": "available"
        },
        queryParams :  []
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'URL_CHANGE' : 
            state = Object.assign({}, state, 
                        { 
                            ...state,
                            request: {
                                ...state.request,
                                url: action.text 
                            }
                        });
            return state
        case 'CHANGE_METHOD' :
            return Object.assign({}, state, { 
                                                 ...state,                                
                                                 request: {
                                                    ...state.request,
                                                    method: action.text,
                                                }})
        case 'UPDATE_QUERY_PARAM' :
            return Object.assign({}, state, {
                ...state,
                request: {
                    ...state.request,
                    queryParams: action.pairs
                } 
            })
        case 'UPDATE_HEADERS' :
            console.log("reducer")
            console.log(action.pairs)
            return Object.assign({}, state, {
                ...state,
                request: {
                    ...state.request,
                    headers: action.pairs
                } 
            })
        default :
            return state;
    }
    
}

const store = createStore(reducer);

export default store;
