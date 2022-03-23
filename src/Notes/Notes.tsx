import React, {ChangeEvent, useState} from "react";
import {noteType} from "../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Notes/Notes.module.css"

type NotesPropsType = {
    allNotes: noteType[]
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
    all: boolean
    setShowAll: (all: boolean) => void
    searchNotes: (e: ChangeEvent<HTMLInputElement> | string) => void
}
export const Notes = (props: NotesPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)

    let notes: noteType[]
    props.all ? notes = props.allNotes : notes = props.notes

    return <div>
        {notes.length > 0
            ? <div className={s.notesContainer}>
                {
                    notes.map(n => {
                            const changeNoteBody = (newNoteBody: string, hashtag: Array<string>) => {
                                    const currentNote = props.allNotes.find(notes => notes.id === n.id) ? {
                                        ...n,
                                        body: newNoteBody,
                                        hashtag
                                    } : n
                                    props.setNotes(props.allNotes.map(n => n.id === currentNote.id ? currentNote : n))
                            }
                            const changeNote = () => {
                                setChangeMode(!changeMode)
                                changeMode && alert('For change double click on Mote Body')
                            }
                            const deleteNote = () => props.setNotes(props.allNotes.filter(notes => notes.id !== n.id))
                            return <div className={s.noteContainer} key={n.id}>
                                <EditableSpan note={n} callback={changeNoteBody} setNotes={props.setNotes}
                                              notes={props.allNotes} searchNotes={props.searchNotes}/>
                                <div className={s.buttonContainer}>
                                    <button onClick={changeNote}>Change</button>
                                    <button onClick={deleteNote}>Delete</button>
                                </div>
                            </div>
                        }
                    )}
            </div>
            : <div>Add notes</div>}
    </div>
}
