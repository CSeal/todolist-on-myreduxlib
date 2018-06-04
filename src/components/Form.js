import React from 'react';
import propTypes from 'prop-types';
import Button from './Button';

function Form({title, handleSubmit, handleChange}){
    return (
        <form className="todo-add-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                placeholder="Что нужно сделать?"
                onChange={handleChange} />

            <Button type="submit">Добавить</Button>
        </form>
    );
}

Form.propTypes = {
    title: propTypes.string,
    handleChange: propTypes.func.isRequired,
    handleSubmit:propTypes.func.isRequired
};

export default Form;