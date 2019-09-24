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
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '100px'
    },
    yearList: {
        position: 'fixed',
        right: 0
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

function extractYears(filteredMemories) {

    const years = filteredMemories.map(m => new Date(m.date).getFullYear());

    const distinct = [...new Set(years)];

    const sorted = distinct.sort();

    return sorted;
}

const App = observer(() => {
    const [filteredLabels, setLabels] = useState([]);
    const classes = useStyles();

    const allLabels = extractLabels(memoriesStore.memories);

    const filteredMemories = filterMemories({ memories: memoriesStore.memories.slice(), labels: filteredLabels });

    const years = extractYears(filteredMemories);

    return (
        <div className="App">
            <PrimarySearchAppBar />

            <Container maxWidth="md" className={classes.container}>

                <List component="nav" className={classes.yearList}>
                    {years.map(year => (
                        <ListItem dense>
                            <Link href={`#${year}`}><ListItemText primary={year} /></Link>
                        </ListItem>
                    ))}
                </List>

                <div>
                    <LabelsFilter labels={allLabels} onChange={setLabels} />
                </div>

                <h3>{memoriesStore.state} | showing {filteredMemories.length} memories</h3>

                <div>
                    {/*<form>*/}
                    {/*    <input type="text" name="text" placeholder="What's on your mind?"*/}
                    {/*           onChange={this.onInputValueChange} value={this.state.memory.text} />*/}
                    {/*    <input type="submit" value="send" onClick={addMemory} />*/}
                    {/*</form>*/}
                    <Button onClick={insertFakeMemories}>fake</Button>

                    <MemoriesComponent memories={filteredMemories} onMemoryChange={updateMemory} />

                </div>

            </Container>
        </div>
    );
});

export { App };
