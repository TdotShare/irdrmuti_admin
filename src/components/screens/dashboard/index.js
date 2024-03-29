import React from 'react'
import { makeStyles, Grid } from '@material-ui/core';
import { connect, useSelector } from 'react-redux'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Index() {

    const classes = useStyles();
    const user = useSelector(state => state.user.data)

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid xs={12} item>
                <h4>ยินต้อนรับ {user.username} เข้าสู่ระบบ หลังบ้านของ</h4>
                </Grid>
                <Grid xs={12} item>
                <h5>IRDRMUTI - WORLD</h5>
                </Grid>

            </Grid>
        </div>
    )
}

export default connect()(Index)
