import { ThemeConfigContext } from '@components/theme/themeContext';
import { useContext } from 'react';

const InternalLink: React.FC<any> = (props) => {
  const themeConfig = useContext(ThemeConfigContext);

  return themeConfig.renderInternalLink?.(props);
};

export default InternalLink;
