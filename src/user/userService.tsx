import axios, { AxiosError } from "axios"
import { environment } from '../environment/environment';
import { cleanupSessionToken, updateSessionToken } from "../store/tokenStore";
import { cleanupSessionUser, updateSessionUser } from '../store/userStore';


// INTERFACES

export interface User {
  name: string
  password: string
  login: string
}

export interface Token {
    token: string
  }


// POST USER
export async function login(params: {
    login: string
    password: string
  }): Promise<Token> {
    const res = (
      await axios.post(environment.backendUrl + "/users/signin", params)
    ).data as Token
    setCurrentToken(res.token)
    updateSessionToken(res.token)
    void reloadCurrentUser().then()
    return res
  }

  export async function newUser(params:{
    name: string
    password: string
    login: string
  } ): Promise<Token> {
    const res = (await axios.post(environment.backendUrl + "/users", params))
      .data as Token
      setCurrentToken(res.token)
      updateSessionToken(res.token)
      void reloadCurrentUser().then()
      return res
  }

  function setCurrentToken(token: string) {
    localStorage.setItem("token", token)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = "bearer " + token
  }

  export async function reloadCurrentUser(): Promise<User> {
    try {
      const res = (await axios.get(environment.backendUrl + "/users/current"))
        .data as User
      localStorage.setItem("user", JSON.stringify(res))
      updateSessionUser(res)
      return res
    } catch (err) {
      const axiosError = err as AxiosError
      if (axiosError.response && axiosError.response.status === 401) {
        void logout()
      }
      throw err
    }
  }

  export async function logout(): Promise<void> {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  
    try {
      await axios.get(environment.backendUrl + "/users/signout")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      axios.defaults.headers.common.Authorization = ""
      return
    } catch (err) {
      return
    } finally {
      cleanupSessionToken()
      cleanupSessionUser()
    }
  }