import styles from './styles.module.css'
type ButtonProps = {
    onClick: () => void
    disabled?: boolean
    children: string
    variant: 'green' | 'red'
    sticky?: boolean
}

export const Button = (props: ButtonProps) => {
    const buttonClass = `
        ${styles.button_form} 
        ${props.variant === 'red' ? styles.red : styles.green} 
        ${props.sticky ? styles.fixed_button : ''}
    `
    return (
        <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    )
}
