import { observable, reaction, action, runInAction, computed, toJS } from 'mobx';
import { MemoryModel } from "../models/memory.model";
import { MemoriesApi } from "../apis/memories.api";
import { generateGuid } from "../utitlities/utilities";

export class MemoriesStore {

    @observable _memories = observable.array();

    @computed get memories() {
        return this._memories;
    };

    @action
    addMemory({ text, date, labels = [] }) {
        const id = generateGuid();

        this._memories.push(new MemoryModel({
            id,
            text,
            date,
            labels
        }));
    }

    @action
    updateMemory({ id, newMemory }) {
        const memory = this._memories.find(m => m.id === id);

        memory.text = newMemory.text;
        memory.labels = newMemory.labels;
        memory.date = newMemory.date;

        console.log('updated', memory);
    }

    @action
    async fetchMemories() {
        this.state = "loading...";
        this._memories = observable.array();

        try {
            const memories = await MemoriesApi.fetchMemories();

            // after await, modifying state again, needs an actions:
            runInAction(() => {
                this.state = "done";
                memories.forEach(m => this._memories.push(m));
            })
        } catch (error) {
            runInAction(() => {
                this.state = "error";
            })
        }
    }

    subscribeServerToStore() {
        reaction(
            () => this.toJS(),
            memories => MemoriesApi.saveMemories(memories)
        );
    }

    toJS() {
        return this._memories.map(memory => {
            return toJS(memory)
        });
    }

    static fromJS({ array = [] }) {
        const memoriesStore = new MemoriesStore();
        array.forEach(memory => memoriesStore.memories.push(MemoryModel.fromJS(memory)));
        return memoriesStore;
    }
}

export const memoriesStore = MemoriesStore.fromJS({});
