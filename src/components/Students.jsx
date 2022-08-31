import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers'
import React, { Component } from 'react'
// use 'rcc' for Emmet abbreviation

export default class Students extends Component {
    // constructor for Students class with the initial states.
    constructor(props){
        super(props) // Components class(?) always needs you to take in props and call super(props)
        this.state = {
            names: [],
            lastNamesShown: false,
            ids: [],
            idsShown: false,
        }
    }

    fetchFirstNames = () => {
        fetch('https://kekambas-bs.herokuapp.com/kekambas')
            .then(res => res.json())
            .then(data => {
                let firstNames = []
                let ids = []
                for (let x of data){
                    firstNames.push(x.first_name)
                    ids.push(x.id)
                }
                // console.log(firstNames);
                this.setState({
                    names: firstNames,
                    ids: ids})
            })}

    // use componentDidMount for initial render; use componentDidUpdate for subsequent renders
    componentDidMount(){
        this.fetchFirstNames()
    }


    componentDidUpdate(prevProps, prevState){
        console.log('===== COMPONENT UPDATE =====');
        // this should render when the state changes
        if (prevState.lastNamesShown === false && this.state.lastNamesShown === true){
            console.log(`COMP UPDATE: lastNames is ${this.state.lastNamesShown}`);
            fetch('https://kekambas-bs.herokuapp.com/kekambas')
                .then(res => res.json())
                .then(data => {
                    let fullNames = []
                    for (let x of data){
                        fullNames.push(`${x.first_name} ${x.last_name}`)
                    }
                    console.log('COMP UPDATE: ',fullNames);
                    this.setState({names: fullNames})
                })
        } else if (prevState.lastNamesShown === true && this.state.lastNamesShown === false){
            this.fetchFirstNames()
        }


        // if (prevState.idsShown === false && this.state.idsShown === true){
        //     fetch('https://kekambas-bs.herokuapp.com/kekambas')
        //         .then(response => response.json())
        //         .then(data => {
        //             let ids = []
        //             for (let x of data){
        //                 ids.push(x.id)
        //             }
        //             this.setState({ids: ids})
        //             console.log('ids: ',this.state.ids);
        //         })
        // } else {
        //     // this.setState({ids: []})
        // }

    }

    // handles the 'Toggle Last Names' button
    handleLastNameSubmit = (e) => {
        e.preventDefault(); 
        if (this.state.lastNamesShown === false) { // if it was false, set to true
            console.log('HANDLE LAST: was false now true');
            this.setState({lastNamesShown: true})
        } else { // if it was true, set to false
            console.log('HANDLE LAST: was true now false');
            this.setState({lastNamesShown: false})
        }
        console.log(`HANDLE LAST: clicked. lastNamesShown = ${this.state.lastNamesShown}`)
    }


    handleIdSubmit = (e) => {
        e.preventDefault();
        if (this.state.idsShown === false){ // if it was false, set to true
            this.setState({idsShown: true})
            console.log('HANDLE ID: was false now true');
        } else { // if it was true, set to false
            this.setState({idsShown: false})
            console.log('HANDLE ID: was true now false');
        }
    }


    render() {
        return (
            <>
            <button onClick={this.handleLastNameSubmit} className='btn btn-success mt-3 me-3'>Toggle Last Names</button>
            <button onClick={this.handleIdSubmit} className='btn btn-outline-success mt-3'>Toggle Ids</button>
            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.names.map((student, idx) => {
                        // Display full names if enabled, otherwise just first names.
                        let nameDisplay = <></>
                        if (this.lastNamesShown){
                            nameDisplay = (<td>{student.names.first_name} {student.names.last_name}</td>)
                        } else {
                            nameDisplay = (<td>{student}</td>)
                        }

                        // Display ids if enabled, otherwise just display the index.
                        let idDisplay = <></>
                        if (this.state.idsShown){
                            idDisplay = <th scope="row">{this.state.ids[idx]}</th>
                        } else {
                            idDisplay = <th scope="row">{idx}</th>
                        }

                        return (
                            <tr key={idx}>
                                {idDisplay}                           
                                {nameDisplay}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}
