import { Route, RouteProps } from "react-router-dom"
import { useSessionToken } from "../../store/tokenStore"

import Login from "../../user/Login"

export default function StateLoggedInRoute(props: RouteProps) {
  const token = useSessionToken()

  if (token === undefined) {
    return (<Route exact path={props.path} component={Login} />)
  } else {
    return (<Route exact path={props.path} component={props.component} />)
  }
}
