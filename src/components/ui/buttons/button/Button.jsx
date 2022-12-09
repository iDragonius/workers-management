import React from 'react'
import PropTypes from 'prop-types'
const Button = ({
    primary,
    label,
    color,
    backgroundColor,
    className,
    borderColor,
    size = 'small',
    fontWeight = 'normal',
    shadow = 'light',
    ...props
}) => {
    const mode = primary
        ? ' bg-primary text-white border-2  border-primary'
        : ' bg-white text-gray-400 border-2 border-gray-400 hover:border-primary'

    return (
        <button
            style={{ backgroundColor, borderColor, color }}
            className={[
                'box-content rounded-lg outline-none border-2 py-2 px-5 hover:bg-white hover:text-blue-500 focus:bg-white focus:text-blue-500 ease-in-out active:scale-95 transition-all',

                mode,
                className,
            ].join(' ')}
            {...props}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    primary: PropTypes.bool,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fontWeight: PropTypes.oneOf(['normal', 'medium', 'bold']),
    shadow: PropTypes.oneOf(['light', 'medium', 'large']),
    label: PropTypes.string.isRequired,
}

export default Button

Button.defaultProps = {
    primary: false,
    size: 'small',
    fontWeight: 'normal',
    onClick: undefined,
    shadow: 'light',
}
