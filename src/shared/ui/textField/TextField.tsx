import React from 'react';
import styles from './styles.module.css';

interface TextFieldProps {
    name?: string
    value: string;
    onBlur?: () => void
    autoFocus?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const TextField: React.FC<TextFieldProps> = ({ onBlur, value, name, onChange, autoFocus, onKeyDown }) => (
    <div className={styles.textFieldWrapper}>
        <input
            onKeyDown={onKeyDown}
            type='text'
            id={name}
            name={name}
            className={styles.input}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus={autoFocus}
        />
    </div>
);

export default TextField;
