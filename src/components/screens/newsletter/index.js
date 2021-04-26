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

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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

    const [NameScreen] = React.useState('จดหมายข่าวประจำเดือน')
    const user = useSelector(state => state.user.data)
    const history = useHistory();
    const classes = useStyles();


    const [journal, setJournal] = React.useState([])
    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const actionGetJournal = () => {

        const config = HeaderConfigFix.headerConfig_json(user.token);

        axios.get(`${API}/newsletter`, config)
            .then(res => {
                if (res.data.bypass) {
                    //console.log(res.data.data)
                    setJournal(res.data.data)
                }
            })
            .catch(err => {
                console.error(err);
            })

    }

    React.useEffect(() => actionGetJournal(), []) // eslint-disable-line

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
                        <Typography variant={`h5`}>จดหมายข่าวประจำเดือน</Typography>
                    </Grid>
                    <Grid item xs={12} >

                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: 'จดหมายข่าวประจำเดือน', link: false },
                        ]} />
                    </Grid>

                </Grid>

                <div style={{ marginBottom: '1%' }}></div>

                <Grid container spacing={1}>
                    <Grid item xs={6} sm={3}>
                        <ButtonFix
                            onClick={() => history.replace(Navigation.PageNewsletter_Create)}
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
                        { title: 'ข่าวประจำเดือน', field: 'month_name' },
                        { title: 'ปี', field: 'year_at' },
                        { title: 'สร้างวันที่', field: 'create_at' },
                        { title: 'สถานะ', field: 'status', render: rowData => rowData.status === 1 ? <FiberManualRecordIcon style={{ color: `green` }} /> : <FiberManualRecordIcon style={{ color: `red` }} /> },
                        { title: 'แก้ไขล่าสุด', field: 'update_at' },
                    ]}
                    data={journal}
                    grantActions={[
                        {
                            icon: 'visibility',
                            tooltip: 'เปลี่ยนสถานะ',
                            onClick: (event, rowData) => {
                                setBackDrop(true)

                                const config = HeaderConfigFix.headerConfig_json(user.token);

                                axios.get(`${API}/newsletter/status/${rowData.id}`, config)
                                    .then(res => {

                                        setBackDrop(false)

                                        if (res.data.bypass) {
                                            AlertFix.actionSuccess(`เปลี่ยนสถานะ รายการข่าวสารประจำเดือน ${rowData.month_name} เรียบร้อย !`)
                                            setJournal(res.data.data)
                                        } else {
                                            AlertFix.actionInfo(`ไม่สามารถ เปลี่ยนสถานะ ข่าวสารประจำเดือน ${rowData.month_name} ได้กรุณาลองใหม่อีกครั้ง !`)
                                        }

                                    })
                                    .catch(err => {
                                        setBackDrop(false)
                                        console.error(err);
                                    })
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'ลบข้อมูล',
                            onClick: (event, rowData) => {

                                setBackDrop(true)

                                const config = HeaderConfigFix.headerConfig_json(user.token);

                                axios.get(`${API}/newsletter/delete/${rowData.id}`, config)
                                    .then(res => {

                                        setBackDrop(false)

                                        if (res.data.bypass) {
                                            AlertFix.actionSuccess(`ลบรายการข่าวสารประจำเดือน ${rowData.month_name} เรียบร้อย !`)
                                            setJournal(res.data.data)
                                        } else {
                                            AlertFix.actionInfo(`ไม่สามารถลบข่าวสารประจำเดือน ${rowData.month_name} ได้กรุณาลองใหม่อีกครั้ง !`)
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