import React, {MouseEvent} from "react";
import {noteType} from "../App";

type HashtagPropsType = {
    note: noteType
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
    hashtag: Array<string | RegExp>
}
export const Hashtag = (props: HashtagPropsType) => {

    return <div>{props.hashtag && props.hashtag.map((h,index) => {

        const findAllHashtag = (e: MouseEvent<HTMLAnchorElement>) => {
            props.setNotes(props.notes.filter(n => n.hashtag.includes(h.toString())))
            e.preventDefault()
        }

        return <a href="" onClick={findAllHashtag} key={index}>{` ${h} `}</a>
    })}
    </div>
}