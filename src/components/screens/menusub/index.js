import React from 'react'

import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';

import BreadcrumbsFix from '../../../common/BreadcrumbsFix'
import Navigation from '../../../config/navigation'
import ButtonFix from '../../../common/ButtonFix';
import BackdropFix from '../../../common/BackdropFix'
import TableFix from '../../../common/TableFix'
import AlertFix from '../../../functions/AlertFix'
import HeaderConfigFix from '../../../functions/HeaderConfigFix'
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
    },
}));

function Extension() {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(state => state.user.data)
    const [NameScreen] = React.useState('เมนูย่อย')
    const params = createBrowserHistory();
    const item = params.location.state ? params.location.state.item : []

    const [BackDrop, setBackDrop] = React.useState(false) // เปิด - ปิดตัวรอโหลด BackDrop


    const [submenu, setSubmenu] = React.useState([])


    const actionGetMenusub = () => {
        const config = HeaderConfigFix.headerConfig_json(user.token);

        axios.get(`${API}/menusub/${item.id}`, config)
            .then(res => {
                if (res.data.bypass) {
                    setSubmenu(res.data.data)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    React.useEffect(() => {

        if (!params.location.state) {
            AlertFix.actionInfo('ไม่พบข้อมูลที่ค้นหา หรือ เข้า URL ผิดวิธีกรุณาลองอีกครั้ง !')
            history.replace(Navigation.PageMenu);
        } else {
            actionGetMenusub()
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
                            { name: 'เมนู', link: true, path: Navigation.PageMenu },
                            { name: `${item.title_th}`, link: false },
                        ]} />
                    </Grid>

                </Grid>




                <Grid container spacing={1}>
                    <Grid item xs={6} sm={2}>
                        <ButtonFix
                            onClick={() => history.replace(`${Navigation.PageMenu_MenuSub_Create}/${item.id}`, { item: item })}
                            title={`สร้าง ${NameScreen}`}
                            icon={<AddIcon />}
                        />
                    </Grid>
                </Grid>




                <div style={{ marginBottom: '1%' }}></div>

                <TableFix
                    title={`รายการเมนูย่อยของเมนู ${item.title_th} ทั้งหมด`}
                    field={[
                        // { title: 'id', field: 'id', hidden: true },
                        { title: 'ชื่อเมนูภาษาไทย', field: 'title_th' },
                        { title: 'ชื่อเมนูภาษาอังกฤษ', field: 'title_eng' },
                        { title: 'ลิงค์', field: 'link' },
                        { title: 'สร้างวันที่', field: 'create_at' },
                        { title: 'แก้ไขล่าสุด', field: 'update_at' },
                    ]}
                    data={submenu}
                    grantActions={[
                        {
                            icon: 'edit',
                            tooltip: 'แก้ไขข้อมูล',
                            onClick: (event, rowData) => {
                                history.replace(`${Navigation.PageMenu_MenuSub_Edit}/${rowData.id}`, { item: rowData })
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'ลบข้อมูล',
                            onClick: (event, rowData) => {

                                setBackDrop(true)

                                const config = HeaderConfigFix.headerConfig_json(user.token);

                                axios.get(`${API}/menusub/delete/${rowData.id}`, config)
                                    .then(res => {

                                        setBackDrop(false)

                                        if (res.data.bypass) {
                                            AlertFix.actionSuccess(`ลบรายการเมนู ${rowData.title_th} เรียบร้อย !`)
                                            actionGetMenusub()
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

export default connect()(Extension)
