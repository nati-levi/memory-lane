import { groupBy, MONTHS } from "../utitlities/utilities";
import { Memory } from "./memory.component";
import React, { useState } from "react";
import * as PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import { observer } from "mobx-react";

const process = (memories) => {
    let result = memories;

    // group by year
    result = groupBy({
        arr: result, criteria: x => {
            return new Date(x.date).getFullYear();
        }
    });

    // group by month
    for (let [key, value] of Object.entries(result)) {
        result[key] = groupBy({ arr: value, criteria: x => new Date(x.date).getMonth() + 1 });
    }

    // group by day
    for (let [key, value] of Object.entries(result)) {
        for (let [key2, value2] of Object.entries(value)) {
            result[key][key2] = groupBy({ arr: value2, criteria: x => new Date(x.date).getDate() });
        }
    }

    // todo: add missing years, months.

    return result;
};

const MemoriesComponent = observer(({ memories, onMemoryChange }) => {
    let [open, setOpen] = useState(true);

    const toggle = () => {
        open = setOpen(!open);
    };

    const byYear = process(memories);

    return (
        <div>
            {Object.entries(byYear).map(([year, yearMemories]) => (
                <div className={"year"} key={year}>
                    <h2 className={"title"} onClick={toggle}>{year}</h2>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {Object.entries(yearMemories).map(([month, monthMemories]) => (
                            <div className={"month"} key={month}>
                                <h3 className={"title"}>{MONTHS[month]}</h3>
                                <div className={"month-memories"}>
                                    {Object.entries(monthMemories).map(([day, dayMemories]) => (
                                        <div className={"day"} key={day}>
                                            <h4 className={"title"}>{day}</h4>
                                            {dayMemories.map(memory => (
                                                <Memory
                                                    key={memory.id}
                                                    memory={memory}
                                                    onChange={onMemoryChange}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </Collapse>
                </div>
            ))}
        </div>
    );
});

MemoriesComponent.propTypes = {
    memories: PropTypes.array.isRequired,
    onMemoryChange: PropTypes.func.isRequired,
};

export { MemoriesComponent };
