import React, {useState} from "react";
import {noteType} from "./App";
import {EditableSpan} from "./EditableSpan";

type NotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const Notes = (props: NotesPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    return <div>
        {props.notes.map(n => {
            const changeNote = () => setEditMode(true)
            const deleteNote = () => props.setNotes(props.notes.filter(notes => notes.id !== n.id))

            return <div key={n.id}>
                <EditableSpan body={n.body} editMode={editMode} setEditMode={setEditMode}/>
                <button onClick={changeNote}>Change</button>
                <button onClick={deleteNote}>Delete</button>
            </div>
        })}
    </div>
}
