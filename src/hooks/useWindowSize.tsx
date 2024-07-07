import { useEffect, useState } from 'react';

import { DEVICE_SIZES, DeviceType } from '@/constants/deviceSizes';

function useWindowSize(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    // 서버 사이드 렌더링 시 기본값을 사용
    if (typeof window !== 'undefined') {
      const { innerWidth: width } = window;
      if (width <= DEVICE_SIZES.MOBILE) {
        return DeviceType.MOBILE;
      }
      if (width <= DEVICE_SIZES.TABLET) {
        return DeviceType.TABLET;
      }
      return DeviceType.PC;
    }
    return DeviceType.PC;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return; // 서버 사이드 렌더링 방지

    const handleResize = () => {
      const { innerWidth: width } = window;

      if (width <= DEVICE_SIZES.MOBILE) {
        setDeviceType(DeviceType.MOBILE);
      } else if (width <= DEVICE_SIZES.TABLET) {
        setDeviceType(DeviceType.TABLET);
      } else {
        setDeviceType(DeviceType.PC);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}

export default useWindowSize;
