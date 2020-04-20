import React from 'react'
import { useHistory } from "react-router-dom";
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
function BreadcrumbsFix(props) {

    const history = useHistory();
    const data = props.data ? props.data : []

    const dataItems = data.map((el, index) => {
        return (

            el.link ?

                <Link key={index} color="primary" onClick={() => history.replace(el.path)} >{el.name}</Link>

                :

                <Typography key={index} color="textPrimary">{el.name}</Typography>


        )
    });

    return (
        <Breadcrumbs aria-label="breadcrumb" >
            {dataItems}
        </Breadcrumbs>
    )
}

export default BreadcrumbsFix
