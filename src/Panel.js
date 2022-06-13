import * as React from 'react';
import {
    FormGroup, FormControlLabel, Checkbox, AppBar
} from '@mui/material';
import { ArrowForward, DocumentScanner, } from '@mui/icons-material';
import { setInitialData, setStorageData, autoHideRutine } from './App';
import { PanelItem } from './components/PanelItem';

export default function Panel(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [flag, setFlag] = React.useState(true);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleReset = () => {
        setInitialData();
        window.location.reload()
    }

    const handleBottomCenter = () => {
        if (props.bottomCenter.isOpen) {
            props.handleBottomCenter("bottomCenterIsOpen", false)
        } else {
            props.handleBottomCenter("bottomCenterIsOpen", true)
            props.handleBottomLeft("bottomLeftIsOpen", false)
            props.handleBottomLeft("bottomRightIsOpen", false)
        }
    }

    const handleTransthird = () => {
        if (props.transthird.isOpen) {
            props.handleTransthird("bottomCenterIsOpen", false)
        } else {
            props.handleTransthird("bottomCenterIsOpen", true)
            props.handleBottomLeft("bottomLeftIsOpen", false)
            props.handleBottomLeft("bottomRightIsOpen", false)
        }
    }
    return (
        <div style={{ zoom: "80%" }}>
            <AppBar position='sticky' sx={{ background: "#FFF" }}>
                <FormGroup row={true} sx={{ justifyContent: "center" }} >
                    <FormControlLabel control={<Checkbox onChange={() => handleTransthird()} checked={props.transthird.isOpen} />} label={<DocumentScanner sx={{ color: "#000" }} />} />
                </FormGroup>
            </AppBar>
            <PanelItem
                accordionName="Top Left"
                accordionIcon={<ArrowForward sx={{ transform: "rotate(-135deg)" }} />}
                title={props.topLeft.title}
                subheader={props.topLeft.subheader}
                autoHideValue={props.topLeft.autoHide}
                isOpen={props.topLeft.isOpen}
                domPrefix="topLeft"
                handleIsOpen={() => props.handleTopLeft()}
                onUpdateClick={() => {
                    setStorageData("topLeftTitle", document.getElementById("topLeftTitle").value)
                    setStorageData("topLeftSubheader", document.getElementById("topLeftSubheader").value)
                }}
                onTimerClick={() => {
                    setStorageData("topLeftAutoHide", document.getElementById("topLeftAutoHide").value)
                    autoHideRutine(
                        document.getElementById("topLeftAutoHide").value,
                        () => {
                            props.handleTopLeft()
                            props.handleTopLeft("topLeftAutoHide", "0")
                        })
                }}
            />
            <PanelItem
                accordionName="Top Right"
                accordionIcon={<ArrowForward sx={{ transform: "rotate(-45deg)" }} />}
                title={props.topRight.title}
                subheader={props.topRight.subheader}
                autoHideValue={props.topRight.autoHide}
                isOpen={props.topRight.isOpen}
                domPrefix="topRight"
                handleIsOpen={()=> props.handleTopRight()}
                onUpdateClick={() => {
                    setStorageData("topRightTitle", document.getElementById("topRightTitle").value)
                    setStorageData("topRightSubheader", document.getElementById("topRightSubheader").value)
                }}
                onTimerClick={() => {
                    setStorageData("topRightAutoHide", document.getElementById("topRightAutoHide").value)
                    autoHideRutine(
                        document.getElementById("topRightAutoHide").value,
                        () => {
                            props.handleTopRight()
                            props.handleTopRight("topRightAutoHide", "0")
                        })
                }}
            />
            <PanelItem
                accordionName="Bottom Left"
                accordionIcon={<ArrowForward sx={{ transform: "rotate(135deg)" }} />}
                title={props.bottomLeft.title}
                subheader={props.bottomLeft.subheader}
                autoHideValue={props.bottomLeft.autoHide}
                isOpen={props.bottomLeft.isOpen}
                domPrefix="bottomLeft"
                handleIsOpen={()=> props.handleBottomLeft()}
                onUpdateClick={() => {
                    setStorageData("bottomLeftTitle", document.getElementById("bottomLeftTitle").value)
                    setStorageData("bottomLeftSubheader", document.getElementById("bottomLeftSubheader").value)
                }}
                onTimerClick={() => {
                    setStorageData("bottomLeftAutoHide", document.getElementById("bottomLeftAutoHide").value)
                    autoHideRutine(
                        document.getElementById("bottomLeftAutoHide").value,
                        () => {
                            props.handleBottomLeft()
                            props.handleBottomLeft("bottomLeftAutoHide", "0")
                        })
                }}
            />
            <PanelItem
                accordionName="Bottom Center"
                accordionIcon={<ArrowForward sx={{ transform: "rotate(-270deg)" }} />}
                title={props.bottomCenter.title}
                subheader={props.bottomCenter.subheader}
                autoHideValue={props.bottomCenter.autoHide}
                isOpen={props.bottomCenter.isOpen}
                domPrefix="bottomCenter"
                handleIsOpen={() => handleBottomCenter()}
                onUpdateClick={() => {
                    setStorageData("bottomCenterTitle", document.getElementById("bottomCenterTitle").value)
                    setStorageData("bottomCenterSubheader", document.getElementById("bottomCenterSubheader").value)
                }}
                onTimerClick={() => {
                    setStorageData("bottomCenterAutoHide", document.getElementById("bottomCenterAutoHide").value)
                    autoHideRutine(
                        document.getElementById("bottomCenterAutoHide").value,
                        () => {
                            handleBottomCenter()
                            props.handleBottomCenter("bottomCenterAutoHide", "0")
                        })
                }}
            />
            <PanelItem
                accordionName="Bottom Right"
                accordionIcon={<ArrowForward sx={{ transform: "rotate(45deg)" }} />}
                title={props.bottomRight.title}
                subheader={props.bottomRight.subheader}
                autoHideValue={props.bottomRight.autoHide}
                isOpen={props.bottomRight.isOpen}
                domPrefix="bottomRight"
                handleIsOpen={()=> props.handleBottomRight()}
                onUpdateClick={() => {
                    setStorageData("bottomRightTitle", document.getElementById("bottomRightTitle").value)
                    setStorageData("bottomRightSubheader", document.getElementById("bottomRightSubheader").value)
                }}
                onTimerClick={() => {
                    setStorageData("bottomRightAutoHide", document.getElementById("bottomRightAutoHide").value)
                    autoHideRutine(
                        document.getElementById("bottomRightAutoHide").value,
                        () => {
                            props.handleBottomRight()
                            props.handleBottomRight("bottomRightAutoHide", "0")
                        })
                }}
            />

        </div>
    );
}