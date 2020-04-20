import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    return props.getDate(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container >
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={props.label}
          format="MM/dd/yyyy"
          value={props.now ? props.now : selectedDate}
          onChange={handleDateChange}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>
  );
}