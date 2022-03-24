import React, {useState} from 'react';
import s from './App.module.scss';
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

    return <div className={s.App}>
        <Header/>
        <div className={s.main}>
            <AddNotes notes={notes} setNotes={setNotes}/>
            <SearchNotes notes={notes} setNotes={setNotes}/>
        </div>
        <Footer/>
    </div>
}

export default App;
