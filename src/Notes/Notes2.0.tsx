import React, {useState} from "react";
import {noteType} from "../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Notes/Notes.module.css"

type NotesPropsType = {
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
}
export const Notes = (props: NotesPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    return <div className={s.notesContainer}>

         {props.notes.map(n => {

             const changeNote = () => editMode ? setEditMode(false) : setEditMode(true)

             const deleteNote = () => props.setNotes(props.notes.filter(notes => notes.id !== n.id))

             return <div  className={s.noteContainer}>
                {/* <EditableSpan editMode={editMode} setEditMode={setEditMode} body={n.body}/>*/}
                 <div className={s.buttonContainer} >
                     <button onClick={changeNote}>Change</button>
                     <button onClick={deleteNote}>Delete</button>
                 </div>
             </div>
         })}
     </div>

}