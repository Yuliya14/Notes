import React, {ChangeEvent,FocusEvent, useState} from 'react';
import s from "./EditableSpan.module.css"
import {Hashtag} from "../Hashtag/Hashtag";
import {noteType} from "../App";

type EditableSpanPropsType = {
    note: noteType
    notes: noteType[]
    callback: (body: string, hashtag: any) => void
    setNotes: (notes: noteType[]) => void
    searchNotes: (e: ChangeEvent<HTMLInputElement> | string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.note.body)
    const [hashtag, setHashtag] = useState<Array<string>>(props.note.hashtag)

    const regularHashtag = /#[0-9A-Za-zА-Яа-яё]+/g

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.note.body)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.callback(title, hashtag)
        setHashtag(props.note.hashtag)
    }

    const changeNoteBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        const hashtagArray = e.currentTarget.value.match(regularHashtag)
        if (hashtagArray) {
            setHashtag(hashtagArray)
            props.setNotes([...props.notes.map(n => n.id === props.note.id ? {
                ...props.note,
                hashtag: hashtagArray
            } : n)])
        }
    }

        const textarea = document.getElementById("textarea");
        if(textarea) {
                const index = (textarea as HTMLTextAreaElement).value.split(' ');
                console.log(index)
                index.map(i => i.includes('#') ? <span style={{color: 'red'}}>{i}</span> : i)
        }

    return <div className={s.editableSpanContainer}>
        {editMode
            ? <div className={s.textField}>
                <textarea id={'textarea'} value={title} onChange={changeNoteBody} onBlur={activateViewMode} />
            </div>
            : <div>
                <div id={'search'} onDoubleClick={activateEditMode}>{props.note.body.replace(regularHashtag, (str: string) => str.slice(1))}</div>
                {props.note.body.match(regularHashtag) &&
                <Hashtag note={props.note} hashtag={hashtag} notes={props.notes} setNotes={props.setNotes} searchNotes={props.searchNotes}/>}</div>}
    </div>
})
