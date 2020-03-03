import {Subject} from 'rxjs';
import {Message} from "../types/Message";

const subject = new Subject();

const initialState = {
    status: '',
    data: [] as Message[],
    newDataCount: 0,
    error: ''
};

let state = initialState;

const ChatStore = {
    init: () => {
        state = {...state, newDataCount: 0};
        subject.next(state)
    },
    subscribe: (setState: any) => subject.subscribe(setState),
    unsubscribe: () => subject.unsubscribe(),
    sendMessage: (message: Message) => {
        state = {
            ...state,
            data: [...state.data, message],
            newDataCount: state.newDataCount + 1
        };
        subject.next(state);
    },
    clearChat: () => {
        state = initialState;
        subject.next(state);
    },
    initialState
};

export default ChatStore;

