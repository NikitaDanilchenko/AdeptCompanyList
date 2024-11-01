import styles from './styles.module.css'
type CheckBoxProps = {
  isChecked: boolean,
  onChange: () => void
  className?: string
}

export const Checkbox = (props: CheckBoxProps) => {
  return (
    <>
      <input
        className={props.isChecked ? styles.checked : styles.checkbox}
        type="checkbox"
        checked={props.isChecked}
        onChange={props.onChange}
      />
    </>
  )
}
