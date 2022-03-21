import React from "react";
import {noteType} from "./App";

type HashtagPropsType = {
    note: noteType
    hashtag: Array<string | RegExp>
}
export const Hashtag = (props: HashtagPropsType) => {

    const findAllHashtag = () => {}

    return <div>{props.hashtag && props.hashtag.map((h,index) =>
        <a href="" onClick={findAllHashtag} key={index}>{` ${h} `}</a>)}</div>
}