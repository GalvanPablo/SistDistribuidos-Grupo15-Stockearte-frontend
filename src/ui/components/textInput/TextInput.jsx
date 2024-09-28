import React from 'react'

import styles from './TextInput.module.css'

const TextInput = ({
    label,
    placeHolder,
    helperText,
    onChange,
    enabled = true,
    required,
    width,
    value,
    maxLength = 100,
    alfanumerico = false,
    feedback,
    error = false,
    passwd = false
}) => {
    // const [feedback, setFeedback] = React.useState('');
    // const [error, setError] = React.useState(false);

    const handleInputChange = (event) => {
        let valor = event.target.value;
        if (alfanumerico) {
            valor = valor.toUpperCase().replace(/[^A-Z0-9]/g, '');
        }
        onChange(valor);
    };

    return (
        <div className={styles.input} style={{ width: width ? width : '100%' }}>
            <span className={styles.input__label}>{label}</span>
            {helperText && (
                <span className={styles.input__helper}>{helperText}</span>
            )}
            <input type={passwd ? 'password' : 'text'} name={label} id={label}
                placeholder={placeHolder}
                className={styles.input__textbox}
                required={required}
                disabled={!enabled}
                value={value}
                maxLength={maxLength}
                onChange={handleInputChange}
                style={{ border: error ? '1px solid red' : '' }}
            />
            {feedback && (
                <span className={styles.input__feedback} style={{ color: error ? 'red' : '#00A676' }}>{feedback}</span>
            )}
        </div>
    )
}

export default TextInput