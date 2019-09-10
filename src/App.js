import React, { Component } from 'react';
import './App.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { MemoriesProvider } from "./memories-provider";

const memoriesProvider = new MemoriesProvider();

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memories: memoriesProvider.getMemoriesByYearMonthDay(),
            memory: {
                time: new Date(),
                text: 'dfsdf'
            }
        };

        this.addMemory = this.addMemory.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
    }

    addMemory(event) {
        event.preventDefault();

        memoriesProvider.addMemory(this.state.memory);

        this.setState(state => ({
            ...state,
            memories: memoriesProvider.getMemoriesByYearMonthDay(),
            memory: {
                time: new Date(),
                text: ''
            }
        }), () => {
            console.log('pushed', this.state.memories);
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

    render() {

        return (
            <div className="App">
                <div className={"title"}>mem lane</div>
                <div className={"list"}>
                    <div className={"memory"}>
                        <form>
                            <input type="text" name="text" placeholder="What's on your mind?"
                                   onChange={this.onInputValueChange} value={this.state.memory.text} />
                            <input type="submit" value="send" onClick={this.addMemory} />
                        </form>
                    </div>
                    {this.state.memories.map(memory => (
                        <div className={"memory"}>
                            <blockquote>{memory.text}</blockquote>
                            <time>{formatDistanceToNow(memory.time, { addSuffix: true })}</time>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
