import React, {ChangeEvent, useState} from "react";
import {noteType} from "../App";

type SearchNotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const SearchNotes = (props: SearchNotesPropsType) => {
    const [value, setValue] = useState<string>('')

    const searchByHashtag = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const filteredNotes =  props.notes.filter(n => n.hashtag.filter(h => h === value))
    console.log(filteredNotes)
    const  showNotes = () => props.setNotes(filteredNotes)

    return <div>
        <input type={'text'} placeholder={'Search by hashtag...'} onChange={searchByHashtag}/>
        <button onClick={showNotes}>Search</button>
    </div>
}