import React from 'react'

import { makeStyles, Paper, Grid, Typography, Button, GridList, GridListTile, GridListTileBar, IconButton, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        //textAlign: 'center',
        //color: theme.palette.text.secondary,
    },

    rootImages: {

        // flexGrow: 1,
        // display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: `#ffffff`,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


function UploadImages(props) {

    const classes = useStyles();
    const URL = "http://ird.rmuti.ac.th/2020/admin/";

    const title = props.mode == "images" ? "อัปโหลดรูปภาพเนื้อหา" : "อัปโหลดไฟล์แนบ" // eslint-disable-line
    const buttonTitle = props.mode == "images" ? "เลือกรูปภาพ" : "เลือกไฟล์" // eslint-disable-line
    const accept_mode = props.mode == "images" ? "image/*" : ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" // eslint-disable-line

    const [loading, setLoading] = React.useState(false) //โหลดข้อมูลที่เปลี่ยนแปลง

    const actionLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    const action_addAlbum = (el) => {

        let arrImges = []
        let arrAlbums = []

        for (const item of el.target.files) {
            let imageUrl = URL.createObjectURL(item)

            arrImges.push({ url: imageUrl, name: item.name })
            arrAlbums.push(item)

        }

        actionLoading()

        return props.action_addAlbum(arrImges , arrAlbums)
    }

    const action_delAlbum = (index) => {

        let imageUrlsNew = props.preview
        let albumsNew = props.itemAlbums

        albumsNew.splice(index, 1)
        imageUrlsNew.splice(index, 1)

        actionLoading()
        return props.action_delAlbum(albumsNew , imageUrlsNew)
    }

    const action_addFile = (el) => {
        let arrFiles = []

        for (const item of el.target.files) {
            arrFiles.push(item)
        }

        actionLoading()


        return props.action_addFile(arrFiles)
    }

    const action_delFile = (index , item) => {
        let filearr_new = item
        filearr_new.splice(index, 1)
        actionLoading()
        return props.action_delFile(filearr_new)
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={0} >
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper} elevation={2}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>{title}</Typography>
                        </Grid>
                        <div style={{ marginBottom: `1%` }}></div>
                        <Grid item xs={12}>

                            <Button
                                variant="contained"
                                color="secondary"
                                component="label"
                                fullWidth
                                startIcon={<CloudUploadIcon />}
                            >
                                {buttonTitle}
                                <input
                                    accept={accept_mode}
                                    onChange={(el) => props.mode == "images" ? action_addAlbum(el) :  action_addFile(el) } // eslint-disable-line
                                    type="file"
                                    style={{ display: "none" }}
                                    multiple />
                            </Button>
                        </Grid>
                        <div style={{ marginBottom: `2%` }}></div>

                        <Grid item xs={12} sm={6}>
                            <Typography variant={'body2'}>{props.preview.length !== 0 ? 'ตัวอย่าง' : null}</Typography>
                        </Grid>

                        <div style={{ marginBottom: `1%` }}></div>

                        {
                            loading ?


                                <CircularProgress />

                                :

                                props.preview ?


                                    props.mode == "images" ? // eslint-disable-line

                                        <div className={classes.rootImages}>
                                            <GridList className={classes.gridList} cols={4}>
                                                {
                                                    props.preview.map((data, index) => (
                                                        <GridListTile key={index}>
                                                            <img src={data.url} alt={data.name} />
                                                            <GridListTileBar
                                                                title={data.name}
                                                                classes={{
                                                                    root: classes.titleBar,
                                                                    title: classes.title,
                                                                }}
                                                                actionIcon={
                                                                    <IconButton onClick={() => action_delAlbum(index)}>
                                                                        <DeleteIcon className={classes.title} />
                                                                    </IconButton>
                                                                }
                                                            />
                                                        </GridListTile>
                                                    )
                                                    )
                                                }

                                            </GridList>
                                        </div>

                                        :

                                        <div className={classes.rootImages}>
                                            <GridList className={classes.gridList} cols={4}>
                                                {
                                                    props.preview.map((data, index) => (
                                                        <GridListTile key={index}>
                                                            <img src={`${URL}/assets/mock/icon/docs.png`} alt={data.name} />
                                                            <GridListTileBar
                                                                title={data.name}
                                                                classes={{
                                                                    root: classes.titleBar,
                                                                    title: classes.title,
                                                                }}
                                                                actionIcon={
                                                                    <div>
                                                                        <IconButton onClick={() => action_delFile(index , props.preview)}>
                                                                            <DeleteIcon className={classes.title} />
                                                                        </IconButton>
                                                                    </div>
                                                                }
                                                            />
                                                        </GridListTile>
                                                    )
                                                    )
                                                }

                                            </GridList>
                                        </div>


                                    :

                                    null



                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default UploadImages
