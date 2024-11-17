import React from 'react'
import { DotButton, useDotButton } from '../ImagesCarousel/EmblaCarouselDot'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '../ImagesCarousel/EmblaCarouselArrow'
import useEmblaCarousel from 'embla-carousel-react'
import { useState,useEffect } from 'react'
const EmblaCarousel = (props) => {

    const [slides,setSlides]=useState([])

    useEffect(() => {
        fetch('/data/brands/all-products.json')
          .then(response => response.json())
          .then(data => {
            setSlides(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

 
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
