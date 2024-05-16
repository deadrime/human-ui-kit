import { OpenConfig } from 'rc-notification/lib/Notifications';
import { NotificationAPI, useNotification } from 'rc-notification';
import InfoIcon from '@icons/warning-circle.svg';
import IconApprove from '@icons/approve.svg';
import IconReject from '@icons/reject.svg';
import classNames from 'classnames';
import messageStyles from './Message.module.less';
import { CSSMotionProps } from 'rc-motion';
import React, { useMemo } from 'react';
import Text from '@components/Text/Text';

const messageIconByType = {
  warning: <InfoIcon color="var(--iconColor)" width={20} height={20} />,
  info: <InfoIcon color="var(--iconColor)" width={20} height={20} />,
  success: <IconApprove color="var(--iconColor)" width={20} height={20} />,
  error: <IconReject color="var(--iconColor)" width={20} height={20} />,
};

const motion: CSSMotionProps = {
  motionName: 'fade',
  motionAppear: true,
  motionEnter: true,
  motionLeave: true,
  onLeaveStart: (ele) => {
    const { offsetHeight } = ele;
    return { height: offsetHeight };
  },
  onLeaveActive: () => ({ height: 0, opacity: 0, margin: 0, padding: 0 }),
};

export type ShowMessage = {
  (props: MessageProps): void
  warning: (props: Omit<MessageProps, 'type'> | string) => void,
  info: (props: Omit<MessageProps, 'type'> | string) => void,
  success: (props: Omit<MessageProps, 'type'> | string) => void,
  error: (props: Omit<MessageProps, 'type'> | string) => void,
}

export type MessageProps = Omit<OpenConfig, 'key'> & {
  type?: 'warning' | 'info' | 'success' | 'error'
}

export const showMessage = (notificationApi: NotificationAPI) => {
  const show: ShowMessage = ({
    placement = 'top',
    content,
    type = 'info',
    duration = 5,
    className,
    ...props
  }) => notificationApi.open({
    placement: placement,
    content: (
      <div className={messageStyles.messageContent}>
        {messageIconByType[type]}
        <Text block>{content}</Text>
      </div>
    ),
    className: classNames(messageStyles[type], className),
    duration,
    ...props,
  });

  show.warning = (props) => show({ ...typeof props === 'string' ? { content: props } : { ...props }, type: 'warning' });
  show.info = (props) => show({ ...typeof props === 'string' ? { content: props } : { ...props }, type: 'info' });
  show.success = (props) => show({ ...typeof props === 'string' ? { content: props } : { ...props }, type: 'success' });
  show.error = (props) => show({ ...typeof props === 'string' ? { content: props } : { ...props }, type: 'error' });

  return show;
};

export const useMessage = (): [ShowMessage, React.ReactElement] => {
  const [notificationApi, contextHolder] = useNotification({ prefixCls: messageStyles.message, motion });

  const message = useMemo(() => {
    return showMessage(notificationApi);
  }, [notificationApi]);

  return [message, contextHolder];
};
