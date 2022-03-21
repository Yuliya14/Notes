import React, {useState} from "react";
import {noteType} from "../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Notes/Notes.module.css"

type NotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const Notes = (props: NotesPropsType) => {
    const [changeMode, setChangeMode] = useState<boolean>(false)

    return <div className={s.notesContainer}>

        {props.notes.map(n => {
                const changeNoteBody = (newNoteBody: string, hashtag: any) => {
                    const currentNote = props.notes.find(notes => notes.id === n.id) ? {...n, body: newNoteBody, hashtag} : n
                    props.setNotes(props.notes.map(n => n.id === currentNote.id ? currentNote : n))
                }
                const changeNote = () => {
                    setChangeMode(!changeMode)
                    changeMode && alert('For change double click on Mote Body')
                }
                const deleteNote = () => props.setNotes(props.notes.filter(notes => notes.id !== n.id))
                return <div className={s.noteContainer} key={n.id}>
                    <EditableSpan note={n} callback={changeNoteBody} setNotes={props.setNotes} notes={props.notes}/>
                    <div className={s.buttonContainer}>
                        <button onClick={changeNote}>Change</button>
                        <button onClick={deleteNote}>Delete</button>
                    </div>
                </div>
            }
        )}
    </div>

}
