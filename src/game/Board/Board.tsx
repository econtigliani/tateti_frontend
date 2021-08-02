import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import GlobalContent from "../../common/components/GlobalContent";
import { useErrorHandler } from "../../common/utils/ErrorHandler";
import { Game, getGame, play, blankGame } from "../gameService";
import './Board.css'
import GameOver from "../GameOver/GameOver";
import { Square } from "../Square/Square";


const reloadTime: number = 1000;

export default function Board(props: RouteComponentProps<{ id: string }>) {

  const errorHandler = useErrorHandler();
  const id = props.match.params.id;
  const [game, setGame] = useState(blankGame)
  const [boardActive, setBoardActive] = useState(false)
  
  const initBoard = async () => {
    const game: Game = await getGame(id);
    setGame(game)
    setBoardActive(!game.board.myTurn)
  };

  useEffect(() => {
    let timerID = setInterval(() => initBoard(), reloadTime);
    return function cleanup() {  
      clearInterval(timerID);
    };
  });

  const squareClick = async (index: number) => {
    errorHandler.cleanRestValidations();
    try {
       const game = await play({ index, id });
        setGame(game)
    } catch (error) {
      errorHandler.processRestValidations(error);
    }
  };

  const createSquares = (values: Array<number>) => {
      return values.map((value) => (
      <Square
        disabled={boardActive}
        value = {value}
        symbol={game.board.table[value]}
        onClick={() => {
          squareClick(value);
        }}
      />
    ));
  };

  return (
    <GlobalContent>
      <div className="board">
        <div className="row">{createSquares([0, 1, 2])}</div>
        <div className="row">{createSquares([3, 4, 5])}</div>
        <div className="row">{createSquares([6, 7, 8])}</div>
      </div>
      <GameOver
        state= {game.board.state}
        winner={game.board.winner}/>
    </GlobalContent>
  );
}

