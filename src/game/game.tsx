import { useHistory } from "react-router";
import FormButton from "../common/components/FormButton";
import GlobalContent from "../common/components/GlobalContent";
import {newGame , joinGame, iStartGame} from "./gameService";
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useState } from "react";
import Form from "../common/components/Form";
import FormInput from "../common/components/FormInput";


export default function Game() {
    const history = useHistory()
    const errorHandler = useErrorHandler()

    const [idBoard, setIdBoard] = useState("")
    
    const startGame = async () => {
        try {
           const initGame: iStartGame =  await newGame()
           console.log(initGame.id)
           history.push(/waiting/ + initGame.id );
        } catch(error:any){
            errorHandler.processRestValidations(error)
        }
    }     

    const joingame = async () => {
        try {
            await joinGame(idBoard)
            history.push(`/boards/` + idBoard );
         } catch(error:any){
             errorHandler.processRestValidations(error)
         }
    }

    return (
        <GlobalContent>
            <FormButton label="Crear un tablero" onClick={startGame} />
            <Form>
                <FormInput
                    label="Id de partida"
                    name="idBoard"
                    value={idBoard}
                    onChange={(e) => setIdBoard(e.target.value)}
                    errorHandler={errorHandler}
                />
                <FormButton label="Entrar a un tablero" onClick={joingame} />
            </Form>
            
        </GlobalContent>
    )


}
