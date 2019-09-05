import React from 'react';
import './App.css';
import Counter from './Counter';
import Provider from 'react-redux';
import { createStore } from 'redux';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
