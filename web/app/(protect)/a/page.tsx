import { auth } from '@/auth'
import React from 'react'

const Protect = async () => {
    const session = await auth()
    return (
        <div>Protect {JSON.stringify(session)}</div>
    )
}

export default Protect