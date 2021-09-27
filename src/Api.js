import axios from 'axios'

export default axios.create({
    headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
    }
})