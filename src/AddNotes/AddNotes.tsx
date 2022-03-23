import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {v1} from "uuid";
import {noteType} from "../App";
import s from "./AddNotes.module.scss"

type AddNotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const AddNotes = React.memo((props: AddNotesPropsType) => {
    console.log('AddNotes')
    const [noteBody, setNoteBody] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let currentNotes = localStorage.getItem("notes")
        if (currentNotes) {
            props.setNotes(JSON.parse(currentNotes))
        }
    }, [])

    const addNote = useCallback((e?: string) => {
        const newNotes = {'id': v1(), 'body': noteBody, 'hashtag': []}
        if ((noteBody?.trim() === '' && e === 'Enter') || noteBody?.trim() === '') {
            setError('Enter some text')
            if (e && error !== null) setError(null)
        } else if (e === 'Enter' || !e) {
            localStorage.setItem("notes", JSON.stringify([newNotes, ...props.notes]))
            props.setNotes([newNotes, ...props.notes])
            setNoteBody('')
            setError('')
        }
    }, [ noteBody])
    const textareaChangeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setNoteBody(e.currentTarget.value), [])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (error !== null) setError(null)
        addNote(e.code)
    }, [])
    const onClickHandler = () => addNote()
    const setNullError = useCallback(() => setError(null), [])
    return <div className={s.addNotesContainer}>
        <div className={s.errorField}>
            <textarea value={noteBody} onChange={textareaChangeHandler} onKeyPress={onKeyPressHandler}
                      placeholder={'Enter note...'} autoFocus onBlur={setNullError}/>
            <div>{error && <span>{error}</span>}</div>
        </div>
        <button onClick={onClickHandler}>Add</button>
    </div>
})