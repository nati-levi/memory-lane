import React, { Component } from 'react';
import './App.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { MemoriesProvider } from "./memories-provider";
import { MONTHS } from "./utilities";

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
                <h1 className={"title"}>memory lane</h1>
                <div className={"list"}>

                    <div className={"memory"}>
                        add memory: <form>
                        <input type="text" name="text" placeholder="What's on your mind?"
                               onChange={this.onInputValueChange} value={this.state.memory.text} />
                        <input type="submit" value="send" onClick={this.addMemory} />
                    </form>
                    </div>

                    {Object.entries(this.state.memories).map(([year, yearMemories]) => (
                        <div className={"year"}>
                            <h2 className={"title"}>{year}</h2>
                            {Object.entries(yearMemories).map(([month, monthMemories]) => (
                                <div className={"month"}>
                                    <h3 className={"title"}>{MONTHS[month]}</h3>
                                    <div className={"month-memories"}>
                                        {Object.entries(monthMemories).map(([day, dayMemories]) => (
                                            <div className={"day"}>
                                                <h4 className={"title"}>{day}</h4>
                                                {dayMemories.map(memory => (
                                                    <div className={"memory"}>
                                                        <blockquote>{memory.text}</blockquote>
                                                        <time>{formatDistanceToNow(memory.time, { addSuffix: true })}</time>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
