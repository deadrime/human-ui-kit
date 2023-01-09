export enum ALL_AVATAR_SIZES {
  xSmall = 26,
  small = 32,
  medium = 44,
  large = 50,
  xLarge = 160,
  xxLarge = 194
}

export enum AVATAR_SIZES {
  xLarge = 'xLarge', // 194/160,
  large = 'large', // 50/44,
  medium = 'medium', //44/32
  small = 'small', // 32
  xSmall = 'xSmall' // 26
};

export enum AVATAR_QUALITY {
  thumb = 'thumb',
  medium = 'medium',
  large = 'large'
}

export type AvatarSize = {
  mobile: number,
  desktop: number
}

export const avatarSizesMap: Record<AVATAR_SIZES, AvatarSize> = {
  [AVATAR_SIZES.xSmall]: {
    mobile: ALL_AVATAR_SIZES.xSmall,
    desktop: ALL_AVATAR_SIZES.xSmall,
  },
  [AVATAR_SIZES.small]: {
    mobile: ALL_AVATAR_SIZES.small,
    desktop: ALL_AVATAR_SIZES.small,
  },
  [AVATAR_SIZES.medium]: {
    mobile: ALL_AVATAR_SIZES.xSmall,
    desktop: ALL_AVATAR_SIZES.medium,
  },
  [AVATAR_SIZES.large]: {
    mobile: ALL_AVATAR_SIZES.medium,
    desktop: ALL_AVATAR_SIZES.large,
  },
  [AVATAR_SIZES.xLarge]: {
    mobile: ALL_AVATAR_SIZES.xLarge,
    desktop: ALL_AVATAR_SIZES.xxLarge,
  },
};
