import React, { Component } from 'react'
// use 'rcc' for Emmet abbreviation

export default class Students extends Component {
    // constructor for Students class with the initial states.
    constructor(props){
        super(props) // Components class(?) always needs you to take in props and call super(props)
        this.state = {
            students: []
        }
    }

    // use componentDidMount for initial render; use componentDidUpdate for subsequent renders
    componentDidMount(){
        fetch('https://kekambas-bs.herokuapp.com/kekambas')
            .then(res => res.json())
            .then(data => {
                let studentData = data
                console.log(studentData);
                this.setState({students: studentData})
            })
    }


    render() {
        return (
            <table class="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.students.map((student, idx) => {
                        return (
                            <tr>
                                <th scope="row">{student.id}</th>
                                <td>{student.first_name} {student.last_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
