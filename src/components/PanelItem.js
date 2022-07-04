
import * as React from 'react';
import {
    Typography, FormGroup, TextField, Button, FilledInput, Divider, FormControlLabel,
    CircularProgress, Collapse, IconButton, Checkbox, Paper, FormControl, InputLabel, MenuItem, Select, Badge
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckCircle, Timer, } from '@mui/icons-material';
import { getStorageData, setStorageData, autoHideRutine } from '../App';
import { ArrowForward } from '@mui/icons-material';

export function PanelItem(props) {
    const {id} = props
    const defaultValues = { 
        isOpen: false, 
        title: "", 
        subHeader: "", 
        vertical: "top", 
        horizontal: "left", 
        hasAvatar: false, 
        useOpenLpSource: false,
        autoHideValue: 0,
        isAutoHiding: false
    }
    const rotations = {
        top: {
            left: "rotate(-135deg)",
            center:" rotate(270deg)",
            right: "rotate(-45deg)"
        },
        bottom: {
            left: "rotate(135deg)",
            center:" rotate(-270deg)",
            right: "rotate(45deg)"
        }
    }
    const [didConsultLocalstorage, setDidConsultLocalStorage] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [properties, setProperties] = React.useState(defaultValues)

    const handleClick = () => {  
        setOpen(!open);  
        updateData()
    };
    const handleIsOpen = () => {
        let copyProperties = properties
        copyProperties.isOpen = !copyProperties.isOpen
        setPropertyValue("isOpen", !copyProperties.isOpen)
        setStorageData(`Snackbar_${id}`, JSON.stringify(copyProperties))
        checkData()
    }
    const handleAutoHide = () => {
        setPropertyValue("isAutoHiding", true)
        autoHideRutine(document.getElementById(`autoHideValue_${id}`).value, () => {
            handleIsOpen()
            setPropertyValue("autoHideValue", 0)
            setPropertyValue("isAutoHiding", false)
        })
    }

    const setPropertyValue = (key, value) => { setProperties({ ...properties, [key]: value })  }

    const checkData = () => {
        setDidConsultLocalStorage(true)
        let localStorageData = getStorageData(`Snackbar_${id}`)
        if(localStorageData !== null && localStorageData !== undefined) {
            setProperties(JSON.parse(localStorageData))
        }
    }
    const updateData = () => {
        setStorageData(`Snackbar_${id}`, JSON.stringify(properties))
        checkData()
    }
    const getRotation = () => {
        let vertical, horizontal = ""
        if(properties.vertical && properties.vertical.length) { vertical = properties.vertical } 
        else { vertical  = defaultValues.vertical }
        if(properties.horizontal && properties.horizontal.length) { horizontal = properties.horizontal } 
        else { horizontal  = defaultValues.horizontal }
        return rotations[vertical][horizontal]
    }

    if(didConsultLocalstorage == false) { checkData() }

    return (
        <React.Fragment>
            {props.alternative ?
                <Paper elevation={3} sx={{ padding: "1vw" }}>
                    <FormGroup row={true} sx={{ justifyContent: "space-between", alignItems: "center" }} >
                        <FormControlLabel 
                            color='#FFF' 
                            control={<Checkbox onChange={handleIsOpen} checked={properties.isOpen} />} 
                            label={<ArrowForward sx={{ transform: getRotation() }} />} 
                        />
                        <Badge badgeContent={properties.autoHideValue}>
                            <IconButton onClick={handleAutoHide}  disabled={properties.isAutoHiding} >
                                {properties.isAutoHiding? <CircularProgress size={25} /> : <Timer />}
                            </IconButton>
                        </Badge>
                        <Typography sx={{ fontWeight: "bold" }} color={properties.isOpen ? "" : "error"}>{properties.title}</Typography>
                        <IconButton onClick={handleClick}><ExpandMoreIcon /></IconButton>
                    </FormGroup>
                    {open && <Divider />}
                    <Collapse in={open} unmountOnExit>
                        <Paper elevation={3} sx={{ padding: "1vw", margin: "1vw" }}>
                            <FormGroup>
                                <TextField
                                    variant='filled'
                                    label='Title'
                                    onChange={({ target: { value } }) => setPropertyValue("title", value)}
                                    value={properties.title}
                                />
                                <TextField
                                    variant='filled'
                                    label='Sub Title'
                                    onChange={({ target: { value } }) => setPropertyValue("subHeader", value)}
                                    value={properties.subHeader}
                                />
                                <TextField
                                    id={`autoHideValue_${id}`}
                                    variant='filled'
                                    label='Auto Hide Time'
                                    type="number"
                                    onChange={({ target: { value } }) => setPropertyValue("autoHideValue", value)}
                                    value={properties.autoHideValue}
                                />
                                <FormControl variant="filled">
                                    <InputLabel id="vertical-select">Vertical</InputLabel>
                                    <Select
                                        native={true}
                                        labelId="vertical-select"
                                        id="vertical"
                                        onChange={({ target: { value } }) => setPropertyValue("vertical", value)}
                                        value={properties.vertical}
                                    >
                                        <option value="top">Top</option>
                                        <option value="bottom">Bottom</option>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled">
                                    <InputLabel id="horizontal-select">Horizontal</InputLabel>
                                    <Select
                                        native={true}
                                        labelId="horizontal-select"
                                        id="horizontal"
                                        onChange={({ target: { value } }) => setPropertyValue("horizontal", value)}
                                        value={properties.horizontal}
                                    >
                                        <option value="left">Left</option>
                                        <option value="center">Center</option>
                                        <option value="right">Right</option>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled">
                                    <InputLabel id="logo-select">Use Logo</InputLabel>
                                    <Select
                                        native={true}
                                        labelId="logo-select"
                                        id="logo"
                                        onChange={({ target: { value } }) => setPropertyValue("hasAvatar", value)}
                                        value={properties.hasAvatar}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled">
                                    <InputLabel id="openlp-select">Use Open LP Text</InputLabel>
                                    <Select
                                        native={true}
                                        labelId="openlp-select"
                                        id="openlp"
                                        onChange={({ target: { value } }) => setPropertyValue("useOpenLpSource", value)}
                                        value={properties.useOpenLpSource}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Select>
                                </FormControl>
                                <Button onClick={() => updateData()} variant="contained" >
                                    <CheckCircle />
                                </Button>
                            </FormGroup>
                        </Paper>
                    </Collapse>
                </Paper>
                :
                <Paper elevation={3} sx={{ padding: "1vw" }}>
                    <FormGroup row={true} sx={{ justifyContent: "space-between", alignItems: "center" }} >
                        <FormControlLabel color='#FFF' control={<Checkbox onChange={() => props.handleIsOpen()} checked={props.isOpen} />} label={props.accordionIcon} />
                        <Typography sx={{ fontWeight: "bold" }} color={props.isOpen ? "" : "error"}>{props.accordionName}</Typography>
                        <IconButton onClick={handleClick}><ExpandMoreIcon /></IconButton>
                    </FormGroup>
                    {open && <Divider />}
                    <Collapse in={open} unmountOnExit>
                        <Paper elevation={3} sx={{ padding: "1vw", margin: "1vw" }}>
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
            }
        </React.Fragment>
    )
}