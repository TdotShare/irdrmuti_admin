import React from 'react'
import { createBrowserHistory } from 'history';
import { CssBaseline, Typography, Container, makeStyles, Grid, Paper, Collapse } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import TextFieldFix from '../../../common/TextFieldFix'
import CKEditorFix from '../../../common/CKEditorFix'
import ButtonFix from '../../../common/ButtonFix';
import SelectFix from '../../../common/SelectFix';
import MultipleUploadFix from '../../../common/MultipleUploadFix'
import BackdropFix from '../../../common/BackdropFix'
import DatePickerFix from '../../../common/DatePickerFix'
import AlertFix from '../../../functions/AlertFix'
import HeaderConfigFix from '../../../functions/HeaderConfigFix'
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
    },
}));

function Edit() {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(state => state.user.data)



    const params = createBrowserHistory();
    const item = params.location.state ? params.location.state.item : []

    const [singleImages, setSingleImages] = React.useState(null) //รูปภาพ ปกเรื่อง

    const [title, setTitle] = React.useState(item.title_th) //ชื่อเรื่อง
    const [title_eng, setTitle_eng] = React.useState(item.title_eng) //ชื่อเรื่อง Eng
    const [editorText, setEditorText] = React.useState(item.content_th) // เก็บข้อความเนื้อหา
    const [editorText_eng, setEditorText_eng] = React.useState(item.content_eng) // เก็บข้อความเนื้อหา

    const [imageUrls, setimageUrls] = React.useState([]) // เก็บ URL ขึ้นโชว์รูป พรีวีว
    const [imageAlbums, setimageAlbums] = React.useState([]) // เก็บไฟล์รูปภาพทั้งหมด
    const [file_arr, setFile_arr] = React.useState([]) // เก็บไฟล์เอกสารแนบ พรีวีว

    const [timePost, setTimePost] = React.useState(item.timepost == 0 ? false : true) // eslint-disable-line
    const [datePost, setDatePost] = React.useState(new Date(item.datepost)) // เก็บตัวเปิด - ปิด นับเวลาโพส 




    const [statusPost, setStatusPost] = React.useState(item.status) // เก็บสถานะการโพส
    const [categoryPost, setCategoryPost] = React.useState(item.category_id) // เก็บประเภทหมวดหมู่การโพส

    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    const actionUpdate = async () => {

        if (!actionCheckForm()) return

        setBackDrop(true)

        let singleImages64 = singleImages ? await toBase64(singleImages) : null;
        let imageAlbums_base64 = []
        let file_base64 = [];
        let file_nameall = [];

        for (const item of imageAlbums) {
            imageAlbums_base64.push(await toBase64(item))
        }

        for (const item of file_arr) {
            file_nameall.push(item.name)
            file_base64.push(await toBase64(item))
        }

        const body = new FormData();

        body.append(`title_th`, title)
        body.append(`content_th`, editorText)

        body.append(`title_eng`, title_eng)
        body.append(`content_eng`, editorText_eng)

        body.append(`status`, statusPost)
        body.append(`category`, categoryPost)

        body.append('singleimages', singleImages64)
        body.append('album', imageAlbums_base64 ? imageAlbums_base64 : false)


        body.append(`timepost`, timePost == false ? 0 : 1)  // eslint-disable-line 
        body.append(`datepost`, datePost)

        body.append('user', user.id)
        body.append('topic_id', item.topic_id)
        body.append('topic_key', item.id)

        const config = HeaderConfigFix.headerConfig(user.token);


        axios.post(`${API}/topic/update`, body, config)
            .then(res => {
                console.log(res.data)
                if (res.data.bypass) {

                    (async () => {

                        for (let i = 0; i < imageAlbums_base64.length; i++) {
                            const albumRes = await actionUpdateAlbum(imageAlbums_base64[i], i, item.topic_id); // eslint-disable-line
                        }



                        for (let i = 0; i < file_base64.length; i++) {
                            const fileRes = await actionUpdateFile(file_base64[i], i, item.topic_id, file_nameall[i]); // eslint-disable-line
                        }


                        setBackDrop(false)
                        AlertFix.actionSuccess(`แก้ไขข้อมูลเรียบร้อย`)
                        history.replace(Navigation.PagePost)

                    })();

                } else {

                    AlertFix.actionInfo('ไม่สามารถแก้ไขข่าวสารได้ข้อมูล อาจไม่ถูกต้องกรุณาลองใหม่อีกครั้ง !')

                }
            })
            .catch(err => {

                AlertFix.actionError()
                console.error(err);
            })

    }

    const actionCheckForm = () => {

        if (title == '') { // eslint-disable-line 
            AlertFix.actionInfo('กรุณาใส่ชื่อหัวเรื่อง')
            return false
        }

        if (editorText.length == 0) { // eslint-disable-line 
            AlertFix.actionInfo('กรุณาใส่เนื้อหา')
            return false
        }

        return true
    }

    const actionUpdateAlbum = async (imageAlbums, count, folder) => {

        try {

            const body = new FormData();
            body.append('count', count)
            body.append('album', imageAlbums)
            body.append('generate_secret', folder)
            body.append('mode', 'update')

            const config = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': user.token
                }
            };

            const response = await axios.post(`${API}/topic/create_album`, body, config);
            return await response.data;

        } catch (error) {
            return await false;
        }
    }

    const actionUpdateFile = async (files, count, folder, name) => {

        try {

            const body = new FormData();
            body.append('count', count) //ไม่ได้ใช้
            body.append('name', name)
            body.append('file', files)
            body.append('generate_secret', folder)
            body.append('mode', 'update')

            const config = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': user.token
                }
            };

            const response = await axios.post(`${API}/topic/create_file`, body, config);
            return await response.data;

        } catch (error) {
            return await false;
        }

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

                    <Grid item xs={12} sm={3} >
                        <div style={{ marginTop: 10 }}></div>
                        <SelectFix
                            value={statusPost}
                            title={`สถานะหลังโพส`}
                            data={[{ value: 1, label: "public" }, { value: 0, label: "private" }]}
                            onChange={(e) => setStatusPost(e.target.value)}
                        />

                    </Grid>

                    <Grid item xs={12} sm={3} >
                        <div style={{ marginTop: 10 }}></div>
                        <SelectFix
                            value={categoryPost}
                            title={`หมวด`}
                            data={[{ value: 1, label: "กิจกรรมสวพ." },
                            { value: 2, label: "ประชาสัมพันธ์" },
                            { value: 3, label: "แบนเนอร์" },
                            { value: 4, label: "เนื้อหา" },
                            ]}
                            onChange={(e) => setCategoryPost(e.target.value)}
                        />

                    </Grid>

                    <Grid item xs={12} sm={3} >
                        <div style={{ marginTop: 10 }}></div>
                        <SelectFix
                            value={timePost ? 1: 0}
                            title={`ตั้งเวลา ข่าวสารหมดอายุ`}
                            data={[{ value: 0, label: "ปิด" },
                            { value: 1, label: "เปิด" },
                            ]}
                            onChange={(e) => {
                                setTimePost(e.target.value == 0 ? false : true) // eslint-disable-line
                            }}
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
                </Grid>

                <Collapse in={timePost}>
                    <DatePickerFix
                        now={datePost}
                        label={`เลือกเวลาที่ข่าวสารหมดอายุ`}
                        getDate={(data) => {
                            setDatePost(data)
                        }}
                    />
                </Collapse>

                <div style={{ marginBottom: '1%' }}></div>





                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextFieldFix
                            defaultValue={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            label={`ชื่อหัวเรื่อง (ภาษาไทย)`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldFix
                            defaultValue={title_eng}
                            onChange={(e) => { setTitle_eng(e.target.value) }}
                            label={`ชื่อหัวเรื่อง (English)`}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginBottom: '1%' }}></div>



                <div style={{ marginBottom: '1%' }}></div>
                <Paper className={classes.paper}>

                    <Typography variant={`body1`}>ข้อมูลเนื้อหาภาษาไทย</Typography>

                    <div style={{ marginBottom: '1%' }}></div>

                    <CKEditorFix
                        data={item.content_th}
                        onChange={(event, editor) => { setEditorText(editor.getData()) }}
                    />

                </Paper>

                <div style={{ marginBottom: '1%' }}></div>

                <Paper className={classes.paper}>

                    <Typography variant={`body1`}>ข้อมูลเนื้อหาภาษา English</Typography>

                    <div style={{ marginBottom: '1%' }}></div>

                    <CKEditorFix
                        data={item.content_eng}
                        onChange={(event, editor) => { setEditorText_eng(editor.getData()) }}
                    />

                </Paper>

                <div style={{ marginBottom: '2%' }}></div>

                <MultipleUploadFix
                    mode={"images"}
                    preview={imageUrls}
                    itemAlbums={imageAlbums}
                    action_delAlbum={(albumsNew, imageUrlsNew) => {
                        setimageAlbums(albumsNew)
                        setimageUrls(imageUrlsNew)
                    }}
                    action_addAlbum={(arrImges, arrAlbums) => {
                        setimageUrls(arrImges)
                        setimageAlbums(arrAlbums)
                    }}
                />

                <div style={{ marginBottom: '2%' }}></div>

                <MultipleUploadFix
                    mode={"files"}
                    preview={file_arr}
                    action_addFile={(arrFiles) => {
                        setFile_arr(arrFiles)
                    }}
                    action_delFile={(filearr_new) => {
                        setFile_arr(filearr_new)
                    }}
                />

                <div style={{ marginBottom: '2%' }}></div>


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

export default connect(null, null)(Edit)