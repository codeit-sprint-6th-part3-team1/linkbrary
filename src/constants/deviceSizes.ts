export const DEVICE_SIZES = {
  MOBILE: 390,
  TABLET: 800,
  PC: 1024,
};

export const DeviceType = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  PC: 'pc',
} as const;

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];
