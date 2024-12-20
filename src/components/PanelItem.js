
import * as React from 'react';
import {
    Typography, FormGroup, TextField, Button,  Divider,  Card, CardHeader, Avatar, 
    CircularProgress, Paper, FormControl,  Badge, Switch, FormLabel, Dialog, DialogContent, DialogActions, ButtonGroup, Slider
} from '@mui/material';
import { CheckCircle, Timer, Edit, Close, TimerOff, VerticalAlignTop, VerticalAlignBottom, VerticalAlignCenter } from '@mui/icons-material';
import { autoHideRutine, encodedLogo } from '../App';
import { ArrowForward } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../SimpleSnackbar';
import { getLowerThirdData, setLowerThirdData } from './dataRetriever';


export function PanelItem(props) {
    const { id } = props
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
            center: " rotate(270deg)",
            right: "rotate(-45deg)"
        },
        bottom: {
            left: "rotate(135deg)",
            center: " rotate(-270deg)",
            right: "rotate(45deg)"
        }
    }

    const sliderMarks = [
        { value: 0,  },
        { value: 10, },
        { value: 20, },
        { value: 30, },
        { value: 40, },
        { value: 50, },
        { value: 60, },
        { value: 70, },
        { value: 80, },
        { value: 90, },
      ];
    
    const [didConsultLocalstorage, setDidConsultLocalStorage] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [properties, setProperties] = React.useState(defaultValues)
    const [titleRef, setTitleRef] = React.useState(null)
    const [timeoutObject, setTimeoutObject] = React.useState(() => {})

    const handleClick = () => { setOpen(!open); };

    const handleIsOpen = async () => { 
        let data = await setLowerThirdData(id, {isOpen: !properties.isOpen})
        if (!data.hasOwnProperty("ERROR")) { setProperties(data.data) }
    }
    
    const handleAutoHide = () => {
        setPropertyValue("isAutoHiding", true)
        setTimeoutObject(autoHideRutine(properties.autoHideValue, () => {
            handleIsOpen()
            setPropertyValue("isAutoHiding", false)
        }))
    }


    const setPropertyValue = (key, value) => { setProperties(properties => ({ ...properties, [key]: value })) }

    const checkData = async () => {
        setDidConsultLocalStorage(true)
        let data = await getLowerThirdData(id)
        if (!data.hasOwnProperty("ERROR")) { setProperties(data.data) }
    }
    const updateData = async () => {
        let data = await setLowerThirdData(id, properties)
        if (!data.hasOwnProperty("ERROR")) { setProperties(data.data) }
    }
    
    const getRotation = () => {
        let vertical, horizontal = ""
        if (properties.vertical && properties.vertical.length) { vertical = properties.vertical }
        else { vertical = defaultValues.vertical }
        if (properties.horizontal && properties.horizontal.length) { horizontal = properties.horizontal }
        else { horizontal = defaultValues.horizontal }
        return rotations[vertical][horizontal]
    }

    const closeByKeyEvent = e => {
        if(e.key === "Enter") {
            updateData()
            handleClick()
        }
    }

    const resetTimeout = timeoutObject => {
        clearTimeout(timeoutObject)
        setPropertyValue("isAutoHiding", false)
    }

    if (didConsultLocalstorage == false) { checkData() }

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ padding: "1vw", marginLeft: "1vw", marginRight: "1vw", marginTop: "1vh", marginBottom: "1vh" }} >
                <FormGroup row={true} sx={{ justifyContent: "space-between", alignItems: "center" }} >
                    <div style={{ display: "flex" }}>
                        <Button onClick={handleIsOpen} color={properties.isOpen? "success" : "primary"} variant={properties.isOpen? "contained" : "outlined"} ><ArrowForward sx={{ transform: getRotation() }} /></Button>
                        <Divider orientation='vertical' flexItem style={{ marginLeft: "1vw", marginRight: "1vw" }} />
                        <Button variant="outlined" onClick={properties.isAutoHiding ? () => resetTimeout(timeoutObject) : handleAutoHide}  disabled={(properties.autoHideValue == 0)} >
                            <Badge badgeContent={properties.isAutoHiding ? <CircularProgress size={10} /> : properties.autoHideValue}>
                                {properties.isAutoHiding ? <TimerOff color='secondary' /> : <Timer />}
                            </Badge>
                        </Button>
                        <Divider orientation='vertical' flexItem style={{ marginLeft: "1vw", marginRight: "1vw" }} />
                        <Button variant="outlined" onClick={handleClick}><Edit /></Button>
                    </div>
                    <Typography sx={{ fontWeight: "bold" }} color={properties.isOpen ? "" : "error"}>{properties.title}</Typography>
                </FormGroup>
                <Dialog open={open} onClose={handleClick} onAnimationEnd={() => {titleRef?.focus()}} fullScreen={true} onKeyUp={closeByKeyEvent}>
                    <DialogContent>
                        <ThemeProvider theme={darkTheme}>
                            <Card>
                                <CardHeader 
                                avatar={
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <Avatar src={encodedLogo} sx={{ width: 50, height: 50 }} />
                                        <Switch 
                                            onChange={() => setPropertyValue("hasAvatar", !properties.hasAvatar)}
                                            checked={properties.hasAvatar}
                                        />
                                    </div>
                                } 
                                title={
                                    <TextField
                                        variant='filled'
                                        size='small'
                                        label='Title'
                                        onChange={({ target: { value } }) => setPropertyValue("title", value)}
                                        value={properties.title}
                                        fullWidth
                                        inputRef={ref=> {  setTitleRef(ref) }}
                                    />
                                } 
                                subheader={
                                    <TextField
                                        variant='filled'
                                        size='small'
                                        label='Sub Title'
                                        onChange={({ target: { value } }) => setPropertyValue("subHeader", value)}
                                        value={properties.subHeader}
                                        fullWidth
                                    />
                                } 
                                />
                            </Card>
                        </ThemeProvider>
                        <FormGroup>
                            <br/>
                            <Divider />
                            <FormControl variant="filled">
                                <FormLabel id="auto-hide-slider">Auto Hide Time: {properties.autoHideValue? properties.autoHideValue + " seconds" : "Disabled"}</FormLabel>
                                <Slider
                                    defaultValue={0}
                                    onChange={(event, value) => setPropertyValue("autoHideValue", value? value : 0)}
                                    value={properties.autoHideValue}
                                    marks={sliderMarks}
                                    step={5}
                                />
                            </FormControl>
                            <Divider />
                            <FormControl variant="filled">
                                <FormLabel id="vertical-select">Vertical </FormLabel>
                                <ButtonGroup id="vertical" >
                                    <Button onClick={() => setPropertyValue("vertical", "top")} variant={properties.vertical == "top" ? "contained" : "outlined"}>
                                        {/* Top */}
                                        <VerticalAlignTop />
                                    </Button>
                                    <Button 
                                        onClick={() => setPropertyValue("vertical", "bottom")} 
                                        variant={properties.vertical == "bottom" ? "contained" : "outlined"}
                                    >
                                        {/* Bottom */}
                                        <VerticalAlignBottom />
                                    </Button>
                                </ButtonGroup>
                            </FormControl>
                            <FormControl variant="filled">
                                <FormLabel id="horizontal-select">Horizontal</FormLabel>
                                <ButtonGroup id="vertical" >
                                    <Button onClick={() => setPropertyValue("horizontal", "left")} variant={properties.horizontal == "left" ? "contained" : "outlined"} >
                                            <VerticalAlignTop style={{transform: "rotate(270deg)"}} />
                                        </Button>
                                        <Button onClick={() => setPropertyValue("horizontal", "center")} variant={properties.horizontal == "center" ? "contained" : "outlined"} >
                                            <VerticalAlignCenter style={{transform: "rotate(90deg)"}} />
                                        </Button>
                                        <Button onClick={() => setPropertyValue("horizontal", "right")} variant={properties.horizontal == "right" ? "contained" : "outlined"}>
                                            <VerticalAlignTop style={{transform: "rotate(90deg)"}} />
                                        </Button>
                                </ButtonGroup>
                            </FormControl>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { handleClick() }} variant="text" >
                            <Close /> Close
                        </Button>
                        <Button onClick={() => { updateData(); handleClick() }} variant="text" >
                            <CheckCircle /> Save
                        </Button>

                    </DialogActions>
                </Dialog>
            </Paper>
        </React.Fragment>
    )
}