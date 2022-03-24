import React, {ChangeEvent, useCallback, useState} from 'react';
import s from "./EditableSpan.module.scss"
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

    const activateEditMode = useCallback(() => {
        setEditMode(true)
        setTitle(props.note.body)
    }, [props.note.body])
    const activateViewMode = useCallback(() => {
        setEditMode(false)
        props.callback(title, hashtag)
        setHashtag(props.note.hashtag)
    }, [props.callback, props.note.hashtag])
    const changeNoteBody = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        const hashtagArray = e.currentTarget.value.match(regularHashtag)
        if (hashtagArray) {
            setHashtag(hashtagArray)
            props.setNotes([...props.notes.map(n => n.id === props.note.id ? {
                ...props.note,
                hashtag: hashtagArray
            } : n)])
        }
    }, [title, props])

    return <div className={s.editableSpanContainer}>
        {editMode
            ? <div className={s.textField}>
                <textarea id={'textarea'} value={title} onChange={changeNoteBody} onBlur={activateViewMode} />
            </div>
            : <div>
                <div id={'search'} onDoubleClick={activateEditMode} style={{cursor: 'pointer'}}>{props.note.body.replace(regularHashtag, (str: string) => str.slice(1))}</div>
                {title.match(regularHashtag) &&
                <Hashtag note={props.note} hashtag={hashtag} notes={props.notes} setNotes={props.setNotes} searchNotes={props.searchNotes}/>}</div>}
    </div>
})
