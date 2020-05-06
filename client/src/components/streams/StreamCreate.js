import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; // Field is a react-component // reduxForm is a function
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends Component {
    renderInput({ input, label, type, meta: { error, touched }}) {
        const className = `field ${error && touched ? 'error' : ''}`
        // takes formProps input properties and add them to input element
        // with special new JSX syntax
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} type={type} autoComplete="off"/>
                {touched &&
                    (error && 
                    <div className="ui visible error message">
                        <div className="header">
                            {error}
                        </div>
                    </div>)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter Title" type="text"/>
                <Field name="description" component={this.renderInput} label="Enter Description" type="text"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
};

// add form validation
const validate = (formValues) => {
    const errors = {}
    
    if (!formValues.title){
        // if user does not enter value for input "title"
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

// syntactically similar to connect()
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);