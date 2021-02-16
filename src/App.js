import { React, useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import MainNavigation from './shared/Navigation/MainNavigation'
import { AuthContext } from "./shared/context/auth-context";
import './App.css';
import LoadingSpinner from "./shared/UI Elements/LoadingSpinner";

/* const Users = React.lazy(() => import("./users/pages/Users"))
const NewDream = React.lazy(() => import("./dreams/pages/NewDream"))
const UserDream = React.lazy(() => import("./dreams/pages/UserDream"))
const UpdateDream = React.lazy(() => import("./dreams/pages/UpdateDream"))
const Auth = React.lazy(() => import("./users/pages/Auth"))
 */

import Auth from './users/pages/Auth'
import Users from './users/pages/Users'
import NewDream from "./dreams/pages/NewDream";
import UserDream from "./dreams/pages/UserDream";
import UpdateDream from "./dreams/pages/UpdateDream";


function App() {

  const [token, settoken] = useState(false)
  const [UserId, setUserId] = useState()

  const login = useCallback(
    (uid, token) => {
      settoken(token)
      setUserId(uid)

      localStorage.setItem('userData',
        JSON.stringify({
          userId: uid,
          token: token,
        })
      )
    },
    [],
  )

  const logout = useCallback(
    () => {
      settoken(null)
      setUserId(null)
      localStorage.removeItem('userData')
    },
    [])



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData &&
      storedData.token) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact></Route>
        <Route path="/:userID/dreams" component={UserDream}></Route>
        <Route path="/dreams/new" component={NewDream} exact></Route>
        <Route path="/dreams/:dreamId" component={UpdateDream}></Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact></Route>
        <Route path="/:userID/dreams" component={UserDream}></Route>
        <Route path="/auth" component={Auth} exact></Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: UserId, login: login, logout: logout }}>
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
