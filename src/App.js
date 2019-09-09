import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import faker from 'faker';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memories: [],
            memory: {
                time: new Date(),
                text: 'dfsdf'
            }
        };

        for (let i = 0; i < 20; i++) {
            this.state.memories.push({
                time: faker.date.past(),
                text: `${faker.lorem.sentence()} ${faker.lorem.sentence()}`
            })
        }

        this.addMemory = this.addMemory.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
    }

    addMemory(event) {
        event.preventDefault();

        this.setState(state => ({
            ...state,
            memories: [...state.memories, this.state.memory],
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
