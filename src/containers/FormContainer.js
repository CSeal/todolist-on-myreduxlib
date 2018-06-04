import React from 'react';
import Form from '../components/Form';
import propTypes from 'prop-types';
import {addTodoAction, deleteTodoAction, editTodoAction, toggleTodoAction} from "../actions";
import {connect} from "../myRedux";

class FormContainer extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }
    render(){
        const {title}=this.state;
        return <Form
                    title={title}
                    handleSubmit={event => {
                        event.preventDefault();
                        const title = this.state.title;
                        if (title) {
                            this.props.handleAddTodo(title);
                            this.setState({ title: '' });
                        }
                    }}
                    handleChange={event => {
                        const title = event.target.value;
                        this.setState({ title });
                    }}
                />
    }
}

FormContainer.propTypes = {
    handleAddTodo: propTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    handleAddTodo: title => {
        dispatch(addTodoAction({title}))}
});

const FormConnect = connect(null, mapDispatchToProps)(FormContainer);
 export default FormConnect;