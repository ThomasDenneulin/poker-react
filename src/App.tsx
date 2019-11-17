import React, {FC} from 'react';
import './App.css';
import Dashboard from "./components/dashboard/Dashboard";
import {useUser} from "./context/user-context";
import {FullPageSpinner} from "./components/login/full-page-spinner";
import LoginScreen from "./components/login/Login-screen";
import RegisterScreen from "./components/register/register-screen";
import {Switch, Route} from "react-router-dom";

const App: FC = () => {
    const user = useUser();

    return (
        <React.Suspense fallback={<FullPageSpinner/>}>
            <div style={{height: '100%'}}>
                <Switch>
                    <Route path="/register">
                        <RegisterScreen/>
                    </Route>

                    <Route path="/">
                        {user ? <Dashboard/> : <LoginScreen/>}
                    </Route>
                </Switch>
            </div>
        </React.Suspense>
    );

};

export default App;
