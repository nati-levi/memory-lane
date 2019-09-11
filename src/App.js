import React, { Component } from 'react';
import './App.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { groupBy, MONTHS } from "./utilities";
import { observer } from 'mobx-react';

const process = memories => {

    // group by year
    let byYear = groupBy({ arr: memories, criteria: x => x.date.getFullYear() });

    // group by month
    for (let [key, value] of Object.entries(byYear)) {
        byYear[key] = groupBy({ arr: value, criteria: x => x.date.getMonth() + 1 });
    }

    // group by day
    for (let [key, value] of Object.entries(byYear)) {
        for (let [key2, value2] of Object.entries(value)) {
            byYear[key][key2] = groupBy({ arr: value2, criteria: x => x.date.getDate() });
        }
    }

    return byYear;
};

@observer
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //memories: memoriesProvider.getMemoriesByYearMonthDay(),
            memory: {
                id: 'new',
                time: new Date(),
                text: 'dfsdf'
            }
        };

        this.addMemory = this.addMemory.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
    }

    addMemory(event) {
        event.preventDefault();

        //memoriesProvider.addMemory(this.state.memory);

        this.setState(state => ({
            ...state,
            //memories: memoriesProvider.getMemoriesByYearMonthDay(),
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

        const { memories, state } = this.props.store;
        const byYear = process(memories);

        return (
            <div className="App">
                <h1 className={"title"}>memory lane</h1>

                <h3>{state} | showing {this.props.store.memories.length} memories</h3>

                <div className={"list"}>

                    <div className={"memory"}>
                        add memory: <form>
                        <input type="text" name="text" placeholder="What's on your mind?"
                               onChange={this.onInputValueChange} value={this.state.memory.text} />
                        <input type="submit" value="send" onClick={this.addMemory} />
                    </form>
                    </div>

                    {Object.entries(byYear).map(([year, yearMemories]) => (
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
                                                        <time>{formatDistanceToNow(memory.date, { addSuffix: true })}</time>
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
