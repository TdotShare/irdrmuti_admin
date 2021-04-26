import React from 'react'
import { Button } from '@material-ui/core';

function ButtonFix(props) {
    return (
        <div style={{ marginTop: '3%', marginBottom: '3%' }}>
            <Button
                fullWidth
                variant="contained"
                component="label"
                color={props.color ? props.color : "primary"}
                onClick={props.onClick}
                startIcon={props.icon ? props.icon : null}
            >
                {props.title}

                {props.itemImage ?

                    < input
                        accept={props.accept ? props.accept: "image/*" }
                        onChange={props.onChange}
                        type="file"
                        style={{ display: "none" }}
                    />

                    :

                    null

                }
            </Button>
        </div>
    )
}

export default ButtonFix
