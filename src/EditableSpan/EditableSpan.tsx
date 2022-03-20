import React, {ChangeEvent, useState} from 'react';
import s from "./EditableSpan.module.css"

type EditableSpanPropsType = {
    body: string
    callback: (body: string) => void
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
        props.callback(title);
    }
    const changeNoteBody = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.currentTarget.value)

    return <div className={s.editableSpanContainer}>
        {editMode
            ? <div className={s.textField}>
                <textarea value={title} onChange={changeNoteBody} onBlur={activateViewMode}/>
            </div>
            : <div>
                <div onDoubleClick={activateEditMode}>{props.body.replace(regularHashtag, (str: string) => str.slice(1))}</div>
                <div>{hashtagArray && hashtagArray.map(h => <a href="" onClick={findAllHashtag}>{` ${h} `}</a>)}</div>
            </div>}
    </div>
})