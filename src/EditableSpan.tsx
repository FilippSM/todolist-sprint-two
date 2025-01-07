import { ChangeEvent, useState } from "react"

type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, changeTitle }: Props) => {
    const [isEditMode, setisEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const OnEditMode = () => {
        setisEditMode(true)
        changeTitle(title)
    }

    const OffEditMode = () => {
        setisEditMode(false)
        changeTitle(itemTitle)
    }



    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        }
    return (
        
        isEditMode
        
            ? <input 
                onChange={changeItemTitleHandler}
                autoFocus
                value={itemTitle}
                onBlur={OffEditMode}
            />
            : <span onDoubleClick={OnEditMode}>{title}</span>
    )
}