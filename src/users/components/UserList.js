import React from 'react'
import Card from '../../shared/UI Elements/Card'
import UserItem from '../components/UserItem'

import './UserList.css'

const UserList = props => {

    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Users Found</h2>
                </Card>
            </div>
        )
    }

    return (
        <>
            <h1 id="head">We Are The Dreamers</h1>
            <ul className="users-list">
                {props.items.map(user => (
                    <UserItem
                        key={user.id}
                        id={user.id}
                        image={user.image}
                        name={user.name}
                        dreamCount={user.dreams.length}
                    />
                ))}
            </ul>
        </>
    )
}

export default UserList
