import React from 'react'
import ReactDom from 'react-dom'

import './SideDrawer.css'

const SideDrawer = (props) => {
    const content = (
        <>
        <h1 id="head">We Are The Dreamers</h1>
        <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </>
    )
    return ReactDom.createPortal(content,document.getElementById('drawer-hook'))
}

export default SideDrawer
