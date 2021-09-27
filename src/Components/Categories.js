import React from 'react'
import { useState } from 'react'
import { ReactComponent as Aged } from '../Icons/aged.svg'
import { ReactComponent as Middle } from '../Icons/middle.svg'
import { ReactComponent as Young } from '../Icons/young.svg'
import { ReactComponent as Population } from '../Icons/population.svg'
import { AiOutlineClose } from 'react-icons/ai'
import PropTypes from 'prop-types'

const Category = ({category_name, category_index, selected_index, changeCategory}) => {
    const [hover, setHover] = useState(false)

    const style = {
        items: {
            marginBottom: 5,
            fontSize: "x-large",
            fontWeight: "bold",
            marginLeft: 0,
            paddingLeft: 35,
            position: "relative",
            background: category_index == selected_index ? "#ffffff" : hover ? "#d96f41" : "transparent",
            color: category_index == selected_index ? "#242323" : "#ffffff",
            height: "2em",
            transition: "background 200ms ease-in-out, color 200ms"
        },

        icons: {
            position: "absolute",
            top: 2,
            left: 0
        },

        radioBtn: {
            opacity: 0
        },

        label: {
            position: "absolute",
            top: "0.2em",
            left: "2.4em"
        }
    }

    const getIcon = (index) => {
        switch (index)
        {
            case 0:
                {
                    return <Population style={style.icons} width="2em" height="2em"/>
                }
            
            case 1:
                {
                    return <Young style={style.icons} width="2em" height="2em"/>
                }

            case 2:
                {
                    return <Middle style={style.icons} width="2em" height="2em"/>
                }

            default:
                {
                    return <Aged style={style.icons} width="2em" height="2em"/>
                }
        }
    }

    return (
        <div
            style={style.items}
            onClick={() => changeCategory(category_index, category_name)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {getIcon(category_index)}
            <label style={style.label}>{category_name}</label>
        </div>
    )
}

Category.propTypes = {
    category_name: PropTypes.string,
    category_index: PropTypes.number,
    selected_index: PropTypes.number,
    changeCategory: PropTypes.func
}

const Categories = ({categories, selected_index, changeCategory}) => {
    const [close, setClose] = useState(true)
    const style = {
        main: {
            position: "fixed",
            bottom: 50,
            right: close ? "-12em" : 0,
            width: "15em",
            height: "30%",
            paddingTop: "0.5em",
            paddingBottom: "0.2em",
            background: "#e39776",
            borderRadius: "1em 0em 0em 1em",
            border: "none",
            transition: "right 500ms ease-in-out"
        },

        categories: {
            position: "relative"
        },

        button: {
            position: "absolute",
            opacity: close ? 0 : 1,
            top: -8,
            right: "14.5em",
            zIndex: 1,
            padding: "0.1em",
            outline: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: "50%",
            background: "#cccccc",
            transition: "opacity 200ms"
        }
    }

    return (
        <div style={style.main}>
            <AiOutlineClose style={style.button} onClick={() => setClose(true)}/>
            <div onClick={() => setClose(false)}>
                {categories.data.map((category, index) => {
                    return (
                        <Category
                            key={index}
                            category_index={index}
                            category_name={category.label}
                            selected_index={selected_index}
                            changeCategory={changeCategory}
                        ></Category>
                    )
                })}
            </div>
        </div>
    )
}

Categories.propTypes = {
    categories: PropTypes.object,
    selected_index: PropTypes.number,
    changeCategory: PropTypes.func
}

export default Categories