import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcons from '@material-ui/icons/Facebook';
import YouTubeIcons from '@material-ui/icons/YouTube';
import Color from './../../../src/config/color'



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: `pointer`
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [urlFacebook] = React.useState('https://www.facebook.com/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B8%88%E0%B8%B1%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2-%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%AD%E0%B8%B5%E0%B8%AA%E0%B8%B2%E0%B8%99-535102043198598/?ref=aymt_homepage_panel&eid=ARBr16Oygyz4_c-Axb3IwpB2h5OSsi4CffFViNqnzgEEYtuJQoJ9sTnQbdRmFogt1-I1lBYAI7Gsm-BJ')
    const [urlYoutube] = React.useState('https://www.youtube.com/channel/UCBCtQsKwOUtOkNcvEZ6dACw?view_as=subscriber')

    return (
        <div className={classes.root}>
            <AppBar style={{ background: Color.appbarColor }}>
                <Toolbar>
                    <div style={{ marginRight: '1%' }}></div>
                    <Typography variant="h6" className={classes.title} onClick={() => { }} >
                        สถาบันวิจัยและพัฒนา มทร.อีสาน
                    </Typography>

                    <div>
                     
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => window.location.href = urlFacebook}
                            >
                                <FacebookIcons />
                            </IconButton>
                       

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => window.location.href = urlYoutube}
                        >
                            <YouTubeIcons />
                        </IconButton>


                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}