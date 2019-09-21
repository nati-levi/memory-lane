import faker from "faker";

export class MemoriesApi {
    static fetchMemories() {
        return new Promise(resolve => {
            console.log('fetching...');

            const fakes = this.fakeMemories();

            setTimeout(() => resolve(fakes), 1000);
        })
    }

    static fakeMemories() {
        const fakes = [];

        // generate fake memories
        for (let i = 0; i < 10; i++) {
            fakes.push({
                id: faker.random.uuid(),
                text: `${faker.lorem.sentence()} ${faker.lorem.sentence()}`,
                date: faker.date.past(30),
                labels: [faker.lorem.word(), faker.lorem.word()]
            })
        }
        return fakes;
    }

    static saveMemories(memories) {
        return new Promise(resolve => {
            console.log('saving...');
            setTimeout(() => resolve('saved'), 5000);
        })
    }
}
