/* eslint-disable max-len */
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Truncate, TruncateProps } from '.';
import { Text } from '../Text';
import { useShowMore } from '@hooks/useShowMore';

export default {
  component: Truncate,
} as Meta<typeof Truncate>;

export const Default = {
  render: (args) => (
    <Truncate {...args}>
      <Text size="title3">
        {args.children}
      </Text>
    </Truncate>
  ),
  args: {
    linesCount: 3,
    children: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacinia dui et est cursus fermentum. Donec maximus libero neque, ac tempor nunc consequat id. Vivamus mattis, metus in rhoncus lacinia, tellus est volutpat ligula, at dapibus libero nibh ac ante. Cras aliquet quis erat quis tempus. Suspendisse a metus ipsum. Praesent in leo lacinia, malesuada tellus sed, mattis nunc. In faucibus diam turpis, quis vehicula est tempor in. Integer interdum luctus metus a faucibus. Phasellus et varius dolor, vitae feugiat elit. Cras blandit mi vel risus gravida accumsan.
      Vestibulum tincidunt nunc neque, ac rhoncus lectus tincidunt nec. Etiam elementum nisi ut mi semper, vel dignissim lorem feugiat. Mauris tellus felis, aliquam id dui accumsan, consequat mattis odio. Mauris sed consequat est, vel rutrum lacus. Aliquam ac lorem ultricies, bibendum ligula ac, eleifend turpis. Etiam fermentum lorem nec dapibus blandit. Duis sodales est at efficitur laoreet. Donec pharetra euismod odio vitae aliquam. Ut rhoncus nisi sed felis lacinia, hendrerit placerat augue volutpat. Donec in malesuada risus. Curabitur quis finibus massa. Duis facilisis laoreet leo, et interdum mi. Nulla placerat quis arcu fringilla tincidunt.
      Morbi molestie est commodo lectus ornare, et ornare arcu tempus. Pellentesque quis dapibus dolor. Nam pretium ipsum in tellus condimentum, vitae auctor odio ultrices. Quisque nec risus nec justo luctus gravida quis quis enim. In hac habitasse platea dictumst. Etiam in turpis sagittis, rutrum nisi sed, commodo massa. Maecenas sit amet massa mollis, elementum ipsum sit amet, dictum lorem. Fusce at sem vitae leo scelerisque volutpat in mollis mauris.  
    `,
    isTruncated: true,
  } as TruncateProps,
};

export const WithShowMoreButton = {
  render: (args) => {
    const [isTruncated, setIsTruncated] = useState(true);
    const { contentWrapperRef, showMoreButtonVisible } = useShowMore();

    return (
      <>
        <Truncate isTruncated={isTruncated} ref={contentWrapperRef}>
          <Text size="title3">
            {args.children}
          </Text>
        </Truncate>
        {showMoreButtonVisible && <button onClick={() => setIsTruncated(value => !value)}>
          toggle show more
        </button>}
      </>
    );
  },
  args: {
    linesCount: 4,
    children: `
      Lorem ipsum dolor sit amet, consectetur.  Lorem ipsum dolor sit amet, consectetur.  Lorem ipsum dolor sit amet, consectetur.  Lorem ipsum dolor sit amet, consectetur.  Lorem ipsum dolor sit amet, consectetur.
    `,
    isTruncated: true,
    showMoreButton: true,
  } as TruncateProps,
};
