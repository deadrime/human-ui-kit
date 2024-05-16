import React, { CSSProperties, Fragment, HTMLProps, useMemo } from 'react';
import Text, { FontSize, TextProps } from '@components/Text';
import styles from './DisplayProfile.module.less';
import Avatar, { AVATAR_SIZES } from '@components/Avatar';
import classNames from 'classnames';
import Skeleton from '@components/Skeleton/Skeleton';
import InternalLink from '@components/InternalLink/InternalLink';
import IconVerified from '@icons/verified.svg';
import Ticker from '@components/Ticker';
import { BaseProfile } from './types';
import { useThemeConfig } from '@components/theme/themeContext';

export type VerificationIconProps = {
  isVerified?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export const VerificationIcon: React.FC<VerificationIconProps> = ({ Icon, isVerified }) => {
  if (!isVerified) {
    return null;
  }

  return React.createElement(Icon || IconVerified, {
    width: '0.8em',
    style: {
      flexShrink: 0,
      color: 'var(--color-primary)',
      '--checkmarkColor': 'var(--displayProfile-verifiedIconCheckmarkColor)',
    } as CSSProperties,
  });
};

export const defaultDisplayProfileRenderField = {
  username: (profile: BaseProfile) => (
    profile ? (
      <InternalLink
        href={`/${profile?.username}`}
        className={styles.ellipsis}
        style={{ color: 'inherit' }}
        tabIndex={-1}
      >
        @{profile.username}
      </InternalLink>
    ) : <Skeleton width={100} block />
  ),
  fullName: (profile: BaseProfile) => (
    profile ? (
      <InternalLink
        href={`/${profile?.username}`}
        className={styles.ellipsis}
        style={{ color: 'inherit', pointerEvents: profile ? 'auto' : 'none' }}
        tabIndex={-1}
      >
        {profile.fullName}
      </InternalLink>
    ) : <Skeleton width={140} block />
  ),
  isVerified: (profile: BaseProfile) => {
    const config = useThemeConfig();
    return <VerificationIcon isVerified={profile?.isVerified} Icon={config?.displayProfile?.VerifiedIcon} />;
  },
  ticker: (profile: BaseProfile) => (
    profile?.ticker && (
      <InternalLink
        href={`/${profile.username}`}
        style={{ color: 'inherit' }}
        tabIndex={-1}
      >
        <Ticker>{profile.ticker}</Ticker>
      </InternalLink>
    )
  ),
  tickerNoCircle: (profile: BaseProfile) => (
    profile?.ticker && (
      <InternalLink
        href={`/${profile.username}`}
        style={{ color: 'inherit' }}
        tabIndex={-1}
      >
        <Ticker showCircle={false}>{profile.ticker}</Ticker>
      </InternalLink>
    )
  ),
  usernameNoLink: (profile: BaseProfile) => (
    profile ?
      <span
        className={styles.ellipsis}
        style={{ color: 'inherit' }}
      >
        @{profile.username}
      </span> : <Skeleton width={100} block />
  ),
  fullNameNoLink: (profile: BaseProfile) => (
    profile ? (
      <span
        className={styles.ellipsis}
        style={{ color: 'inherit' }}
      >
        {profile.fullName}
      </span>
    ) : <Skeleton width={140} block />
  ),
  tickerNoLink: (profile: BaseProfile) => (
    profile && <Ticker>{profile.ticker}</Ticker>
  ),
};

type DefaultDisplayProfileRenderField<P = BaseProfile> = Record<keyof typeof defaultDisplayProfileRenderField, (profile: P) => React.ReactNode>;

type RenderLayoutElement<P = BaseProfile> = (profile: P) => React.ReactNode

type LayoutArray<P = BaseProfile, R = DefaultDisplayProfileRenderField<P>> = (keyof R | RenderLayoutElement<P>)[];

export type DisplayProfileTextProps<P = BaseProfile, R = DefaultDisplayProfileRenderField<P>> = {
  profile: P,
  layout?: LayoutArray<P, R>
  postfix?: React.ReactElement,
  textProps?: Omit<TextProps, 'ref'>
  renderField: R,
}

export const DisplayProfileTitle = <P, R>({
  layout,
  profile,
  textProps,
  postfix,
  renderField,
}: DisplayProfileTextProps<P, R>) => (
  <Text
    size="body1"
    bold
    className={styles.title}
    {...textProps}
  >
    {layout.map((field, index) => typeof field === 'function'
      ? <Fragment key={index}>{field?.(profile)}</Fragment>
      : <Fragment key={String(field)}>{renderField[String(field)]?.(profile)}</Fragment>
    )}
    {profile && postfix}
  </Text>
);

type DisplayProfileSubtitleProps<P = BaseProfile, R = DefaultDisplayProfileRenderField<P>> = DisplayProfileTextProps<P, R> & {
  postfix?: React.ReactElement
}

export const DisplayProfileSubtitle = <P, R>({
  layout,
  profile,
  textProps,
  postfix,
  renderField,
}: DisplayProfileSubtitleProps<P, R>) => (layout?.length > 0 || postfix) && (
  <Text
    size="body2"
    {...textProps}
    className={styles.subtitle}
  >
    {layout.map((field, index) => typeof field === 'function'
      ? <Fragment key={index}>{field?.(profile)}</Fragment>
      : <Fragment key={String(field)}>{renderField[String(field)]?.(profile)}</Fragment>
    )}
    {profile && postfix}
  </Text>
);

export type DisplayProfileSize = 'small' | 'medium' | 'large';

export const titleFontSize: Record<DisplayProfileSize, FontSize> = {
  small: 'body2',
  medium: 'body1',
  large: 'body1',
};

export type DisplayProfileProps<P = BaseProfile, R = DefaultDisplayProfileRenderField<P>> = Omit<HTMLProps<HTMLDivElement>, 'ref' | 'size'> & {
  profile: P,
  avatar?: React.ReactElement, // Custom avatar
  avatarSize?: AVATAR_SIZES,
  avatarAlign?: 'flex-start' | 'center',
  children?: React.ReactElement,
  titleLayout?: (keyof R | RenderLayoutElement<P>)[],
  titleTextProps?: DisplayProfileTextProps<P, R>['textProps'],
  titlePostfix?: React.ReactElement,
  subtitleLayout?: (keyof R | RenderLayoutElement<P>)[],
  subtitleTextProps?: DisplayProfileSubtitleProps<P, R>['textProps'],
  postfix?: DisplayProfileSubtitleProps<P, R>['postfix'],
  extra?: React.ReactElement,
  size?: DisplayProfileSize,
  className?: string,
  allowFocus?: boolean,
  childrenSkeleton?: React.ReactElement,
  contentWrapperStyles?: React.CSSProperties,
  renderField?: R,
  getAvatarSrc?: (profile: P) => string
  getAvatarUrl?: (profile: P) => string
}

const defaultGetAvatarSrc = (profile: BaseProfile) => profile?.avatar;
const defaultGetAvatarUrl = () => '/';

export const DisplayProfile = <P extends BaseProfile, R extends DefaultDisplayProfileRenderField<P>>({
  profile,
  titleLayout = ['fullName', 'isVerified'],
  titleTextProps,
  titlePostfix,
  subtitleTextProps,
  size = AVATAR_SIZES.medium,
  avatar,
  avatarSize,
  avatarAlign,
  postfix,
  extra,
  className,
  children,
  childrenSkeleton,
  allowFocus,
  contentWrapperStyles,
  renderField: userRenderField = defaultDisplayProfileRenderField as any,
  subtitleLayout: userSubtitleLayout,
  getAvatarSrc: userGetAvatarSrc,
  getAvatarUrl: userGetAvatarUrl,
  ...props
}: DisplayProfileProps<P, R>) => {
  const config = useThemeConfig();
  const renderField = useMemo(() => ({
    ...defaultDisplayProfileRenderField,
    ...config?.displayProfile?.renderField,
    ...userRenderField,
  }), [config?.displayProfile?.renderField, userRenderField]);

  const subtitleLayout = userSubtitleLayout || config.displayProfile.defaultSubtitleLayout as (keyof R)[] || ['username', 'ticker'];
  const getAvatarSrc = userGetAvatarSrc || config?.displayProfile?.getAvatarSrc || defaultGetAvatarSrc;
  const getAvatarUrl = userGetAvatarUrl || config?.displayProfile?.getAvatarUrl || defaultGetAvatarUrl;

  return (
    <div className={classNames(styles.displayProfileWrapper, styles[size], className)} {...props}>
      {avatar !== undefined ? avatar : (
        <InternalLink
          href={getAvatarUrl?.(profile) || '/'}
          tabIndex={allowFocus ? 0 : -1}
          className={styles.avatarLink}
          style={{
            alignSelf: avatarAlign || (children ? 'flex-start' : undefined),
            pointerEvents: profile ? 'auto' : 'none',
          }}
        >
          <Avatar
            nftEffect={!!profile?.avatarNft}
            src={getAvatarSrc?.(profile)}
            size={avatarSize || size}
            className={styles.avatar}
          />
        </InternalLink>
      )}
      <div className={styles.displayProfileContentWrapper} style={contentWrapperStyles}>
        <DisplayProfileTitle
          profile={profile}
          postfix={titlePostfix}
          textProps={{
            size: titleFontSize[size],
            ...titleTextProps,
          }}
          layout={titleLayout}
          renderField={renderField}
        />
        <DisplayProfileSubtitle
          profile={profile}
          textProps={subtitleTextProps}
          layout={subtitleLayout}
          postfix={postfix}
          renderField={renderField}
        />
        {profile && children}
        {(!profile && !!children) && (childrenSkeleton || <Skeleton block />)}
      </div>
      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  );
};
