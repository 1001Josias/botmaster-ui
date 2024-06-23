import type { FC } from 'react'

import './index.css'
import { Counter } from '@/lib'
import Button from '@/lib/Button/'

const App: FC = () => {
    return (
        <div className='mt-10 ml-80'>
            <Button variant={'default'}>Testando</Button>
            <Button variant={'destructive'}>Testando</Button>
            <Button variant={'secondary'}>Testando</Button>
            <Button variant={'outline'}>Testando</Button>
            <Button variant={'ghost'}>Testando</Button>
            <Button variant={'link'}>Testando</Button>
            <Counter />
        </div>
    )
}

export default App
