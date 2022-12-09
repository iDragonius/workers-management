import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({
    label,
    className,
    width = '400px',
    mode = 'normal',
    type,
    change,
    value,
    name,
    ...props
}) => {
    return (
        <input
            name={name}
            className={[
                'px-6 py-2 rounded-md placeholder-opacity-60 text-black outline-none text-opacity-60 placeholder-black text-lg border-2 border-white hover:border-primary focus:border-primary outline-none transition-all ease-in-out ',
                className,
            ].join(' ')}
            onChange={(e) => (change ? change(e) : e)}
            style={{ width }}
            placeholder={label}
            value={value}
            type={type}
            {...props}
        />
    )
}

TextInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password']),
    mode: PropTypes.oneOf(['normal', 'error', 'success']),
    change: PropTypes.func,
    value: PropTypes.string,
    width: PropTypes.string,
}
export default TextInput

TextInput.defaultValues = {
    label: 'Text',
}
