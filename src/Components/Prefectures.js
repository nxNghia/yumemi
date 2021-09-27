import React from 'react'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AiOutlineCheck } from 'react-icons/ai'
import PropTypes from 'prop-types'

const Prefecture = ({pref, handleChange}) => {
    const [selected, setSelected] = useState(false)
    const [hover, setHover] = useState(false)
    const large_screen = useMediaQuery({minWidth: 1224})
    const medium_screen = useMediaQuery({minWidth: 500, maxWidth: 1224})

    const style = {
        prefecture: {
            width: large_screen ? "8em" : medium_screen ? "8em" : "6em",
            textAlign: "left",
            height: "2em",
            marginLeft: "1.5em",
            marginRight: "1.5em",
            paddingTop: "0.5em",
            fontSize: "xx-large",
            fontWeight: "bold",
            borderRadius: "0.5em",
            boxShadow: "0.2em 0.2em #222222",
            marginBottom: "1em",
            color: selected ? "#ffffff" : "#000000",
            background: selected ? "#e33939" : hover ? "#76a86f" : "#8af07d",
            position: "relative",
            transition: "background 200ms, color 200ms",
        },

        name: {
            padding: "0.2em 1em 0.2em 1em",
            borderRadius: "1em",
            position: "absolute",
            top: "0.3em",
            left: selected ? "10%" : "20%",
            transition: "left 200ms"
        },

        checkIcon: {
            position: "absolute",
            top: "30%",
            right: "10%",
            background: "#19a30f",
            borderRadius: "50%",
            padding: "0.1em",
            border: "2px #ffffff solid",
            opacity: selected ? 1 : 0,
            color: "#ffffff",
            transition: "opacity 200ms",
        }
    }

    return (
        <div style={style.prefecture}
            onMouseEnter={() => setHover(true)}

            onMouseLeave={() => setHover(false)}

            onClick={() => {
                setSelected(!selected)
                handleChange(!selected, pref)
            }}
        >
            <label style={style.name} htmlFor={pref.prefCode}
                
            >{pref.prefName}</label>
            <AiOutlineCheck style={style.checkIcon} size="20"/>
        </div>
    )
}

Prefecture.propTypes = {
    pref: PropTypes.any,
    handleChange: PropTypes.func,
}

export default Prefecture