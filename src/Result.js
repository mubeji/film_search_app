
import React from 'react'

const Result = ({results}) => {
    return results.map((result, i) => {
        return <div style={resDivStyle} key={i}>{result}</div>
    })
}

let resDivStyle = {
    marginTop:'5px'
}

export default Result