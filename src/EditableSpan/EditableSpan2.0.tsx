import React, {ChangeEvent, useState} from "react";
import s from "./EditableSpan.module.css"

type EditableSpanPropsType = {
    body: string
    editMode: boolean | null
    setEditMode: (editMode: boolean) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [body, setBody] = useState<string>(props.body)
    const regularHashtag = /#[0-9A-Za-zА-Яа-яё]+/g
    const hashtagArray = body.match(regularHashtag)
    const host = "https://domain.com"
    const changeNoteBody = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value)
    const findAllHashtag = () => {}
     const activateEditMode = () => {
        props.setEditMode(true);
         setBody(props.body);
     }
    const activateViewMode = () => props.setEditMode(false);

    return <div className={s.editableSpanContainer}>
        {props.editMode
            ? <div className={s.textField}>
                <textarea value={body} onChange={changeNoteBody} onBlur={activateViewMode}/>
            </div>
            : <div>
                <div onDoubleClick={activateEditMode}>{props.body}</div>
                <div>{hashtagArray && hashtagArray.map(h => <a href="" onClick={findAllHashtag}>{` ${h} `}</a>)}</div>
            </div>}
    </div>

}



/*
import React, {ChangeEvent, useState} from 'react';
import s from "./EditableSpan.module.css"

type EditableSpanPropsType = {
    body: string
    onChange: (noteBody: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.body)
    const regularHashtag = /#[0-9A-Za-zА-Яа-яё]+/g
    const hashtagArray = title.match(regularHashtag)
    const host = "https://domain.com"
    const findAllHashtag = () => {}

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.body);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeNoteBody = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.currentTarget.value)

    return <div className={s.editableSpanContainer}>
        {editMode
            ? <div className={s.textField}>
                <textarea value={title} onChange={changeNoteBody} onBlur={activateViewMode}/>
            </div>
            : <div>
                <div onDoubleClick={activateEditMode}>{title}</div>
                <div>{hashtagArray && hashtagArray.map(h => <a href="" onClick={findAllHashtag}>{` ${h} `}</a>)}</div>
            </div>}
    </div>
})
*/