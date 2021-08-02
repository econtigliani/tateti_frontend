import { useState} from 'react';
import { useHistory } from 'react-router';
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormPassword from "../common/components/FormPassword"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { login } from './userService';



export default function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    const history = useHistory()
    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations()
        if (!userName) {
            errorHandler.addError("login", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await login({
                login: userName,
                password 
            })
            history.push('/game')
        } catch(error:any){
            errorHandler.processRestValidations(error)
        }
       
    }


  return (
    <GlobalContent>
        <FormTitle>Login</FormTitle>

        <Form>
            <FormInput
                label="Usuario"
                name="login"
                errorHandler={errorHandler}
                onChange={(event) => setUserName(event.target.value)} />

            <FormPassword
                label="Password"
                name="password"
                errorHandler={errorHandler}
                onChange={(event) => setPassword(event.target.value)} />

            <DangerLabel message={errorHandler.errorMessage} />

            <FormButtonBar>
                <FormAcceptButton label="Login" onClick={loginClick} />
            </FormButtonBar>
            <FormButton label="Registrar" onClick={() => history.push('/register')} />
        </Form >
    </GlobalContent >
  );
}
