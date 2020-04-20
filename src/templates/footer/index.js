import React from 'react';
import { Typography, Container, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  footer: {
    // padding: theme.spacing(31 3),
    padding: 20,
    marginTop: 'auto',
    width : '100%',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },

}));

export default function ButtonAppBar() {

  const classes = useStyles();


  return (
    <footer className={classes.footer} >
      <Container >
        <Typography variant="body1" color="textSecondary">{'Copyright © TdotDeveloper | '}
          <Link color="inherit" href="http://ird.rmuti.ac.th/2015/"> สถาบันวิจัยและพัฒนา มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน</Link>
        </Typography>
        {/* <Copyright /> */}
      </Container>
    </footer>
  );
}