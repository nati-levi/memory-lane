import { MemoryModel } from "../models/memory.model";
import faker from "faker";

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

export { fakeMemories };
