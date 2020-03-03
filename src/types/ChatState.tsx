import {Message} from "./Message";

export type ChatState ={
    status: string,
    data: Message[],
    newDataCount: number,
    error: string
}
