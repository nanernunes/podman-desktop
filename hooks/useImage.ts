import { nativeImage } from 'electron'

const useImage = () => {
    return [(image) => nativeImage.createFromPath(`assets/${image}.png`)]
}

export { useImage }
