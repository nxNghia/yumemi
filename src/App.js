import React from 'react'
import './App.css';
import api from './Api';
import { useState, useEffect } from 'react';
import Chart from './Components/Chart';
import Prefecture from './Components/Prefectures';
import Categories from './Components/Categories';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
// import { useMediaQuery } from 'react-responsive';

function App() {
  const [prefs, setPrefs] = useState([])
  const [pref, setPref] = useState({prefCode: 0, prefName: ''})
  const [PopCom, setPopCom] = useState([])
  const [change, setChange] = useState(false)
  const [showGraph, setShowGraph] = useState(false)
  const [category, setCategory] = useState(0)
  const [name, setName] = useState(null)
  const [beingOpen, setOpen] = useState(0)
  // const limit = useMediaQuery({maxWidth: 880})

  const style = {
    prefecture: {
      width: "100%",
      paddingTop: "3em",
      margin: "auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      overflowY: "scroll",
      overflowX: "hidden",
      maxHeight: showGraph ? "30vh" : "85vh",
      position: "relative",
      top: "2em",
      transition: "max-height 800ms ease-out"
    },

    graph: {
      maxHeight: showGraph ? 500 : 0,
      width: "90%",
      margin: "auto",
      overflow: "hidden",
      transition: "max-height 900ms ease-in-out"
    },

    button: {
      width: "6em",
      height: "2em",
      position: "absolute",
      background: "#ffffff",
      border: "none",
      borderRadius: "0em 0em 1em 1em",
      right: 100,
      zIndex: 1
    },

    graph_area: {
      position: "relative",
    },

    tabs: {
      position: "relative",
      width: "80%",
      margin: "auto",
      top: "4em",
      display: "flex",
      justifyContent: "space-between",
    },

    tab: {
      width: "10em",
      fontSize: "x-large",
      borderRadius: "1em 1em 0em 0em",
      height: "3em",
      border: "none",
      outline: "none",
      cursor: "pointer",
    }
  }

  const getPref = async () => {
    const response = await api.get("https://opendata.resas-portal.go.jp/api/v1/prefectures")
    setPrefs(response.data.result)
  }

  const getPop = async (pref) => {
    const response = await api.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${pref.prefCode}`)
    return response
  }

  const handleChange = (selected, pref) => {
    const index = PopCom.findIndex(_pref => _pref.pref.prefCode == pref.prefCode)
    if(index === -1)
    {
      setPref({prefCode: pref.prefCode, prefName: pref.prefName})
      setOpen(open => open + 1)
    }else{
      PopCom[index].reveal = selected
      if(selected)
      {
        setOpen(beingOpen => beingOpen + 1)
      }else{
        if(beingOpen === 1)
          setShowGraph(false)
        setOpen(beingOpen => beingOpen - 1)
      }
      setChange(!change)
    }
    if(!showGraph)
      setShowGraph(true)
  }

  const handleCategoryChange = (new_category, category_name) => {
    setCategory(new_category)
    setName(category_name)
    if(!showGraph)
    {
      setShowGraph(true)
    }
  }

  const handleGraph = () => {
    setShowGraph(!showGraph)
  }

  useEffect(() => {
    getPref()
  }, [])

  useEffect(() => {
    getPop(pref).then(res => {
      if(res.data.result)
      {
        if(!name)
          setName(res.data.result.data[0].label)
        setPopCom([...PopCom, {pref: pref, reveal: true, data: res.data.result}])
      }
    })
  }, [pref])

  return (
    <div className="App">
      <div style={style.graph_area}>
        <div style={style.graph}>
          <Chart inputPrefs={PopCom} change={change} category={category} name={name}></Chart>
        </div>
        <button style={style.button} onClick={() => handleGraph()}>{showGraph ? <BsChevronCompactUp size="30"/> : <BsChevronCompactDown size="30"/>}</button>
      </div>
      <div style={style.prefecture}>
        {prefs.map(pref => {
          return (
            <Prefecture key={pref.prefCode} pref={pref} handleChange={handleChange}></Prefecture>
          )
        })}
      </div>
      {PopCom.length !== 0 && <Categories categories={PopCom[0].data} selected_index={category} changeCategory={handleCategoryChange}></Categories>}
    </div>
  );
}

export default App;
