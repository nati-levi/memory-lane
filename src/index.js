import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MemoriesStore } from "./memories.store";
import { configure } from "mobx";

configure({ enforceActions: "observed" }); // don't allow state modifications outside actions

const store = MemoriesStore.fromJS({});

store.fetchMemories();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
