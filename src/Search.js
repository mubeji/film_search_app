import React from 'react'


const Search = (props) => {

    const { firstName, lastName, on_Change, on_Search, on_first_change } = props;
    //console.log(searchQuery)
    return  (
        <div >
            <form action="">
                Wikipedia Search Tool
                <input style={inputStyle}
                    type="text"
                    value={firstName}
                    onChange={on_first_change}
                    placeholder="enter first name"
                />
                <br/>
                <input style={inputStyle}
                    type="text"
                    value={lastName}
                    onChange={on_Change}
                    placeholder="enter last name"
                />
                <br/> 
                <button onClick={on_Search} style={buttonStyle}>Search</button>
            </form>
        </div>
    )
}


let inputStyle = {
    padding: '5px',
    fontsize: '18px',
    width: '210px',
    height: '20px',
    marginTop:'5px'
}

let buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    marginTop: '5px'
}

export default Search