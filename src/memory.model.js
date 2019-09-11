import { observable } from "mobx";

export class MemoryModel {
    id;
    @observable text;
    @observable date;

    constructor({ id, text, date }) {
        this.id = id;
        this.text = text;
        this.date = date;
    }

    toJS() {
        return {
            id: this.id,
            text: this.text,
            date: this.date,
        };
    }

    static fromJS({ id, text, date }) {
        return new MemoryModel({ id, text, date });
    }
}
