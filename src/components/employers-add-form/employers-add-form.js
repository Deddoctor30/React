
import { Component } from 'react';

import './employers-add-form.css';

class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value                                                    // в [] скобках мы берем значение атрибута name в инпутах
        })
    }

    onAddItem = (event) => {
        event.preventDefault();
        if (this.state.name.length > 3 && this.state.salary.length > 0) {
            this.props.onAdd(this.state.name, this.state.salary);
            this.setState({
                name: '',
                salary: ''
            })
        }
    }

    render () {
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        onChange={this.onValueChange} />
      
                    <button type="submit"
                        className="btn btn-outline-light"
                        onClick={this.onAddItem}>Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;