import React from 'react'

import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';

import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import TextFieldFix from '../../../common/TextFieldFix'
import ButtonFix from '../../../common/ButtonFix';
import SelectFix from '../../../common/SelectFix';
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
    },
}));

function Create() {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(state => state.user.data)

    const params = createBrowserHistory();
    const item = params.location.state ? params.location.state.item : []

    const [title_th, setTitle_th] = React.useState() //ชื่อเรื่อง
    const [title_eng, setTitle_eng] = React.useState() //ชื่อเรื่อง Eng
    const [link, setLink] = React.useState() //ชื่อเรื่อง Eng

    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop

    const [statusPost, setStatusPost] = React.useState(1) // เก็บสถานะการโพส



    const actionCreate = () => {
        if (!actionCheckForm()) return

        setBackDrop(true)



        const body = {
            menu_id: item.id,
            title_th: title_th,
            title_eng: title_eng,
            link: link,
            status: statusPost,
            status_sm: 1,
            menu_list: "-",
            user: user.id
        }



        const config = HeaderConfigFix.headerConfig_json(user.token);

        axios.post(`${API}/menusub/create`, body, config)
            .then(res => {
                console.log(res.data)
                setBackDrop(false)

                if (res.data.bypass) {
                    AlertFix.actionSuccess('สร้างเมนูย่อยสำเร็จ !')
                    history.replace(`${Navigation.PageMenu_MenuSub}/${item.id}` , {item : item});
                } else {
                    AlertFix.actionInfo('ไม่สามารถสร้างเมนูย่อยได้ กรุณาลองใหม่อีกครั้ง !')
                    history.replace(`${Navigation.PageMenu_MenuSub}/${item.id}` , {item : item});
                }
            })
            .catch(err => {
                setBackDrop(false)
                console.error(err);
            })

    }

    const actionCheckForm = () => {

        if (title_th == '') { // eslint-disable-line 
            AlertFix.actionInfo('กรุณาใส่ชื่อเมนูภาษาไทย')
            return false
        }

        if (title_eng == '') { // eslint-disable-line 
            AlertFix.actionInfo('กรุณาใส่ชื่อเมนูภาษา English')
            return false
        }


        if (link == "") {  // eslint-disable-line
            AlertFix.actionInfo('กรุณาใส่ URL เนื้อหาที่ต้องการเชื่อมต่อกับเมนูนี้')
            return false
        }


        return true
    }


    React.useEffect(() => {

        if (!params.location.state) {
            AlertFix.actionInfo('ไม่พบข้อมูลที่ค้นหา หรือ เข้า URL ผิดวิธีกรุณาลองอีกครั้ง !')
            history.replace(Navigation.PageMenu);
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
                        <Typography variant={`h5`}>{`เมนู (เมนูย่อย)`}</Typography>
                    </Grid>
                    <Grid item xs={12} >

                        <BreadcrumbsFix data={[
                            { name: 'แดชบอร์ด', link: true, path: Navigation.PageDashboard },
                            { name: `เมนู`, link: true, path: `${Navigation.PageMenu}` },
                            { name: `เมนูย่อย ${item.title_th}`, link: false },
                            { name: `สร้างเมนูย่อย`, link: false },
                        ]} />
                    </Grid>

                    <Grid item xs={12} sm={3} >
                        <div style={{ marginTop: 10 }}></div>
                        <SelectFix
                            title={`สถานะหลังโพส`}
                            data={[{ value: 1, label: "public" }, { value: 2, label: "private" }]}
                            onChange={(e) => setStatusPost(parseInt(e.target.value))}
                        />
                    </Grid>

                </Grid>


                <div style={{ marginBottom: '1%' }}></div>


                <Grid item xs={12} >
                    <TextFieldFix
                        onChange={(e) => { setLink(e.target.value) }}
                        label={`URL เนื้อหาที่ต้องการเชื่อมต่อกับเมนูนี้`}
                    />
                </Grid>


                <div style={{ marginBottom: '1%' }}></div>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>


                        <TextFieldFix
                            onChange={(e) => { setTitle_th(e.target.value) }}
                            label={`ชื่อเมนู (ภาษาไทย)`}
                        />



                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldFix
                            onChange={(e) => { setTitle_eng(e.target.value) }}
                            label={`ชื่อเมนู (English)`}
                        />
                    </Grid>
                </Grid>


                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <ButtonFix
                            onClick={() => actionCreate()}
                            title={`สร้างเมนูย่อย`}
                        />
                    </Grid>
                </Grid>


            </Container>

        </div>
    )
}

export default connect()(Create)
