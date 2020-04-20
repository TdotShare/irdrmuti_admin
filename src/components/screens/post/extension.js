import React from 'react'
import { createBrowserHistory } from 'history';
import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import TableFix from '../../../common/TableFix'
import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import ButtonFix from '../../../common/ButtonFix';
import BackdropFix from '../../../common/BackdropFix'
import AlertFix from '../../../functions/AlertFix'
import HeaderConfigFix from '../../../functions/HeaderConfigFix'
import API from '../../../config/api'
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

function Extension() {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(state => state.user.data)

    const [urlPic] = React.useState('http://127.0.0.1:8080/Production/Website/irdrmuti/public') //ชื่อเรื่อง
    //const [urlPic] = React.useState('http://ird.rmuti.ac.th/2020/word') //ชื่อเรื่อง

    const params = createBrowserHistory();
    const item = params.location.state ? params.location.state.item : []

    const [deleteAlbums, setDeleteAlbums] = React.useState([]) // เก็บไฟล์รูปภาพ ที่ต้องการลบออก
    const [deleteFile, setDeleteFile] = React.useState([]) // เก็บไฟล์เอกสารแนบ ที่ต้องการลบออก


    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const actionUpdate = async () => {

        if (!actionCheckForm()) return

        setBackDrop(true)

        console.log('test !')
        const body = new FormData();

        body.append('delete_file', JSON.stringify(deleteFile))
        body.append('delete_album', JSON.stringify(deleteAlbums))

        body.append('user', user.id)
        body.append('topic_id', item.topic_id)
        body.append('topic_key', item.id)

        const config = HeaderConfigFix.headerConfig(user.token);


        setBackDrop(false)

        axios.post(`${API}/topic/extension`, body, config)
            .then(res => {
                console.log(res.data)
                if (res.data.bypass) {

                    setBackDrop(false)
                    AlertFix.actionSuccess(`แก้ไขข้อมูลเรียบร้อย`)
                    history.replace(Navigation.PagePost)

                } else {

                    AlertFix.actionInfo('ไม่สามารถลบไฟล์ข้อมูลที่เกี่ยวข้องได้ กรุณาลองใหม่อีกครั้ง !')

                }
            })
            .catch(err => {

                AlertFix.actionError()
                console.error(err);
            })

    }

    const actionCheckForm = () => {

        return true
    }

    React.useEffect(() => {

        if(!params.location.state){
            AlertFix.actionInfo('ไม่พบข้อมูลที่ค้นหา หรือ เข้า URL ผิดวิธีกรุณาลองอีกครั้ง !')
            history.replace(Navigation.PagePost);
        }

    }, []) // eslint-disable-line

    return (
        <div className={classes.root}>

            <BackdropFix
                open={BackDrop}
            />

            <CssBaseline />

            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={`h5`}>แก้ไขข่าวสาร</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: 'ข่าวสาร', link: true, path: Navigation.PagePost },
                            { name: item.topic_id, link: false },
                        ]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={`body2`} color="secondary">** เลือกรูปภาพและไฟล์ที่ต้องการลบทิ้ง</Typography>
                    </Grid>

                </Grid>


                <div style={{ marginBottom: '2%' }}></div>

                <TableFix
                    selection={true}
                    title={`รูปภาพทั้งหมดที่เกี่ยวข้อง`}
                    field={[
                        // { title: 'id', field: 'id', hidden: true },
                        { title: 'รหัสหัวข้อ', field: 'topic_id' },
                        { title: 'ชื่อไฟล์ภาพ', field: 'name' },
                        { title: 'รูปภาพ', field: 'number', render: rowData => <img style={{ width: `40%`, height: `40%` }} src={`${urlPic}/upload/post/album/thumb/${rowData.topic_id}/${rowData.name}`} alt={rowData.name} /> }, // eslint-disable-line
                    ]
                    }
                    data={item.Albums}
                    grantActions={[

                    ]}
                    onSelectionChange={(el) => { setDeleteAlbums(el) }}
                />

                <div style={{ marginBottom: '2%' }}></div>

                <TableFix
                    selection={true}
                    title={`เอกสารแนบทั้งหมดที่เกี่ยวข้อง`}
                    field={[
                        // { title: 'id', field: 'id', hidden: true },
                        { title: 'รหัสหัวข้อ', field: 'topic_id' },
                        { title: 'ชื่อไฟล์เอกสาร', field: 'name' },
                        { title: 'ข้อมูลไฟล์', field: 'number', render: rowData => <a href={`${urlPic}/upload/post/files/${rowData.topic_id}/${rowData.name}`} ><p>เปิดไฟล์</p></a> }, // eslint-disable-line
                    ]
                    }
                    data={item.Files}
                    grantActions={[

                    ]}
                    onSelectionChange={(el) => { setDeleteFile(el) }}
                />

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <ButtonFix
                            onClick={() => actionUpdate()}
                            title={`แก้ไขข้อมูล`}
                        />
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}

export default connect(null, null)(Extension)