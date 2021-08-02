import { HashRouter, Route } from "react-router-dom"
import './App.css';
import Login from './user/Login';
import Game from './game/game'
import Register from "./user/Register";
import WaitJoining from "./game/waitJoining";
import LoggedInRoute from "./common/components/LoggedInRoute";
import Board from "./game/Board/Board";

function App() {
  return (
    <HashRouter>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register} />
        <LoggedInRoute exact path='/game' component={Game} />
        <LoggedInRoute exact path='/waiting/:id' component={WaitJoining} />
        <LoggedInRoute exact path='/boards/:id' component={Board} />
    </HashRouter>
);
}

export default App;
