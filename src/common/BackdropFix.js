import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import { Alert, AlertTitle } from '@material-ui/lab';

//import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        width: '35%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleBackdrop(props) {
    const classes = useStyles();

    //const [open, setOpen] = React.useState(true)
    // const [loading, setLoading] = React.useState(true)
    // const [collapse, setCollapse] = React.useState(false)

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false)
    //         setCollapse(true)
    //     }, 1500);
    // }, [])

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={props.open} >

                {/* {
                    loading ?



                        <div style={{ textAlign: 'center' }}>
                            <Typography variant={`body1`} >กรุณารอสักครู่ ระบบกำลังดำเนินการ</Typography>
                            <br />
                            <CircularProgress color="inherit" />
                        </div>

                        :

                        props.info ?

                            <div className={classes.root}>
                                <Collapse in={collapse}>
                                    <Alert variant="filled" severity="info"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        <AlertTitle>ดำเนินรายการมีข้อผิดพลาด</AlertTitle>
                                        {props.label}
                                    </Alert>
                                </Collapse>
                            </div>

                            :


                            props.success ?

                                <div className={classes.root}>
                                    <Collapse in={collapse}>
                                        <Alert variant="filled" severity="success"
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                        >
                                            <AlertTitle>ดำเนินรายการเสร็จเรียบร้อย</AlertTitle>
                                            {props.label}
                                        </Alert>
                                    </Collapse>
                                </div>

                                :

                                props.error ?

                                    <div className={classes.root}>
                                        <Collapse in={collapse}>
                                            <Alert variant="filled" severity="error"
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                            >
                                                <AlertTitle>ดำเนินรายการล้มเหลว</AlertTitle>
                                    ฐานข้อมูลอาจเกิดข้อผิดพลาด หรือ สัญญาณอินเตอร์ไม่เสถียร กรุณาติดต่อเจ้าหน้าที่ดูแลระบบ
                                </Alert>
                                        </Collapse>
                                    </div>


                                    :

                                    null
                } */}

                <div style={{ textAlign: 'center' }}>
                    <Typography variant={`body1`} >กรุณารอสักครู่ ระบบกำลังดำเนินการ</Typography>
                    <br />
                    <CircularProgress color="inherit" />
                </div>



            </Backdrop>
        </React.Fragment>
    );
}