import React from 'react'

import TextField from '@material-ui/core/TextField';




function TextFieldFix(props) {



    return (

        <TextField
            margin="normal"
            label={props.label ? props.label : null}
            type={props.type ? props.type : 'text'}
            onChange={props.onChange}
            variant="outlined"
            fullWidth
            InputProps={{
                readOnly: props.readOnly ? props.readOnly : false,
            }}
            defaultValue={props.defaultValue ? props.defaultValue : null}
        />

    )
}

export default TextFieldFix
