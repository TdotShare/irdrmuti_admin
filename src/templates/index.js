import React from 'react'
import Header from './header/appbar_ds'

function Index(props) {

    return (
        <React.Fragment>
            <Header body={props.body ? props.body : null }/>
        </React.Fragment>
    )
}

export default Index
