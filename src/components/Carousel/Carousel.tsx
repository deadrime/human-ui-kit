import React, { CSSProperties, FC, ReactElement, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, SwiperOptions, Keyboard, Mousewheel } from 'swiper';
import ArrowLeftIcon from '@icons/arrow-left.svg';
import ArrowRightIcon from '@icons/arrow-right.svg';
import classNames from 'classnames';
import IconButton from '@components/buttons/IconButton';
import styles from './Carousel.module.less';
import 'swiper/css';

export interface CarouselProps {
  children: ReactElement|ReactElement[];
  spaceBetween?: SwiperOptions['spaceBetween'];
  slidesPerView?: SwiperOptions['slidesPerView'];
  breakpoints?: SwiperOptions['breakpoints'];
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
}) => {
  const paginatioRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const slides = useMemo(() => Array.isArray(children) ? children : [children], [children]);
  const [showRightFadeOut, setShowRightFadeOut] = useState(true);
  const [showLeftFadeOut, setShowLeftFadeOut] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);

  return (
    <div
      className={classNames(styles.carousel, className, {
        [styles.showRightFadeOut]: showRightFadeOut,
        [styles.showLeftFadeOut]: showLeftFadeOut,
      })}
      style={{
        '--carousel-footer-gap': `${footerGap}px`,
      } as CSSProperties}
    >
      <Swiper
        onInit={() => setIsInitiated(true)}
        slidesPerView={slidesPerView}
        freeMode={true}
        keyboard={true}
        watchOverflow={true}
        pagination={{
          enabled: isInitiated,
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
          setShowLeftFadeOut(!swiper.isBeginning);
          setShowRightFadeOut(!swiper.isEnd);
        }}
        onFromEdge={() => {
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
