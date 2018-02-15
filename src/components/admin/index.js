import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './admin';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>
        , document.getElementById('app')
    )
};
render(Admin);

if (module.hot) {
    module.hot.accept('./admin', () => {
        render(Admin)
    })
}