import React, {ChangeEvent, useState} from "react";
import {noteType} from "../App";
import {Notes} from "../Notes/Notes";
import s from "./SearchNotes.module.css";
import iconSearch from "../assets/premium-icon.png"

type SearchNotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const SearchNotes = (props: SearchNotesPropsType) => {
    const [value, setValue] = useState<string>('')
    const [all, setShowAll] = useState<boolean>(false)

    const searchNotes = (e: ChangeEvent<HTMLInputElement> | string) => {
        if (typeof e !== "string") {
            setValue(e.currentTarget.value)
        } else setValue(e)
        setShowAll(false)
    }
    const showAllNotes = () => {
        setShowAll(true)
        setValue('')
    }

    const filteredNotes = value.trim() !== '' ? props.notes.filter(n => n.body.toLowerCase().includes(value.toLowerCase())) : props.notes

    return <div>
       <div className={s.searchNotesContainer}>
           <div className={s.searchContainer}>
            <span className={s.iconSearch}><img src={iconSearch}/></span>
            <input type={'search'} placeholder={'Search...'} value={value} onChange={searchNotes} disabled={props.notes.length === 0}/></div>
           <button onClick={showAllNotes} disabled={filteredNotes === props.notes}>Show all</button>
       </div>
        <Notes allNotes={props.notes} notes={filteredNotes} setNotes={props.setNotes} all={all}
               setShowAll={setShowAll} searchNotes={searchNotes}/>
    </div>
}