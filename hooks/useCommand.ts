import { execSync } from 'child_process'

const useCommand = (command) => {
    const stdout = execSync(command)
    return stdout.toString().trim()
}

export { useCommand }
