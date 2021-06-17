import { FETCH_REGIN, REGIN_SUCCESS, REGIN_FAILURE, CLEAR_MESSAGE } from './keys';

interface ReginState {
    isUpToDate: boolean;
    message: string;
}

const defaultState: ReginState = {
    isUpToDate: true,
    message: ''
}

export default function reginReducer(state = defaultState, action: any) {
    switch(action.type) {

        case FETCH_REGIN:
            return {
                ...state,
                isUpToDate: false,
            }
        case REGIN_SUCCESS:
            return {
                ...state,
                isUpToDate: true,
                message: action.payload.message,
            }
        case REGIN_FAILURE:
            return {
                ...state,
                isUpToDate: true,
                message: action.payload.message,
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: '',
            };
    };
    return state;
};
