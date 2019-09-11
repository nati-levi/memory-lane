import faker from "faker";
import { groupBy } from "./utilities";

export class MemoriesProvider {

    constructor() {

        this.memories = [];

        // generate fake memories
        for (let i = 0; i < 100; i++) {
            this.addMemory({
                time: faker.date.past(30),
                text: `${faker.lorem.sentence()} ${faker.lorem.sentence()}`
            })
        }

        // group by year
        this.memories = groupBy({ arr: this.memories, criteria: x => x.time.getFullYear() });

        // group by month
        for (let [key, value] of Object.entries(this.memories)) {
            this.memories[key] = groupBy({ arr: value, criteria: x => x.time.getMonth() + 1 });
        }

        // group by day
        for (let [key, value] of Object.entries(this.memories)) {
            for (let [key2, value2] of Object.entries(value)) {
                this.memories[key][key2] = groupBy({ arr: value2, criteria: x => x.time.getDate() });
            }
        }

        this.getMemoriesByYearMonthDay = this.getMemoriesByYearMonthDay.bind(this);
        this.addMemory = this.addMemory.bind(this);

    }

    getMemoriesByYearMonthDay() {
        window.memories = this.memories; // for debug
        return this.memories;
    }

    addMemory(memory) {
        this.memories.push(memory);
    }
}
