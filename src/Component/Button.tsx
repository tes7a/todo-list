import React from "react";

type propsType = {
    callBack: () => void

}

export const Button = (props: propsType) => {
    const OnClickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={OnClickHandler}>X</button>
    )
}