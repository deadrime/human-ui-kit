import React, { CSSProperties, FC, ReactElement, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, SwiperOptions, Keyboard, Mousewheel } from 'swiper';
import ArrowLeftIcon from '@icons/arrow-left.svg';
import ArrowRightIcon from '@icons/arrow-right.svg';
import classNames from 'classnames';
import IconButton from '@components/buttons/IconButton';
import styles from './Carousel.module.less';
import 'swiper/css';

export type CarouselProps = SwiperOptions & {
  children: ReactElement|ReactElement[];
  fadeOut?: boolean;
  navigation?: boolean;
  className?: string;
  footerGap?: number
}

const Carousel: FC<CarouselProps> = ({
  children,
  spaceBetween = 8,
  breakpoints,
  navigation = false,
  className,
  slidesPerView = 'auto',
  footerGap = 32,
  fadeOut,
  ...props
}) => {
  const paginatioRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const slides = useMemo(() => Array.isArray(children) ? children : [children], [children]);
  const [showRightFadeOut, setShowRightFadeOut] = useState(true);
  const [showLeftFadeOut, setShowLeftFadeOut] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div
      className={classNames(styles.carousel, className, {
        [styles.showRightFadeOut]: fadeOut && showRightFadeOut,
        [styles.showLeftFadeOut]: fadeOut && showLeftFadeOut,
      })}
      style={{
        '--carousel-footer-gap': `${footerGap}px`,
      } as CSSProperties}
    >
      <Swiper
        {...props}
        onInit={() => setIsInitiated(true)}
        slidesPerView={slidesPerView}
        freeMode={true}
        keyboard={true}
        watchOverflow={true}
        pagination={{
          enabled: isInitiated,
          clickable: true,
          type: 'bullets',
          el: paginatioRef.current,
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.activePaginationBullet,
        }}
        navigation={{
          enabled: isInitiated && navigation,
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        className={styles.swiper}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        modules={[Pagination, Keyboard, Navigation, FreeMode, Mousewheel]}
        onToEdge={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          setShowLeftFadeOut(!swiper.isBeginning);
          setShowRightFadeOut(!swiper.isEnd);
        }}
        onFromEdge={() => {
          setIsBeginning(false);
          setIsEnd(false);
          setShowRightFadeOut(true);
          setShowLeftFadeOut(true);
        }}
        mousewheel={{
          forceToAxis: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide className={styles.slide} key={slide.key}>
            {slide}
          </SwiperSlide>
        ))}
        <div
          className={styles.carouselFooter}
        >
          <IconButton
            disabled={isBeginning}
            ref={prevButtonRef}
            size="small"
            variant="secondary"
            transparent
            className={styles.carouselPrevious}
            icon={<ArrowLeftIcon width={20} />}
            style={(!navigation || !isInitiated) && { display: 'none' }}
          />
          <div className={styles.carouselPagination} ref={paginatioRef} />
          <IconButton
            disabled={isEnd}
            ref={nextButtonRef}
            size="small"
            transparent
            variant="secondary"
            className={styles.carouselNext}
            icon={<ArrowRightIcon width={20} />}
            style={(!navigation || !isInitiated) && { display: 'none' }}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
