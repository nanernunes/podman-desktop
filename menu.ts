import { app, Menu } from 'electron'

import { useImage, useContext, usePodman } from './hooks'

const [getImage] = useImage()
const [getMachine] = usePodman()
const [getContexts, getCurrentContext, setCurrentContext] = useContext()

const running = getImage('green')
const pending = getImage('yellow')

const getContextItems = () => {
    const currentContext = getCurrentContext()

    return getContexts().map((context) => ({
        id: context,
        label: context,
        type: 'radio',
        checked: context == currentContext,
        click: ({ label }) => setCurrentContext(label),
    }))
}

const getContextMenu = () => {
    const contextMenu = Menu.buildFromTemplate([
        {
            id: 'podman',
            type: 'normal',
            label: 'Podman Desktop is running',
            icon: getMachine().Running ? running : pending,
        },
        { type: 'normal', label: 'Kubernetes is starting', icon: pending, enabled: false },
        { type: 'separator' },
        { type: 'normal', label: 'About Podman Desktop', enabled: false },
        { type: 'separator' },
        { type: 'normal', label: 'Preferences...', accelerator: 'Cmd+,', enabled: false },
        { type: 'normal', label: 'Check for Updates...', enabled: false },
        { type: 'normal', label: 'Troubleshoot', enabled: false },
        { type: 'separator' },
        { type: 'normal', label: 'Documentation', enabled: false },
        { type: 'normal', label: 'Docker Hub', enabled: false },
        { type: 'separator' },
        { type: 'normal', label: 'Dashboard', enabled: false },
        { type: 'separator' },
        { type: 'normal', label: 'Sign in / Create Docker ID', enabled: false },
        { type: 'normal', label: 'Repositories', enabled: false },
        { type: 'submenu', id: 'kubernetes', label: 'Kubernetes', submenu: getContextItems() },
        { type: 'separator' },
        { type: 'normal', label: 'Restart', accelerator: 'Cmd+R', enabled: false },
        {
            type: 'normal',
            label: 'Quit Podman Desktop',
            accelerator: 'Cmd+Q',
            click: () => app.exit(0),
        },
    ])

    contextMenu.on('menu-will-show', () => {
        const kubernetes = contextMenu.getMenuItemById('kubernetes')
        kubernetes.submenu.getMenuItemById(getCurrentContext()).checked = true
    })

    return contextMenu
}

export { getContextMenu }
