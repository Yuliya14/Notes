import React, {ChangeEvent, useCallback, useState} from "react";
import {noteType} from "../App";
import {Notes} from "../Notes/Notes";
import s from "./SearchNotes.module.scss";
import iconSearch from "../assets/premium-icon.png"

type SearchNotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const SearchNotes = React.memo((props: SearchNotesPropsType) => {
    console.log('SearchNotes')
    const [value, setValue] = useState<string>('')
    const [all, setShowAll] = useState<boolean>(false)

    const searchNotes = useCallback((e: ChangeEvent<HTMLInputElement> | string) => {
        if (typeof e !== "string") {
            setValue(e.currentTarget.value)
        } else setValue(e)
        setShowAll(false)
    }, [value, all])
    const showAllNotes = useCallback(() => {
        setShowAll(true)
        setValue('')
    }, [all])

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
})