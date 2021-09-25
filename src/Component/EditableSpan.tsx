import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpan = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpan) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter'){
            activeViewMode()
        }
    }

    return editMode ?
        <TextField value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} onKeyPress={onKeyPressHandler} autoFocus/> :
        <span onDoubleClick={activeEditMode}>{props.title}</span>
}