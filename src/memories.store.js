import { observable, reaction, action, runInAction } from 'mobx';
import { MemoryModel } from "./memory.model";
import { MemoriesApi } from "./memories.api";
import faker from "faker";

export class MemoriesStore {

    @observable memories = [];

    @action
    addMemory({ text, date }) {
        this.memories.push(new MemoryModel({
            id: faker.random.uuid(),
            text,
            date,
        }));
    }

    @action
    async fetchMemories() {
        this.memories = [];
        this.state = "pending";

        try {
            const memories = await MemoriesApi.fetchMemories();

            // after await, modifying state again, needs an actions:
            runInAction(() => {
                this.state = "done";
                this.memories = memories;
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
        return this.memories.map(memory => memory.toJS());
    }

    static fromJS({ array = [] }) {
        const memoriesStore = new MemoriesStore();
        memoriesStore.memories = array.map(memory => MemoryModel.fromJS(memory));
        return memoriesStore;
    }
}
