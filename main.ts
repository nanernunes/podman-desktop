import { app, Tray } from 'electron'

import { useImage } from './hooks'
import { getContextMenu } from './menu'

const [getImage] = useImage()

const trayico = getImage('docker')
const tooltip = `Podman Desktop`

app.on('ready', () => {
    const tray = new Tray(trayico)

    tray.setContextMenu(getContextMenu())
    tray.setToolTip(tooltip)
})
