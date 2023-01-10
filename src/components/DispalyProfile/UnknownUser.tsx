import Link from 'next/link';
import React from 'react';
import Avatar from 'ui/components/Avatar/Avatar';
import BlockchainAddress from 'ui/components/BlockchainAddress/BlockchainAddress';
import { SOLANA_EXPLORER_LINK_TYPES } from 'ui/shared/constants';
import { getSolanaExplorerLink } from 'ui/shared/utils';
import { DisplayProfileSize } from './DisplayProfile';
import styles from './UnknownUser.module.less';

type UnknownUserProps = {
  address: string;
  size?: DisplayProfileSize
}

const UnknownUser: React.FC<UnknownUserProps> = ({ address, size = 'medium' }) => (
  <div className={styles.unknownUser}>
    <Link href={getSolanaExplorerLink(SOLANA_EXPLORER_LINK_TYPES.ADDRESS, address)}>
      <a target="_blank" tabIndex={-1}>
        <Avatar
          size={size}
          src="/images/default-avatar.webp"
        />
      </a>
    </Link>
    <BlockchainAddress address={address} />
  </div>
);

export default UnknownUser;
