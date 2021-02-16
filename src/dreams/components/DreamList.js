import { React, useContext } from 'react'

import Card from '../../shared/UI Elements/Card'
import DreamItem from './DreamItem'
import Button from '../../shared/Form Elements/Button'
import './DreamList.css'

const DreamList = props => {
    if (props.items.length === 0) {
        return (
            <div className="dream-list-zero">
                <Card>
                    <h2>No dreams found. Maybe create one?</h2>
                    <Button to="/dreams/new">Share Dream</Button>
                </Card>
            </div>
        )
    }

    return (
        <ul className="dream-list">
            {props.items.map(dream => (
                <DreamItem
                    key={dream.id}
                    id={dream.id}
                    image={dream.image}
                    title={dream.title}
                    description={dream.description}
                    creatorId={dream.creator}
                    onDelete={props.onDeleteDream}
                />
            ))}
        </ul>
    )
}

export default DreamList
