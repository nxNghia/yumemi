import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Chart = ({inputPrefs, change, category, name}) => {
    const [years, setYears] = useState()
    const [prefs, setPrefs] = useState([])
    const option = {
        chart: {
            type: "spline",
        },

        title: {
            text: name,
        },

        xAxis: {
            categories: years,
        },

        yAxis: {
            title: {
                text: ""     
            }
        },

        series: prefs,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },

                chartOptions: {
                    legend: {
                        layout: "horizontal",
                        align: "center",
                        verticalAlign: "bottom"
                    }
                }
            }]
        }
    }

    useEffect(() => {
        const new_pref = []
        inputPrefs.forEach(pref => {
            if(pref.reveal)
            {
                const pref_instance = {name: pref.pref.prefName, prefCode: pref.pref.prefCode, data: []}
                pref.data.data[category].data.forEach(dataByYear => {
                    pref_instance.data.push(dataByYear.value)
                })

                new_pref.push(pref_instance)
            }
        });

        setPrefs([...new_pref])

        const temp_years = []

        if(inputPrefs.length !== 0)
        {
            inputPrefs[0].data.data[0].data.forEach(dataByYear => {
                if(temp_years.indexOf(dataByYear.year) === -1)
                {
                    temp_years.push(dataByYear.year)
                }
            })
        }

        setYears([...temp_years])
    }, [inputPrefs, change, category])

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={option} />
        </div>
    )
}

Chart.propTypes = {
    inputPrefs: PropTypes.array,
    change: PropTypes.any,
    category: PropTypes.number,
    name: PropTypes.string
}

export default Chart