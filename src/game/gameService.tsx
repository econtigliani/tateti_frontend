import axios from 'axios';
import { environment } from '../environment/environment';

const blankBoard = {
    id:'0',
    state:'',
    table: [''],
    turn: '',
    myTurn:false,
    winner:'',
}

export const blankGame = {
    board: blankBoard,
    X:'',
    O:''
}

export interface iStartGame{
    id: string,
    state: string
}


export interface Board {
    id: string,
    state: string,
    table: string[],
    turn:string,
    myTurn: boolean,
    winner:''
}

export interface Game{
    board: Board,
    X: string,
    O: string
}

export async function newGame(): Promise<iStartGame> { 
    const res = (
        await axios.post(environment.backendUrl + `/boards`))
        .data as iStartGame      
        return res
} 


export async function joinGame(id:string): Promise<Game> {
    const res = (
        await axios.put(environment.backendUrl + `/boards/${id}/joingame`))
        .data as Game      
        return res
} 

export async function getGame(id: string): Promise<Game> {
    const res = (
        await axios.get(environment.backendUrl + `/boards/${id}`))
        .data as Game     
        console.log(res) 
        return res
}

export async function play(payload: {index:number,
    id: string}) {
        console.log(payload.index, payload.id)
    const res = (
        await axios.put(environment.backendUrl + `/boards/${payload.id}/play`,{index: payload.index}))
        .data as Game      
        console.log(res)
        return res
}


