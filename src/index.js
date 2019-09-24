import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app.component';
import './index.css';
import { memoriesStore } from "./stores/memories.store";
import { configure } from "mobx";

configure({ enforceActions: "observed" }); // don't allow state modifications outside actions

// spy((event) => {
//     console.log(event);
//     // if (event.type === 'action') {
//     //     console.log(`${event.name} with args:`, event.arguments)
//     // }
// });

memoriesStore.fetchMemories();
memoriesStore.subscribeServerToStore();

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
