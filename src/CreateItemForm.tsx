import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"

type Props = {
    createItem: (itemTitle: string) => void
}


export const CreateItemForm = ({createItem}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
          createItem(trimmedTitle)
          setTaskTitle('')
        } else {
          setError('Title is required')
        }
      }

      const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            createItemHandler()
          }
        }

    return (
        <div>
            <input className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler} />
            <Button title={'+'} onClick={createItemHandler} />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}