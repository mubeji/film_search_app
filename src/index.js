//import the React and ReactDOM libraries

import React from  'react'
import ReactDOM from 'react-dom'
import cheerio from 'cheerio'
//import request from 'request'
import axios from 'axios'

import Result from './Result'
import Search from './Search'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '', //for user input
            filmsArr: [] 
        }
    }

    //track input key strokes
    onLastNameChange = (e) => {  
        //console.log(e.target.value)
        this.setState({lastName: e.target.value});
    }

    onFirstNameChange = (e) => {
        this.setState({ firstName: e.target.value})
    }


    onSearch = (e) => {
        e.preventDefault()
        //scrape and update state result list
        this.scrape((aList) => {
            let arr = this.removeBeforeColon(aList)
            //console.log(aList)
            this.setState({filmsArr: [...arr]});
        })
        .catch((err) => {
            console.log('error', err)
        })
    }

    scrape = async (callB) => {  
        //let url = 'http://dbpedia.org/page/Mahershala_Ali'
        //set url = to input enterd in the input box
        let first = this.capitaliseFirstLetter(this.state.firstName)
        let last = this.capitaliseFirstLetter(this.state.lastName)
        
        let url = `http://dbpedia.org/page/${first}_${last}`
        //let url = this.state.searchQuery
        const response = await axios.get(url)
            .then(res => res.data)
            .catch(err => console.log(err));
    
        const results = [];
    
        if (response) {
            let $ = cheerio.load(response);
            let links = $('a')
            $(links).each(function(i,link) {
                if ($(link).attr('rev') === 'dbo:starring') {
                    //console.log('yess')
                    results.push($(link).text());
                }
            });
        }
        //console.log(results);
        return callB(results)
        //return results
    }

    // for removing the dbr: before film name
    removeBeforeColon = (aList) => {
        let newList = []
        aList.forEach((elem) => {
            elem = elem.split(":").pop();
            newList.push(elem)
        });
        //console.log(newList)
        return newList
    }

    capitaliseFirstLetter(str) {
        let splitStr = str.toLowerCase().trim().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
    }

    render() {
        const {filmsArr, lastName, firstName} = this.state;
        return (
            <div style={containerStyle}>
                <Search
                    on_first_change={this.onFirstNameChange}
                    firstName={firstName}
                    lastName={lastName}
                    on_Change={this.onLastNameChange}
                    on_Search={this.onSearch}
                />
                <Result results={filmsArr} />
            </div>
        )
    }

}

let containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-100px',
    width: '200px',
    height: '100px'
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)