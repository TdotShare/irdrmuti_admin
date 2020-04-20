import React from 'react'

import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import ButtonFix from '../../../common/ButtonFix'
import TableFix from '../../../common/TableFix'
import BackdropFix from '../../../common/BackdropFix'
import HeaderConfigFix from '../../../functions/HeaderConfigFix'
import AlertFix from '../../../functions/AlertFix'
import API from '../../../config/api'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

import { connect, useSelector } from 'react-redux'

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

    const [NameScreen] = React.useState('เมนู')
    const user = useSelector(state => state.user.data)
    const history = useHistory();
    const classes = useStyles();


    const [menu, setMenu] = React.useState([])
    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const actionGetMenu = () => {

        const config = HeaderConfigFix.headerConfig_json(user.token);

        axios.get(`${API}/menu`, config)
            .then(res => {
                if (res.data.bypass) {
                    //console.log(res.data.data)
                    setMenu(res.data.data)
                }
            })
            .catch(err => {
                console.error(err);
            })

    }

    React.useEffect(() => actionGetMenu(), []) // eslint-disable-line

    return (
        <div className={classes.root}>

            <BackdropFix
                open={BackDrop}
            />


            <CssBaseline />
            <Container maxWidth="lg">
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={`h5`}>เมนู</Typography>
                    </Grid>
                    <Grid item xs={12} >

                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: 'เมนู', link: false },
                        ]} />
                    </Grid>

                </Grid>

                <div style={{ marginBottom: '1%' }}></div>

                <Grid container spacing={1}>
                    <Grid item xs={6} sm={2}>
                        <ButtonFix
                            onClick={() => history.replace(Navigation.PageMenu_Create)}
                            title={`สร้าง ${NameScreen}`}
                            icon={<AddIcon />}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginBottom: '1%' }}></div>

                <TableFix
                    title={`รายการเมนูทั้งหมด`}
                    field={[
                        // { title: 'id', field: 'id', hidden: true },
                        { title: 'ชื่อเมนูภาษาไทย', field: 'title_th' },
                        { title: 'ชื่อเมนูภาษาอังกฤษ', field: 'title_eng' },
                        { title: 'เมนูย่อย', field: 'status_sm_name' },
                        { title: 'สร้างหัวข้อโดย', field: 'ac_name_create' },
                        { title: 'แก้ไขล่าสุดโดย', field: 'ac_name_update' },
                        { title: 'สร้างวันที่', field: 'create_at' },
                        { title: 'แก้ไขล่าสุด', field: 'update_at' },
                    ]}
                    data={menu}
                    grantActions={[
                        {
                            icon: 'extension',
                            tooltip: 'เมนูย่อย',
                            onClick: (event, rowData) => {
                                console.log(rowData.status_sm)
                                if (rowData.status_sm == 0) { // eslint-disable-line
                                    AlertFix.actionInfo(`เมนู ${rowData.title_th} ปิดการใช้งานเมนูย่อยอยู่ !`)
                                } else {
                                    history.replace(`${Navigation.PageMenu_MenuSub}/${rowData.id}`, { item: rowData })
                                }
                            }
                        },
                        {
                            icon: 'edit',
                            tooltip: 'แก้ไขข้อมูล',
                            onClick: (event, rowData) => {
                                history.replace(`${Navigation.PageMenu_Edit}/${rowData.id}`, { item: rowData })
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'ลบข้อมูล',
                            onClick: (event, rowData) => {

                                setBackDrop(true)

                                const config = HeaderConfigFix.headerConfig_json(user.token);

                                axios.get(`${API}/menu/delete/${rowData.id}`, config)
                                    .then(res => {

                                        setBackDrop(false)

                                        if (res.data.bypass) {
                                            AlertFix.actionSuccess(`ลบรายการเมนู ${rowData.title_th} เรียบร้อย !`)
                                            setMenu(res.data.data)
                                        } else {
                                            AlertFix.actionInfo(`ไม่สามารถลบรายการเมนู ${rowData.title_th} ได้กรุณาลองใหม่อีกครั้ง !`)
                                        }

                                    })
                                    .catch(err => {
                                        setBackDrop(false)
                                        console.error(err);
                                    })


                            }
                        },
                    ]}
                />


            </Container>

        </div>
    )
}

export default connect()(Index)