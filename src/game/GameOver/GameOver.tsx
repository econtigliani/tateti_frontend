import { useHistory } from "react-router"
import FormButton from "../../common/components/FormButton"

export default function GameOver(props:{
    state:string,
    winner:string
    }) {
    const history = useHistory()
    let message

    if (props.state === 'Draw'){
        message = 'Empate'
    }

    if (props.state === 'Finished'){
        message = 'El ganador es: ' + props.winner
    }

    const home = () => {
        history.push('/game')
    }

    return (
        <div>
            <h2>{message}</h2>
            <FormButton label="Volver al menu" onClick={home} />
        </div>
    )
}
