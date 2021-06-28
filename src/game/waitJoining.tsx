import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import GlobalContent from '../common/components/GlobalContent';
import {Game, getGame } from './gameService';





const reloadTime: number = 3000;


export default function WaitJoining(props: RouteComponentProps<{ id: string}>) {
    // HOOKS

    const id = props.match.params.id;
    useEffect(() => {

        async function isJoined(id: string) {
            const game : Game = await getGame(id);
            if (game.board.state === "Playing") { 
                props.history.push(`/boards/${game.board.id}`);       // Te redirige al juego inicial
            }
        }

        let timerID = setInterval(
            () => isJoined(id),
            reloadTime
        );

        return (() => {
            clearInterval(timerID);
        })
    });

    return (
        <GlobalContent>
              <h2> Pasale a tu amigo el codigo: {id}</h2>
                <h3> Esperando ...</h3>
        </GlobalContent>

    );
}

