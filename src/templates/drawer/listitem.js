import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import RateReviewIcon from '@material-ui/icons/RateReview';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Navigation from '../../config/navigation'

import { useHistory } from "react-router-dom";
import { connect, useDispatch } from 'react-redux'


function Listitem() {


    const history = useHistory();
    const dispatch = useDispatch()

    const actionLogout = () => {
        dispatch({ type: 'deleteUser' })
        dispatch({ type: 'logoutAuth' })
        dispatch({ type: 'clearDateLogin' })

        history.replace(Navigation.PageLogin)
    }


    return (
        <React.Fragment>

            <ListItem button onClick={() => history.replace(Navigation.PagePost)}>
                <ListItemIcon>
                    <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant={'body2'}  > เขียนข่าวสาร </Typography >} />
            </ListItem>


            <ListItem button divider onClick={() => history.replace(Navigation.PageMenu)}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant={'body2'}   > เมนู </Typography >} />
            </ListItem>


            <ListItem button onClick={() => actionLogout()} >
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant={'body2'}  > ออกจากระบบ </Typography >} />
            </ListItem>

        </React.Fragment>
    )
}

export default connect(null, null)(Listitem)
