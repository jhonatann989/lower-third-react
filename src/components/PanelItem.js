
import * as React from 'react';
import {
    Typography, FormGroup, TextField, Button, FilledInput, Divider, FormControlLabel, 
    CircularProgress, Collapse, IconButton, Checkbox, Paper, FormControl, InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckCircle, Timer, } from '@mui/icons-material';

export function PanelItem(props) {
    const [open, setOpen] = React.useState(false)
    const handleClick = () => { setOpen(!open); };

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{padding: "1vw"}}>
                <FormGroup row={true} sx={{ justifyContent: "space-between", alignItems:"center" }} >
                    <FormControlLabel color='#FFF' control={<Checkbox onChange={() => props.handleIsOpen()} checked={props.isOpen} />} label={props.accordionIcon} />
                    <Typography sx={{fontWeight: "bold"}} color={props.isOpen? "" : "error"}>{props.accordionName}</Typography>
                    <IconButton onClick={handleClick}><ExpandMoreIcon /></IconButton>
                </FormGroup>
                {open && <Divider />}
                <Collapse in={open} unmountOnExit>
                    <Paper elevation={3} sx={{padding: "1vw", margin:"1vw"}}>
                        <FormGroup>
                            <TextField
                                variant='filled'
                                label='Title'
                                id={`${props.domPrefix}Title`}
                                defaultValue={props.title}
                            />
                            <TextField
                                variant='filled'
                                label='Sub Title'
                                id={`${props.domPrefix}Subheader`}
                                defaultValue={props.subheader}
                                multiline={true}
                            />
                            <Button onClick={() => props.onUpdateClick()} variant="contained" >
                                <CheckCircle />
                            </Button>
                            <br /><Divider /><br />
                            <FormControl variant="filled">
                                <InputLabel htmlFor={`${props.domPrefix}AutoHide`}>AutoHide seconds</InputLabel>
                                <FilledInput
                                    endAdornment={
                                        <Button
                                            onClick={() => props.onTimerClick()}
                                            variant="contained"
                                            size='small'
                                            disabled={Number(props.autoHideValue) > 0 ? true : false}
                                        >
                                            {Number(props.autoHideValue) > 0 ? <CircularProgress size={25} /> : <Timer />}
                                        </Button>
                                    }
                                    variant='filled'
                                    id={`${props.domPrefix}AutoHide`}
                                    defaultValue={props.autoHideValue}
                                    type="number"
                                />
                            </FormControl>
                        </FormGroup>
                    </Paper>
                </Collapse>
            </Paper>
        </React.Fragment>
    )
}