import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/auth';
import recipeReducer from './store/reducers/recipe';
import filterReducer from './store/reducers/filters';
import { login, logout, startsetRecipes } from './store/actions';
import { firebase } from './firebase/firebase';
import { history } from './app';
import LoadingPage from './components/LoadingPage/LoadingPage';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    recipe: recipeReducer,
    filters: filterReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

let hasRendered = false

const theme = createMuiTheme({
    typography: {
        // Tell Material-UI what's the font-size on the html element is.
        htmlFontSize: 10,
    },
});


const renderApp = () => {
    if (!hasRendered) {

        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </Provider>

            </React.StrictMode>,
            document.getElementById('root')
        );


        hasRendered = true
    }
}

//FIREBASE

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startsetRecipes()).then(() => {
            renderApp()
            if (history.location.pathname === '/') {
                history.push('/home')
            }
        })


    } else {
        store.dispatch(logout())
        renderApp()
    }
})

