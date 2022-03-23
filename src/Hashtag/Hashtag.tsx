import React, {ChangeEvent, MouseEvent, useCallback} from "react";
import {noteType} from "../App";

type HashtagPropsType = {
    note: noteType
    notes: noteType[]
    setNotes: (notes: noteType[]) => void
    hashtag: Array<string | RegExp>
    searchNotes: (e: ChangeEvent<HTMLInputElement> | string) => void
}
export const Hashtag = React.memo((props: HashtagPropsType) => {
    console.log('Hashtag')

    return <div>{props.hashtag && props.hashtag.map((h,index) => {

        const findAllHashtag = (e: MouseEvent<HTMLAnchorElement>) => {
            props.searchNotes(h.toString())
            e.preventDefault()
        }
        return <a href="" onClick={findAllHashtag} key={index}>{` ${h} `}</a>
    })}
    </div>
})