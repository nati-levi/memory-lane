const KEY = 'MEMORY_LANE_STORAGE';

export class MemoriesApi {
    static fetchMemories() {
        return new Promise(resolve => {
            console.log('fetching...');

            const stored = localStorage.getItem(KEY);

            if (stored === null) {
                const fakes = this.fakeMemories();
                resolve(fakes);
            }

            resolve(JSON.parse(stored));
        })
    }

    static saveMemories(memories) {
        return new Promise(resolve => {

            localStorage.setItem(KEY, JSON.stringify(memories));

            console.log('saving...');
            setTimeout(() => resolve('saved'), 5000);
        })
    }
}
