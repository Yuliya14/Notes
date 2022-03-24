import React, {ChangeEvent, useCallback} from "react";
import {noteType} from "../App";
import s from "./Notes.module.scss"
import {EditableSpan} from "../EditableSpan/EditableSpan";

type NotesPropsType = {
    allNotes: noteType[]
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
    all: boolean
    setShowAll: (all: boolean) => void
    searchNotes: (e: ChangeEvent<HTMLInputElement> | string) => void
}
export const Notes = React.memo((props: NotesPropsType) => {

    let notes: noteType[]
    props.all ? notes = props.allNotes : notes = props.notes

    return <div>
        {notes.length > 0
            ? <div className={s.notesContainer}>
                {notes.map(n => <Note setNotes={props.setNotes} searchNotes={props.searchNotes}
                                         allNotes={props.allNotes} currentNote={n}/>)}
            </div>
            : <div style={{textAlign: "center"}}>Add notes</div>}
    </div>
})

type NotePropsType = {
    currentNote: noteType
    allNotes: noteType[]
    setNotes: (notes: noteType[]) => void
    searchNotes: (e: ChangeEvent<HTMLInputElement> | string) => void
}
const Note = React.memo((props: NotePropsType) => {

    const changeNoteBody = useCallback((newNoteBody: string, hashtag: Array<string>) => {
        const currentNote = props.allNotes.find(notes => notes.id === props.currentNote.id) ? {
            ...props.currentNote,
            body: newNoteBody,
            hashtag
        } : props.currentNote
        props.setNotes(props.allNotes.map(n => n.id === currentNote.id ? currentNote : n))
    }, [props])
    const deleteNote = useCallback(() => {
        props.setNotes(props.allNotes.filter(notes => notes.id !== props.currentNote.id))
    }, [props])

    return <div className={s.noteContainer} key={props.currentNote.id}>
        <div className={s.buttonContainer}>
            <button onClick={deleteNote}>x</button>
        </div>
        <EditableSpan note={props.currentNote} callback={changeNoteBody} setNotes={props.setNotes}
                      notes={props.allNotes} searchNotes={props.searchNotes}/>
    </div>
})
