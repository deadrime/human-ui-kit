import React, { Fragment, HTMLProps } from 'react';
import Text, { FontSize, TextProps } from '@components/Text';
import styles from './DisplayProfile.module.less';
import { AVATAR_SIZES } from '../Avatar/constants';
import classNames from 'classnames';
import Skeleton from '../Skeleton/Skeleton';

export type DisplayProfileTextProps<P extends Record<string, unknown>, R extends Record<string, (profile: P) => React.ReactNode>> = {
  profile: P,
  layout?: (keyof R)[];
  postfix?: React.ReactElement,
  textProps?: Omit<TextProps, 'ref'>
  renderField: R,
}

export const DisplayProfileTitle = React.memo(<P extends Record<string, unknown>, R extends Record<string, (profile: P) => React.ReactNode>>({
  layout,
  profile,
  textProps,
  postfix,
  renderField,
}: DisplayProfileTextProps<P, R>) => (
  <Text
    color="white"
    size="body1"
    bold
    className={styles.title}
    {...textProps}
  >
    {layout.map(field => <Fragment key={String(field)}>{renderField[String(field)]?.(profile)}</Fragment>)}
    {profile && postfix}
  </Text>
));

type DisplayProfileSubtitleProps<P extends Record<string, unknown>, R extends Record<string, (profile: P) => React.ReactNode>> = DisplayProfileTextProps<P, R> & {
  postfix?: React.ReactElement
}

export const DisplayProfileSubtitle = <P extends Record<string, unknown>, R extends Record<string, (profile: P) => React.ReactNode>>({
  layout,
  profile,
  textProps,
  postfix,
  renderField,
}: DisplayProfileSubtitleProps<P, R>) => (layout?.length > 0 || postfix) && (
  <Text
    color="gray-200"
    size="body2"
    {...textProps}
    className={styles.subtitle}
  >
    {layout.map(field => <Fragment key={String(field)}>{renderField[field]?.(profile)}</Fragment>)}
    {profile && postfix}
  </Text>
);

export type DisplayProfileSize = 'small' | 'medium' | 'large'

export const titleFontSize: Record<DisplayProfileSize, FontSize> = {
  small: 'body2',
  medium: 'body1',
  large: 'body1',
};

export type DisplayProfileProps<P extends Record<string, unknown>, R extends Record<string, (profile: P) => React.ReactNode>> = Omit<HTMLProps<HTMLDivElement>, 'ref' | 'size'> & {
  profile: P,
  avatar?: React.ReactElement, // Custom avatar
  avatarAlign?: 'flex-start' | 'center',
  children?: React.ReactElement,
  titleLayout?: (keyof R)[],
  titleTextProps?: DisplayProfileTextProps<P, R>['textProps'],
  titlePostfix?: React.ReactElement,
  subtitleLayout?: (keyof R)[],
  subtitleTextProps?: DisplayProfileSubtitleProps<P, R>['textProps'],
  postfix?: DisplayProfileSubtitleProps<P, R>['postfix'],
  extra?: React.ReactElement,
  size?: DisplayProfileSize,
  className?: string,
  allowFocus?: boolean,
  childrenSketon?: React.ReactElement,
  contentWrapperStyles?: React.CSSProperties,
  renderField: R,
}

export const DisplayProfile = <P extends Record<string, unknown>, R extends Record<string, (profile: P) => React.ReactNode>>({
  profile,
  titleLayout,
  titleTextProps,
  titlePostfix,
  subtitleLayout,
  subtitleTextProps,
  size = AVATAR_SIZES.medium,
  avatar,
  avatarAlign,
  postfix,
  extra,
  className,
  children,
  childrenSketon,
  allowFocus,
  contentWrapperStyles,
  renderField,
  ...props
}: DisplayProfileProps<P, R>) => (
  <div className={classNames(styles.displayProfileWrapper, styles[size], className)} {...props}>
    {avatar !== undefined && avatar}
    <div className={styles.displayProfileContentWrapper} style={contentWrapperStyles}>
      <DisplayProfileTitle
        key={`title-${profile?.userID}`}
        profile={profile}
        postfix={titlePostfix}
        textProps={{
          size: titleFontSize[size],
          ...titleTextProps,
        }}
        layout={titleLayout as string[]}
        renderField={renderField}
      />
      <DisplayProfileSubtitle
        key={`subtitle-${profile?.userID}`}
        profile={profile}
        textProps={subtitleTextProps}
        layout={subtitleLayout as string[]}
        postfix={postfix}
        renderField={renderField}
      />
      {profile && children}
      {(!profile && !!children) && (childrenSketon || <Skeleton block />)}
    </div>
    {extra && <div className={styles.extra}>{extra}</div>}
  </div>
);
