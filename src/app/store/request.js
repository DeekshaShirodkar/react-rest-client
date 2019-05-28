import { createStore } from 'redux';

const initialState = {
    request:{
        method: 'GET',
        url: '',
        headers: [],
        rawBody: {},
        urlEncodedForm: [],
        multipartForm: [],
        queryParams :  []
    },
    response: {}
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
            return Object.assign({}, state, {
                ...state,
                request: {
                    ...state.request,
                    headers: action.pairs
                } 
            })
        case 'UPDATE_BODY' : 
            return Object.assign({}, state, {
                ...state,
                request: {
                    ...state.request,
                    rawBody: action.text
                } 
            })
        case 'UPDATE_RESPONSE_OBJECT' :
            return  Object.assign({}, state , { 
                ...state,
                response: action.text
            })
        case 'UPDATE_URL_ENCODED_FORM_DATA' :
            return Object.assign({}, state, {
                ...state,
                request: {
                    ...state.request,
                    urlEncodedForm: action.pairs
                } 
            })
        case 'UPDATE_MULTIPART_FORM_DATA' :
        return Object.assign({}, state, {
            ...state,
            request: {
                ...state.request,
                multipartForm: action.pairs
            } 
        })
        default :
            return state;
    }
    
}

const store = createStore(reducer);

export default store;
