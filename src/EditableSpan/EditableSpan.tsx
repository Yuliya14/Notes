import React, {ChangeEvent, useState} from 'react';
import s from "./EditableSpan.module.css"
import {Hashtag} from "../Hashtag";
import {noteType} from "../App";

type EditableSpanPropsType = {
    note: noteType
    notes: noteType[]
    callback: (body: string, hashtag: any) => void
    setNotes: (notes: noteType[]) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.note.body)
    const [hashtag, setHashtag] = useState<Array<string | RegExp>>(props.note.hashtag)

    const regularHashtag = /#[0-9A-Za-zА-Яа-яё]+/g

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.note.body);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.callback(title, hashtag);
    }
    const changeNoteBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        const hashtagArray = e.currentTarget.value.match(regularHashtag)
        if(hashtagArray) {
            hashtagArray && setHashtag(hashtagArray)
            props.setNotes([...props.notes.map(n => n.id === props.note.id ? {...props.note, hashtag: hashtagArray} : n)])
        }
    }

    return <div className={s.editableSpanContainer}>
        {editMode
            ? <div className={s.textField}>
                <textarea value={title} onChange={changeNoteBody} onBlur={activateViewMode}/>
            </div>
            : <div>
                <div
                    onDoubleClick={activateEditMode}>{props.note.body.replace(regularHashtag, (str: string) => str.slice(1))}</div>
                <Hashtag note={props.note} hashtag={hashtag}/>
            </div>}
    </div>
})
