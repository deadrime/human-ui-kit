import React from 'react';
import Text, { FontSize } from '@components/Text';
import IconWallet from '@icons/wallet.svg';
import copyToClipboard from 'copy-to-clipboard';
import { shrinkAddress } from '@utils/shrinkAddress';
import styles from './BlockchainAddress.module.less';
import classNames from 'classnames';
import { useModal } from '@components/Modal/useModal';
import Skeleton from '@components/Skeleton';

export type BlockchainAddressProps = {
  address: string;
  customName?: string;
  shrinkSize?: number;
  fontSize?: FontSize;
  className?: string;
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
  onClick?: () => void;
}

const BlockchainAddress: React.FC<BlockchainAddressProps> = ({
  address,
  customName,
  shrinkSize = 5,
  className,
  fontSize = 'body2',
  icon = <IconWallet width={24} height={24} />,
  iconPlacement = 'left',
  onClick,
}) => {
  const { message } = useModal();
  return (
    <Text.Button
      size={fontSize}
      target="_blank"
      onClick={() => {
        const copiedSuccessfully = copyToClipboard(address);
        if (copiedSuccessfully) {
          message.success('The address has been copied successfully.');
        } else {
          message.error('Could not copy the address.');
        }
        onClick?.();
      }}
      className={classNames(styles.address, className)}
    >
      {icon}
      {address
        ? <span style={{ order: iconPlacement === 'right' ? -1 : 1 }}>{customName || shrinkAddress(address || '', shrinkSize)}</span>
        : <Skeleton style={{ order: iconPlacement === 'right' ? -1 : 1 }} block width={80} />
      }
    </Text.Button>
  );
};

export default BlockchainAddress;
