import React, { Component } from 'react'
// use 'rcc' for Emmet abbreviation

export default class Students extends Component {
    // constructor for Students class with the initial states.
    constructor(props){
        super(props) // Components class(?) always needs you to take in props and call super(props)
        this.state = {
            names: [],
            lastNamesShown: false,
            ids: []
        }
    }

    // use componentDidMount for initial render; use componentDidUpdate for subsequent renders
    componentDidMount(){
        fetch('https://kekambas-bs.herokuapp.com/kekambas')
            .then(res => res.json())
            .then(data => {
                let firstNames = []
                for (let x of data){
                    firstNames.push(x.first_name)
                }
                // console.log(firstNames);
                this.setState({names: firstNames})
            })
    }


    componentDidUpdate(prevProps, prevState){ // !!! This did not work !!!
        // this should render when the state changes
        if (prevState.lastNamesShown !== this.state.lastNamesShown){
            console.log('COMP UPDATE: lastNames is true');
            fetch('https://kekambas-bs.herokuapp.com/kekambas')
            .then(res => res.json())
            .then(data => {
                let fullNames = []
                for (let x of data){
                    fullNames.push(x.first_name)
                }
                console.log('COMP UPDATE: ',fullNames);
                this.setState({names: fullNames})
            })
        } 
        // else if (prevState.lastNamesShown === true && this.state.lastNamesShown === false){
        //     this.componentDidMount()
        // }

    }

    handleLastNameSubmit = (e) => {
        e.preventDefault(); 
        if (this.state.lastNamesShown === false) {
            console.log('HANDLE: was false now true');
            this.state.lastNamesShown = true
            this.setState({lastNamesShown: true}) // this is not behaving the way i anticipated.
        } else {
            console.log('HANDLE: was true now false');
            this.state.lastNamesShown = false
            this.setState({lastNamesShown: false})
        }
        console.log(`HANDLE: clicked. lastNamesShown = ${this.state.lastNamesShown}`)
    }


    render() {
        return (
            <>
            <form onSubmit={this.handleLastNameSubmit}>
                <input className='btn btn-success mt-3' type='submit' value='Show Last Names' />
            </form>
            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.names.map((student, idx) => {
                        if (this.lastNamesShown){
                            return (
                                <tr key={idx}>
                                    <th scope="row" >{idx}</th>                                
                                        <td>{student.names.first_name} {student.names.last_name}</td>
                                </tr>
                            )
                        }
                        return (
                            <tr key={idx}>
                                <th scope="row">{idx}</th>                                
                                    <td>{student}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}
