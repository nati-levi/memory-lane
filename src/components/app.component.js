import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { LabelsFilter } from "./labels-filter.component";
import { MemoriesComponent } from "./memories.component";
import Button from "@material-ui/core/Button";
import faker from "faker";
import { MemoryModel } from "../models/memory.model";
import { PrimarySearchAppBar } from "./appbar.component";
import Container from "@material-ui/core/Container";

function fakeMemories() {
    const fakes = [];

    // generate fake memories
    for (let i = 0; i < 10; i++) {
        fakes.push(new MemoryModel({
            id: faker.random.uuid(),
            text: `${faker.lorem.sentence()} ${faker.lorem.sentence()}`,
            date: faker.date.past(30).getTime(),
            labels: [faker.lorem.word(), faker.lorem.word()]
        }));
    }

    return fakes;
}

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
export class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memory: {
                date: new Date().getTime(),
                text: 'a new memory!'
            },
            labels: []
        };

        this.addMemory = this.addMemory.bind(this);
        this.updateMemory = this.updateMemory.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.onLabelsFilterChange = this.onLabelsFilterChange.bind(this);
        this.fakeMemories = this.fakeMemories.bind(this);
    }

    addMemory(event) {
        event.preventDefault();

        this.props.store.addMemory(this.state.memory);
    }

    updateMemory(memory) {
        this.props.store.updateMemory({ id: memory.id, newMemory: memory });
    }

    fakeMemories() {
        fakeMemories().forEach(m => {
            this.props.store.addMemory(m);
        });
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
                <PrimarySearchAppBar />

                <Container maxWidth="md">

                    <div className={"filters"}>
                        <LabelsFilter labels={allLabels} onChange={this.onLabelsFilterChange} />
                    </div>
                    <h3>{state} | showing {filteredMemories.length} memories</h3>

                    <div className={"list"}>

                        <div className={"memory"}>
                            add memory:
                            <form>
                                <input type="text" name="text" placeholder="What's on your mind?"
                                       onChange={this.onInputValueChange} value={this.state.memory.text} />
                                <input type="submit" value="send" onClick={this.addMemory} />
                            </form>
                            <Button onClick={this.fakeMemories}>fake</Button>
                        </div>

                        <MemoriesComponent memories={filteredMemories} onMemoryChange={this.updateMemory} />

                    </div>

                </Container>
            </div>
        );
    }
}
