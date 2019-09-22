import TextField from "@material-ui/core/TextField";
import * as PropTypes from "prop-types";
import React, { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ChipInput from "material-ui-chip-input";

export class Memory extends Component {

    constructor(props) {
        super(props);

        this.onTextChange = this.onTextChange.bind(this);
        this.onLabelAdd = this.onLabelAdd.bind(this);
        this.onLabelRemove = this.onLabelRemove.bind(this);
    }

    onTextChange(text) {
        let { memory, onChange } = this.props;

        onChange({
            ...memory,
            text
        })
    }

    onLabelAdd(label) {
        let { memory, onChange } = this.props;

        onChange({
            ...memory,
            labels: memory.labels.concat([label])
        });
    }

    onLabelRemove(label, index) {
        let { memory, onChange } = this.props;

        onChange({
            ...memory,
            labels: memory.labels.filter(x => x !== label)
        });
    }

    render() {
        let { memory } = this.props;
        return (
            <div className={"memory"}>
                <TextField fullWidth value={memory.text} onChange={(event) => this.onTextChange(event.target.value)} />
                <time>{formatDistanceToNow(memory.date, { addSuffix: true })}</time>
                <ChipInput
                    value={memory.labels}
                    onAdd={this.onLabelAdd}
                    onDelete={this.onLabelRemove}
                />
            </div>
        );
    }
}

Memory.propTypes = {
    memory: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
};
