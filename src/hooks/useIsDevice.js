import { useEffect, useMemo, useState } from "react";

export const deviceSize = {
    sm: 901,
    default: 1024
}
const useIsDevice = (size = deviceSize.default) => {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(userAgent);
    const isDesktop = !isMobile;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const mode = {
        landscape: 'landscape',
        portrait: 'portrait'
    }
    const getOrientation = () => {
        return isDesktop ? mode.portrait : window.matchMedia('(orientation: portrait)').matches ? mode.portrait : mode.landscape
    }
    const [, setOrientation] = useState(getOrientation())
    useEffect(() => {
        const handleOrientationChange = () => {
            setWindowWidth(window.innerWidth);
            setOrientation(getOrientation())
        }

        window.addEventListener('resize', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange)
        }

    }, [])
    
const isDevice = useMemo(() => windowWidth < size, [windowWidth, size])
return isDevice
   
}

export default useIsDevice;