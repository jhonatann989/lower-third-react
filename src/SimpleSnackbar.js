import * as React from 'react';
import { Snackbar, Card, CardHeader, Avatar, CardContent, Typography, Fade, Collapse, Grow, Zoom } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getStorageData, encodedLogo, getCurrentSlideData } from './App';
import Slide, { SlideProps } from '@mui/material/Slide';
import { getLowerThirdData, setLowerThirdData } from './components/dataRetriever';

export default function SimpleSnackbar(props) {
  const { snackbarId } = props
  const [properties, setProperties] = React.useState({})
  const [shouldAnimate, setShouldAnimate] = React.useState(true)

  React.useEffect(() => {
    let timeout = setTimeout(async () => {
      let storagePropertiesObject = await getLowerThirdData(snackbarId)
      storagePropertiesObject = storagePropertiesObject?.data
      setShouldAnimate((storagePropertiesObject?.isOpen != properties?.isOpen))
      setProperties(storagePropertiesObject)
    }, 500)
    return () => clearTimeout(timeout)
  })


  return (
    <ThemeProvider theme={darkTheme}>
      <Snackbar
        TransitionProps={shouldAnimate ? {} : { appear: false, }}
        anchorOrigin={{
          vertical: properties?.vertical ? properties?.vertical : "top",
          horizontal: properties?.horizontal ? properties?.horizontal : "left"
        }}
        sx={{ maxWidth: "30vw" }}
        open={properties?.isOpen}
      >
        <Card>
          <CardHeader
            avatar={(properties?.hasAvatar === "true" || properties?.hasAvatar) ? <Avatar src={encodedLogo} sx={{ width: 50, height: 50 }} /> : null}
            title={properties?.title}
            subheader={properties?.subHeader}
          />
        </Card>
      </Snackbar>
    </ThemeProvider>
  );
}

export const darkTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.9)",
        }
      }
    },
  },
  palette: {
    mode: 'dark',
  },
});

export function getTransition(vertical, horizontal, transitionType = "grow") {
  let transition = ""
  let useTransition = props => <Fade {...props} />

  if (horizontal == "center") { transition = vertical }
  else { transition = horizontal }

  if (transitionType == "slide") {
    if (transition) {
      switch (transition) {
        case "left": useTransition = props => <Slide {...props} direction="right" />; break;
        case "right": useTransition = props => <Slide {...props} direction="left" />; break;
        case "top": useTransition = props => <Slide {...props} direction="down" />; break;
        case "bottom": useTransition = props => <Slide {...props} direction="up" />; break;
      }
    }
  }

  if (transitionType == "collapse") {
    if (transition) {
      switch (transition) {
        case "left":
        case "right": useTransition = props => <Collapse {...props} orientation="horizontal" />; break;
        case "top":
        case "bottom": useTransition = props => <Collapse {...props} orientation="vertical" />; break;
      }
    }
  }

  if (transitionType == "grow") {
    if (transition) {
      useTransition = props => <Grow {...props}  />
    }
  }

  if (transitionType == "zoom") {
    if (transition) {
      useTransition = props => <Zoom {...props}  />
    }
  }


  return useTransition
}