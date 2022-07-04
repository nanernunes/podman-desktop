import { useCommand } from './useCommand'

interface MachineProps {
    Name: string
    Default: boolean
    Created: string
    Running: boolean
    LastUp: string
    Stream: string
    VMType: string
    CPUs: number
    Memory: string
    DiskSize: string
    Port: number
    RemoteUsername: string
    IdentityPath: string
}

const usePodman = (): [() => MachineProps] => {
    const getMachine = () => {
        const stdout = useCommand(`/usr/local/bin/podman machine list --format json`)
        return JSON.parse(stdout)[0]
    }

    return [getMachine]
}

export { usePodman }
