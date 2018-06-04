import React from 'react';
import propTypes from 'prop-types';
function Button(props) {
    return (
        <button className={props.className} onClick={props.onClick} {...props}>
            {props.icon ? 
                <i className="material-icons">{props.icon}</i>
                :
                props.children
            }
        </button>
    );
}

Button.propTypes = {
    children: propTypes.node,
    className: propTypes.string,
    icon: propTypes.string,
    disabled: propTypes.bool,
    onClick: propTypes.func
};

export default Button;