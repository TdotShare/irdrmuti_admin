import React from 'react';
import { Avatar, Container, CssBaseline, Link, Grid, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

import AppBar from '../../../templates/header/appbar'
import TextFieldFix from '../../../common/TextFieldFix'
import ButtonFix from '../../../common/ButtonFix'
import BackDropFix from '../../../common/BackdropFix'

import AlertFix from '../../../functions/AlertFix'

import Navigation from '../../../config/navigation'
import API from '../../../config/api'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn(props) {

    const classes = useStyles();
    const history = useHistory();

    const [Responsive, setResponsive] = React.useState(5)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const actionLogin = () => {
        setBackDrop(true)
        axios.post(`${API}/auth`, { username: username, password })
            .then(res => {
                setBackDrop(false)

                console.log(res.data)
                if (res.data.bypass) {

                   
                    AlertFix.actionSuccess('เข้าสู่ระบบสำเร็จ !')

                    let time = new Date()
                    
                    props.addUser(res.data.data)
                    props.loginAuth()
                    props.addDateLogin(time.getHours())

                    history.replace(Navigation.PageDashboard);

                } else {
                  
                    AlertFix.actionInfo('ไม่สามารถเข้าระบบได้ ชื่อผู้ใช้ หรือ รหัสผ่าน อาจไม่ถูกต้องกรุณาลองใหม่อีกครั้ง !')

                }
            })
            .catch(err => {
                setBackDrop(false)
                AlertFix.actionError()
                console.error(err);
            })


    }

    React.useEffect(() => {
        if (getWindowDimensions().width < 800) {
            setResponsive(30)
            console.log(`setResponsive ! ${getWindowDimensions().width}`)
        } else {
            setResponsive(5)
        }
    }, [])

    return (


        <Container component="main" maxWidth="xs">

            <BackDropFix
             open={BackDrop} 
            /> 

            <AppBar />
            <CssBaseline />

            <div className={classes.paper}>
                <div style={{ marginTop: `${Responsive}%` }}></div>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} noValidate>
                    <TextFieldFix
                        label={'Usename'}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextFieldFix
                        label={'Password'}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />

                    <ButtonFix title={`เข้าสู่ระบบ`} onClick={() => actionLogin()} />

                    <Grid container justify="center">
                        <Link href="#" variant="body2">
                            {"กลับหน้าหลัก"}
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>


    );
}


const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        addUser: (user) => dispatch({ type: 'addUser', payload: user }),
        addDateLogin: (time) => dispatch({ type: 'addDateLogin', payload: time }),
        loginAuth: () => dispatch({ type: 'loginAuth' }),

    }
}

export default connect(null, mapDispatchToProps)(SignIn)
