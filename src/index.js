import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app.component';
import './index.css';
import { MemoriesStore } from "./store/memories.store";
import { configure } from "mobx";

configure({ enforceActions: "observed" }); // don't allow state modifications outside actions

const store = MemoriesStore.fromJS({});
store.fetchMemories();
store.subscribeServerToStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
