import * as path from 'path'
import { nativeImage } from 'electron'

const useImage = () => {
    return [
        (image) => {
            const imageName = `${image}.png`
            const imagePath = process.env.DEV_MODE
                ? `assets/${imageName}`
                : path.join(process.resourcesPath, imageName)
            return nativeImage.createFromPath(imagePath)
        },
    ]
}

export { useImage }
