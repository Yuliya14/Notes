import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {v1} from "uuid";
import {noteType} from "../App";
import s from "./AddNotes.module.css"

type AddNotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const AddNotes = (props: AddNotesPropsType) => {
    const [noteBody, setNoteBody] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addNote = (e?: string) => {
        const newNotes = {'id': v1(), 'body': noteBody, 'hashtag': []}
        if ((noteBody?.trim() === '' && e === 'Enter') || noteBody?.trim() === '') {
            setError('Enter some text')
            if (e && error !== null) setError(null)
        } else if (e === 'Enter' || !e) {
            props.setNotes([newNotes, ...props.notes])
            setNoteBody('')
            setError('')
        }
    }
    const textareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setNoteBody(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (error !== null) setError(null)
        addNote(e.code)
    }
    const onClickHandler = () => addNote()
    const setNullError = () => setError(null)
    return <div className={s.addNotesContainer}>
        <div className={s.errorField}>
            <textarea value={noteBody} onChange={textareaChangeHandler} onKeyPress={onKeyPressHandler}
                      placeholder={'Enter note...'} autoFocus onBlur={setNullError}/>
            <div>{error && <span>{error}</span>}</div>
        </div>
        <button onClick={onClickHandler}>Add</button>
    </div>
}