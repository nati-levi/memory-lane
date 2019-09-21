import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { LabelsFilter } from "./labels-filter.component";
import { MemoriesComponent } from "./memories.component";

function extractLabels(memories) {
    const all = memories.map(m => m.labels).flat();
    const distinct = [...new Set(all)];
    return distinct;
}

function filterMemories({ memories, labels }) {

    let result = [...memories];

    // filter by labels
    result = (labels.length === 0) ? result : result.filter(m => m.labels.some(l => labels.includes(l)));

    return result;
}

@observer
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memory: {
                date: new Date(),
                text: 'dfsdf'
            },
            labels: []
        };

        this.addMemory = this.addMemory.bind(this);
        this.updateMemory = this.updateMemory.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.onLabelsFilterChange = this.onLabelsFilterChange.bind(this);
    }

    addMemory(event) {
        event.preventDefault();

        this.props.store.addMemory(this.state.memory);
    }

    updateMemory(memory) {
        this.props.store.updateMemory({ id: memory.id, newMemory: memory });
    }

    onInputValueChange(event) {
        const { name, value } = event.target;

        this.setState(state => ({
            ...state,
            memory: {
                ...state.memory,
                [name]: value,
            },
        }), () => {
            console.log('changed', this.state);
        });
    }

    onLabelsFilterChange(labels) {
        this.setState({
            ...this.state,
            labels
        });
        console.log('labels', labels);
    }

    render() {
        const { memories, state } = this.props.store;
        const { labels } = this.state;

        // all memories, for debug
        window.memories = memories;

        const allLabels = extractLabels(memories);

        const filteredMemories = filterMemories({ memories, labels });

        return (
            <div className="App">
                <h1 className={"title"}>memory lane</h1>

                <div className={"filters"}>
                    <LabelsFilter labels={allLabels} onChange={this.onLabelsFilterChange} />
                </div>
                <h3>{state} | showing {filteredMemories.length} memories</h3>

                <div className={"list"}>

                    <div className={"memory"}>
                        add memory: <form>
                        <input type="text" name="text" placeholder="What's on your mind?"
                               onChange={this.onInputValueChange} value={this.state.memory.text} />
                        <input type="submit" value="send" onClick={this.addMemory} />
                    </form>
                    </div>

                    <MemoriesComponent memories={filteredMemories} onMemoryChange={this.updateMemory} />

                </div>
            </div>
        );
    }
}

export default App;
