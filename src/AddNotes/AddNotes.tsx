import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {v1} from "uuid";
import {noteType} from "../App";
import s from "./AddNotes.module.scss"

type AddNotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const AddNotes = React.memo((props: AddNotesPropsType) => {

    const [noteBody, setNoteBody] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const currentNotes = localStorage.getItem("notes")
        if (currentNotes) {
            props.setNotes(JSON.parse(currentNotes))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(props.notes))
    })

    const addNote = useCallback((e?: string) => {
        const newNotes = {'id': v1(), 'body': noteBody, 'hashtag': []}
        if ((noteBody?.trim() === '' && e === 'Enter') || noteBody?.trim() === '') {
            setError('Enter some text')
            if (e && error !== null) setError(null)
        } else if (e === 'Enter' || !e) {
            props.setNotes([newNotes, ...props.notes])
            setNoteBody('')
            setError('')
        }
    }, [noteBody])
    const textareaChangeHandler =  useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setNoteBody(e.currentTarget.value), [noteBody])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (error !== null) setError(null)
        addNote(e.code)
    }, [noteBody])
    const onClickHandler = useCallback(() => addNote(), [noteBody])
    const setNullError = useCallback(() => setError(null), [error])

    return <div className={s.addNotesContainer}>
        <div className={s.errorField}>
            <textarea value={noteBody} onChange={textareaChangeHandler} onKeyPress={onKeyPressHandler}
                      placeholder={'Enter note...'} autoFocus onBlur={setNullError}/>
            <div>{error && <span>{error}</span>}</div>
        </div>
        <button onClick={onClickHandler}>Add</button>
    </div>
})