import * as React from 'react';
import { setInitialData, setStorageData, autoHideRutine } from './App';
import { PanelItem } from './components/PanelItem';

export default function Panel(props) {

    return (
        <div style={{ zoom: "80%" }}>
            <PanelItem alternative={true} id={1} />
            <PanelItem alternative={true} id={2} />
            <PanelItem alternative={true} id={3} />
            <PanelItem alternative={true} id={4} />
            <PanelItem alternative={true} id={5} />
            <PanelItem alternative={true} id={6} />
        </div>
    );
}