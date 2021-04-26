import React from 'react'

import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import ButtonFix from '../../../common/ButtonFix';
import SelectFix from '../../../common/SelectFix';
import BackdropFix from '../../../common/BackdropFix'
import DatePickerFix from '../../../common/DatePickerFix'
import AlertFix from '../../../functions/AlertFix'
import API from '../../../config/api'
import axios from 'axios'

import { connect, useSelector } from 'react-redux'

import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

function Create() {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(state => state.user.data)

    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop
    const [statusPost, setStatusPost] = React.useState(1) // เก็บสถานะการโพส

    const [HeaderPic, setHeaderPic] = React.useState(null) //รูปภาพ ปกเรื่อง
    const [BodyPic, setBodyPic] = React.useState(null) //รูปภาพ ภาพข่าว
    const [FilePic, setFilePic] = React.useState(null) //รูปภาพ ไฟล์ข่าว
    const [dateJournal, setDateJournal] = React.useState(new Date()) // เก็บสถานะการโพส


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const actionCreate = async () => {

        console.log(statusPost)

        if (!HeaderPic) {
            AlertFix.actionInfo('กรุณาใส่รูปปกหัวเรื่อง')
            return
        }

        if (!BodyPic) {
            AlertFix.actionInfo('กรุณาใส่รูปภาพข่าว')
            return
        }

        if (!FilePic) {
            AlertFix.actionInfo('กรุณาใส่ไฟล์ข่าว')
            return
        }


        let HeaderPic64 = await toBase64(HeaderPic)
        let BodyPic64 = await toBase64(BodyPic)
        let FilePic64 = await toBase64(FilePic)



        let months_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let months_th = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]



        const body = new FormData();
        body.append('file_body', BodyPic64)
        body.append(`file_header`, HeaderPic64)  
        body.append(`file_pdf`, FilePic64)  
        body.append(`month_at`, months_en[dateJournal.getMonth()])  
        body.append(`month_name`, months_th[dateJournal.getMonth()])  
        body.append(`status`, statusPost)  

        const config = {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': user.token
            }
        };

        setBackDrop(true)


        axios.post(`${API}/newsletter/create`, body, config )
        .then(res => {
            console.log(res.data)
            if(res.data.bypass){

                setBackDrop(false)
                AlertFix.actionSuccess("สร้างจดหมายข่าวเรียบร้อย !")
                history.replace(Navigation.PageNewsletter)
            }else{
                setBackDrop(false)
                AlertFix.actionInfo(`ไม่สามารถสร้างจดหมายข่าวประจำเดือน ${months_th[dateJournal.getMonth()]} ได้ ข้อมูลอาจไม่ถูกต้องกรุณาลองใหม่อีกครั้ง !`)
            }
        })
        .catch(err => {
            setBackDrop(false)
            console.error(err); 
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
                        <Typography variant={`h5`}>สร้างจดหมายข่าวประจำเดือน</Typography>
                    </Grid>
                    <Grid item xs={12} >

                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: 'จดหมายข่าวประจำเดือน', link: true, path: Navigation.PageJournal },
                            { name: 'สร้างจดหมายข่าวประจำเดือน', link: false },
                        ]} />
                    </Grid>

                    <Grid item xs={12} sm={3} >
                        <div style={{ marginTop: 10 }}></div>
                        <SelectFix
                            title={`สถานะหลังโพส`}
                            data={[{ value: 1, label: "public" }, { value: 2, label: "private" }]}
                            onChange={(e) => setStatusPost(e.target.value)}
                        />

                    </Grid>

                </Grid>

                <div style={{ marginBottom: '1%' }}></div>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                        <ButtonFix
                            itemImage={true}
                            onChange={(el) => {
                                setHeaderPic(el ? el.target.files[0] : null)
                            }}
                            icon={<ImageIcon />}
                            title={HeaderPic ? HeaderPic.name : `รูปปกหัวเรื่อง`}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <ButtonFix
                            itemImage={true}
                            onChange={(el) => {
                                setBodyPic(el ? el.target.files[0] : null)
                            }}
                            icon={<ImageIcon />}
                            title={BodyPic ? BodyPic.name : `รูปข่าว`}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <ButtonFix
                            accept={".pdf"}
                            itemImage={true}
                            onChange={(el) => {
                                setFilePic(el ? el.target.files[0] : null)
                            }}
                            icon={<PictureAsPdfIcon />}
                            title={FilePic ? FilePic.name : `ไฟล์ข่าว`}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginBottom: '1%' }}></div>


                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <DatePickerFix
                            label={`จดหมายข่าวประจำเดือน`}
                            mode={true}
                            views={["month"]}
                            getDate={(data) => {
                                console.log(data)
                                setDateJournal(data)
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <ButtonFix
                            onClick={() => actionCreate()}
                            title={`สร้าง`}
                        />
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}

export default connect()(Create)
