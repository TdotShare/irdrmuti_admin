import React from 'react'
import { makeStyles, FormControl, InputLabel, Select } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectFix(props) {

    const classes = useStyles();

    let data = props.data ? props.data : [];
    let dataItems;
    
    dataItems = data.map((el, index) => {
        return (
            <option key={index} value={el.value}>{el.label}</option>
        )
    });

    const [labelWidth, setLabelWidth] = React.useState(0);
    const inputLabel = React.useRef(null);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    return (
        <FormControl variant="outlined" style={{ width: props.width ?  props.width :  '100%'  }} className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">{props.title}</InputLabel>
            <Select
                native
                value={props.value}
                onChange={props.onChange}
                labelWidth={labelWidth}
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
            >
                {dataItems}
                {/* <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option> */}
            </Select>
        </FormControl>

        
    )
}

