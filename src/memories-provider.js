import faker from "faker";

export class MemoriesProvider {

    constructor() {

        this.memories = [];

        for (let i = 0; i < 20; i++) {
            this.addMemory({
                time: faker.date.past(),
                text: `${faker.lorem.sentence()} ${faker.lorem.sentence()}`
            })
        }

        this.getMemoriesByYearMonthDay = this.getMemoriesByYearMonthDay.bind(this);
        this.addMemory = this.addMemory.bind(this);

    }

    getMemoriesByYearMonthDay() {
        return this.memories;
    }

    addMemory(memory) {
        this.memories.push(memory);
    }
}
