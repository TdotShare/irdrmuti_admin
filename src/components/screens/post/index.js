import React from 'react'

import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import ButtonFix from '../../../common/ButtonFix'
import TableFix from '../../../common/TableFix'
import BackdropFix from '../../../common/BackdropFix'
import AlertFix from '../../../functions/AlertFix'
import API from '../../../config/api'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import Url from '../../../config/url'

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

    const [NameScreen] = React.useState('ข่าวสาร')
    const user = useSelector(state => state.user.data)
    const history = useHistory();
    const classes = useStyles();

    const [topic, setTopic] = React.useState([])
    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const actionGetTopic = () => {
        //console.log('start actionGetTopic !')
        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': user.token
            }
        };

        axios.get(`${API}/topic`, config)
            .then(res => {
                //console.log(res.data)
                if (res.data.bypass) {
                    
                    setTopic(res.data.data)
                }
            })
            .catch(err => {
                console.error(err);
            })

    }

    React.useEffect(() => actionGetTopic(), []) // eslint-disable-line

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
                        <Typography variant={`h5`}>ข่าวสาร</Typography>
                    </Grid>
                    <Grid item xs={12} >

                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: 'ข่าวสาร', link: false },
                        ]} />
                    </Grid>

                </Grid>

                <div style={{ marginBottom: '1%' }}></div>

                <Grid container spacing={1}>
                    <Grid item xs={6} sm={2}>
                        <ButtonFix
                            onClick={() => history.replace(Navigation.PagePost_Create)}
                            title={`สร้าง ${NameScreen}`}
                            icon={<AddIcon />}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginBottom: '1%' }}></div>

                <TableFix
                    title={`รายการข่าวสารทั้งหมด`}
                    field={[
                        // { title: 'id', field: 'id', hidden: true },
                        { title: 'รหัสหัวข้อ', field: 'topic_id' },
                        { title: 'ชื่อเรื่อง', field: 'title_th' },
                        { title: 'หมวดหมู่', field: 'category_name' },
                        { title: 'ระยะเวลาขึ้นเว็บ', field: 'timepost_name'},
                        { title: 'สร้างหัวข้อโดย', field: 'ac_name_create' },
                        { title: 'แก้ไขล่าสุดโดย', field: 'ac_name_update' },
                        { title: 'สร้างวันที่', field: 'create_at' },
                        { title: 'แก้ไขล่าสุด', field: 'update_at' },
                    ]}
                    data={topic}
                    grantActions={[
                        {
                            icon: 'link',
                            tooltip: 'Link',
                            onClick: (event, rowData) => {
                                //console.log(`${Url}/content/${rowData.topic_id}`)
                                //navigator.clipboard.writeText(`${Url.host}/content/${rowData.topic_id}`)
                                alert(`${Url.host}/content/${rowData.topic_id}`)
                            }
                        },
                        {
                            icon: 'extension',
                            tooltip: 'ไฟล์รูปภาพและเอกสารแนบ',
                            onClick: (event, rowData) => {
                                history.replace(`${Navigation.PagePost_Extension}/${rowData.id}`, { item: rowData })
                            }
                        },
                        {
                            icon: 'edit',
                            tooltip: 'แก้ไขข้อมูล',
                            onClick: (event, rowData) => {
                                history.replace(`${Navigation.PagePost_Edit}/${rowData.id}`, { item: rowData })
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'ลบข้อมูล',
                            onClick: (event, rowData) => {
                                //console.log(rowData.id)

                                setBackDrop(true)

                                const config = {
                                    headers: {
                                        'accept': 'application/json',
                                        'content-type': 'multipart/form-data',
                                        'Authorization': user.token
                                    }
                                };

                                axios.get(`${API}/topic/delete/${rowData.id}`, config)
                                    .then(res => {

                                        setBackDrop(false)

                                        if (res.data.bypass) {
                                            AlertFix.actionSuccess(`ลบรายการ ${rowData.topic_id} เรียบร้อย !`)
                                            setTopic(res.data.data)
                                        }
                                    })
                                    .catch(err => {
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