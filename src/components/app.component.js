import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { LabelsFilter } from "./labels-filter.component";
import { MemoriesComponent } from "./memories.component";
import Button from "@material-ui/core/Button";
import { PrimarySearchAppBar } from "./appbar.component";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import { fakeMemories } from "../utitlities/faker.service";
import { memoriesStore } from "../stores/memories.store";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '100px'
    }
}));

function extractLabels(memories) {
    const all = memories.map(m => m.labels).flat();
    const distinct = [...new Set(all)];
    return distinct;
}

function filterMemories({ memories, labels }) {

    let result = [...memories];

    // filter by labels
    result = (labels.length === 0) ? result : result.filter(m => m.labels.some(l => labels.includes(l)));

    return result;
}

function addMemory(event) {
    event.preventDefault();

    memoriesStore.addMemory(this.state.memory);
}

function updateMemory(memory) {
    console.log('update', memory);
    memoriesStore.updateMemory({ id: memory.id, newMemory: memory });
}

function insertFakeMemories() {
    fakeMemories().forEach(m => {
        memoriesStore.addMemory(m);
    });
}

const App = observer(() => {
    const [filteredLabels, setLabels] = useState([]);
    const classes = useStyles();

    const allLabels = extractLabels(memoriesStore.memories);
    const filteredMemories = filterMemories({ memories: memoriesStore.memories.slice(), labels: filteredLabels });

    return (
        <div className="App">
            <PrimarySearchAppBar />

            <Container maxWidth="md" className={classes.container}>

                <div className={"filters"}>
                    <LabelsFilter labels={allLabels} onChange={setLabels} />
                </div>

                <h3>{memoriesStore.state} | showing {filteredMemories.length} memories</h3>

                <div className={"list"}>

                    <div className={"memory"}>
                        add memory:
                        {/*<form>*/}
                        {/*    <input type="text" name="text" placeholder="What's on your mind?"*/}
                        {/*           onChange={this.onInputValueChange} value={this.state.memory.text} />*/}
                        {/*    <input type="submit" value="send" onClick={addMemory} />*/}
                        {/*</form>*/}
                        <Button onClick={insertFakeMemories}>fake</Button>
                    </div>

                    <MemoriesComponent memories={filteredMemories} onMemoryChange={updateMemory} />

                </div>

            </Container>
        </div>
    );
});

export { App };
