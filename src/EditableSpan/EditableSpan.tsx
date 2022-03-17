import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    body: string
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [body, setBody] = useState<string>(props.body)

    const changeNoteBody = (e: ChangeEvent<HTMLInputElement>) => setBody(e.currentTarget.value)
    const closeEditMode = () => props.setEditMode(false)

    return <div>
        {props.editMode
            ? <input value={body} onChange={changeNoteBody} autoFocus onBlur={closeEditMode}/>
            : <span>{body}</span>}
    </div>
}