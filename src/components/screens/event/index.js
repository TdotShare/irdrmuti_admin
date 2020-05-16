import React from 'react'

import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
//import { useHistory } from "react-router-dom";
import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import SelectFix from '../../../common/SelectFix';
import BackdropFix from '../../../common/BackdropFix'
import ButtonFix from '../../../common/ButtonFix';
import AlertFix from '../../../functions/AlertFix'
import API from '../../../config/api'
import axios from 'axios'

import { connect, useSelector } from 'react-redux'

import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Index() {

    const user = useSelector(state => state.user.data)
    //const history = useHistory();
    const classes = useStyles();


    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop
    const [singleImages, setSingleImages] = React.useState(null) //รูปภาพ ปกเรื่อง
    const [events, setEvents] = React.useState(false) // เก็บตัวเปิด - ปิด นับเวลาโพส
    React.useEffect(() => actionGetEvents(), []) // eslint-disable-line

    const actionGetEvents = () => {

        setBackDrop(true)

        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': user.token
            }
        };

        axios.get(`${API}/events`, config)
            .then(res => {
                console.log(res.data)

                if (res.data.bypass) {
                    let data = res.data.data
                    setEvents(data.status) // eslint-disable-line
                }

                setBackDrop(false)

            })
            .catch(err => {
                setBackDrop(false)
                console.error(err);
            })
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const actionCreate = async () => {

        setBackDrop(true)

        let check = events == false ? 0 : 1 // eslint-disable-line 
        let singleImages64

        if (check) {
            singleImages64 = singleImages ? await toBase64(singleImages) : null;
            if (!singleImages64) {
                setBackDrop(false)
                AlertFix.actionInfo('กรุณาใส่รูปแบนเนอร์วันพิเศษ !')
                return;
            }
        } else {
            singleImages64 = null
        }

        const body = new FormData();
        body.append('singleimages', singleImages64)
        body.append(`events`, events)  // eslint-disable-line 

        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': user.token
            }
        };

        axios.post(`${API}/events/update`, body, config).then(res => {

            console.log(res.data)

            if (res.data.bypass) {

                AlertFix.actionSuccess('อัพเดตข้อมูลแบนเนอร์สำหรับวันพิเศษ เรียบร้อย !')
                setBackDrop(false)
            } else {

                setBackDrop(false)
                AlertFix.actionInfo('ไม่สามารถสร้างแบนเนอร์สำหรับวันพิเศษได้ กรุณาลองใหม่อีกครั้ง !')

            }
        }).catch(err => {
                setBackDrop(false)
                AlertFix.actionError()
        })

    }

    return (
        <div className={classes.root}>

            <BackdropFix
                open={BackDrop}
            />


            <CssBaseline />
            <Container maxWidth="lg">

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={`h5`}>วันพิเศษ</Typography>
                    </Grid>
                    <Grid item xs={12} >

                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: 'วันพิเศษ', link: false },
                        ]} />
                    </Grid>

                    <Grid item xs={12} sm={3} >
                        <div style={{ marginTop: 10 }}></div>
                        <SelectFix
                            value={events}
                            title={`เปิด - ปิดใช้งานแบนเนอร์`}
                            data={[{ value: 0, label: "ปิด" },
                            { value: 1, label: "เปิด" },
                            ]}
                            onChange={(e) => {
                                setEvents(e.target.value) // eslint-disable-line
                            }
                            }
                        />
                    </Grid>


                </Grid>


                <div style={{ marginBottom: '1%' }}></div>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                        <ButtonFix
                            itemImage={true}
                            onChange={(el) => {
                                setSingleImages(el ? el.target.files[0] : null)
                            }}
                            icon={<ImageIcon />}
                            title={singleImages ? singleImages.name : `รูปปกหัวเรื่อง`}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <ButtonFix
                            onClick={() => actionCreate()}
                            title={`บันทึก`}
                        />
                    </Grid>
                </Grid>





            </Container>

        </div>
    )
}

export default connect()(Index)