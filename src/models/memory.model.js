import { observable } from "mobx";

export class MemoryModel {
    id;
    @observable text;
    @observable date;
    @observable labels;

    constructor({ id, text, date, labels }) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.labels = labels;
    }

    toJS() {
        return {
            id: this.id,
            text: this.text,
            date: this.date,
            labels: this.labels,
        };
    }

    static fromJS({ id, text, date, labels }) {
        return new MemoryModel({ id, text, date, labels });
    }
}
