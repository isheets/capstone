import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    </Provider>,
    document.getElementById('root')
)
