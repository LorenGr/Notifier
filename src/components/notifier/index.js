import React from 'react';
import ReactDOM from 'react-dom';
import Notifier from './notifier/';
import {AppContainer} from 'react-hot-loader';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import reducer from './reducers/';

const store = createStore(reducer);
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>
        , document.getElementById('app')
    )
};
render(Notifier);

if (module.hot) {
    module.hot.accept('./notifier', () => {
        render(Notifier)
    })
}