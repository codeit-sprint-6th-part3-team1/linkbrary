import { useState, useEffect } from 'react';
import { DEVICE_SIZES, DeviceType } from '@/constants/deviceSizes';

function useWindowSize(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.PC);

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;

      if (width <= DEVICE_SIZES.MOBILE) {
        setDeviceType(DeviceType.MOBILE);
      } else if (width <= DEVICE_SIZES.TABLET) {
        setDeviceType(DeviceType.TABLET);
      } else {
        setDeviceType(DeviceType.PC);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}

export default useWindowSize;