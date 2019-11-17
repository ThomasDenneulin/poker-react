import React from 'react'
import {useAsync} from 'react-async'
import {bootstrapAppData} from '../utils/bootstrap'
import * as authClient from '../utils/auth-client'
import {FullPageSpinner} from "../components/login/full-page-spinner";

const AuthContext = React.createContext(null);

function AuthProvider(props: any) {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false)
    let {
        data = {user: null},
        isRejected,
        isPending,
        isSettled,
        reload,
    }: any = useAsync({
        promiseFn: bootstrapAppData,
    });

    React.useLayoutEffect(() => {
        if (isSettled) {
            setFirstAttemptFinished(true)
        }
    }, [isSettled]);

    if (!firstAttemptFinished) {
        if (isPending) {
            return <FullPageSpinner />
        }
        if (isRejected) {
            return (
                <div style={{color: 'red'}}>
                    <p>Uh oh... There's a problem. Try refreshing the app.</p>
                    <div>Probleme</div>
                </div>
            )
        }
    }
    const login: any = (form: any) => authClient.login(form).then(reload);
    const register: any = (form: any) => authClient.register(form).then(reload);
    const logout: any = () => authClient.logout().then(reload);
    return (
        <AuthContext.Provider value={{data, login, logout, register}} {...props} />
    )
}
function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}
export {AuthProvider, useAuth}
