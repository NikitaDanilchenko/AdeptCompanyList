import { ChangeEvent, useState } from "react"
import TextField from "@/shared/ui/textField/TextField"

type EditableSpanProps = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanProps) {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setValue(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(value)
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    return (
        <>
            {editMode
                ? <TextField
                    value={value}
                    name={`editableSpan-${props.title}`}
                    onKeyDown={onKeyDownHandler}
                    onBlur={activateViewMode}
                    autoFocus
                    onChange={onChangeHandler} />
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
            }
        </>
    );
}