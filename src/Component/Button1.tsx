import React from "react";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type propsType = {
    callBack: () => void

}

export const Button1 = (props: propsType) => {
    const OnClickHandler = () => {
        props.callBack()
    }

    return (
        <IconButton aria-label="delete" onClick={OnClickHandler}>
            <Delete/>
        </IconButton>
    )
}