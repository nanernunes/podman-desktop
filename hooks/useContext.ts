import * as fs from 'fs'
import * as YAML from 'yaml'

import { useCommand } from './useCommand'

const getContexts = (): string[] => {
    const kubeConfig = `${process.env.HOME}/.kube/config`
    const kubeContent = fs.readFileSync(kubeConfig).toString()
    const parsedContent = YAML.parse(kubeContent)
    return parsedContent.contexts.map((context) => context.name)
}

const useContext = (): [Function, Function, Function] => {
    const getCurrentContext = () => useCommand(`/usr/local/bin/kubectl config current-context`)
    const setCurrentContext = (context) => useCommand(`/usr/local/bin/kubectl config use-context ${context}`)

    return [getContexts, getCurrentContext, setCurrentContext]
}

export { useContext }
