import React, {useState} from 'react';
import './App.module.css';
import {AddNotes} from "./AddNotes/AddNotes";
import {SearchNotes} from "./SearchNotes/SearchNotes";
import {Header} from "./HeaderFooter/Header";
import {Footer} from "./HeaderFooter/Footer";

export type noteType = {
    "id": string,
    "body": string,
    "hashtag": Array<string>,
}

function App() {
    const [notes, setNotes] = useState<noteType[]>([])

    return <div className="App">
        <Header/>
        <AddNotes notes={notes} setNotes={setNotes}/>
        <SearchNotes notes={notes} setNotes={setNotes}/>
        <Footer/>
    </div>
}

export default App;
