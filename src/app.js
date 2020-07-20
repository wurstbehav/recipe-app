import React, { Suspense } from 'react'
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from './components/LoginPage/LoginPage';
import { useSelector } from 'react-redux';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Header from './components/Header/Header';


import './defaultstyles/_base.scss'

export const history = createHistory()

const Addrecipe = React.lazy(() => {
    return import('./components/AddRecipe/Addrecipe')
})

const RecipePage = React.lazy(() => {
    return import('./components/RecipePage/RecipePage')
})

const EditRecipePage = React.lazy(() => {
    return import('./components/EditPage/EditRecipePage')
})

const Homepage = React.lazy(() => {
    return import('./containers/Homepage/Homepage')
})

const App = () => {
    const { uid } = useSelector(state => state.auth)

    let routes = (
        <Switch>
            <Route path="/" exact component={LoginPage} />
            <Redirect to='/' />
        </Switch>
    )

    if (uid) {
        routes = (
            <>
                <Header history={history} />
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" exact render={(props) => <Homepage {...props} />} />
                    <Route path="/add" exact render={(props) => <Addrecipe {...props} />} />
                    <Route path="/recipe/:id" render={(props) => <RecipePage {...props} />} />
                    <Route path="/edit/:id" render={(props) => <EditRecipePage {...props} />} />
                    <Redirect to='/home' />
                </Switch>
            </>
        )
    }



    return (
        <Router history={history}>
            <Suspense fallback={<LoadingPage />}>
                {routes}
            </Suspense>

        </Router>
    );
}


export default (App);



