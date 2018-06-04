import React from 'react';
import propTypes from 'prop-types';
function Checkbox(props) {
    return (
        <button className="checkbox icon" onClick={props.onChange}>
            <i className="material-icons">
                {props.checked ? 'check_box' : 'check_box_outline_blank'}
            </i>
        </button>
    );
}

Checkbox.propTypes = {
    checked: propTypes.bool.isRequired,
    onChange: propTypes.func.isRequired
};

export default Checkbox;