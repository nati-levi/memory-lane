import * as React from "react";
import { MultipleSelect } from "react-select-material-ui";
import * as PropTypes from "prop-types";

export class LabelsFilter extends React.Component {

    render() {
        const { labels, onChange } = this.props;

        return (
            <MultipleSelect
                label="Labels"
                options={labels}
                onChange={onChange}
                SelectProps={{
                    isCreatable: false,
                    msgNoOptionsAvailable: "All tags are selected",
                    msgNoOptionsMatchFilter: "No tag matches the filter"
                }}
            />
        );
    }
}

LabelsFilter.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
};
