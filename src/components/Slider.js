import React from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 

const Slider = ({imageUrls}) => {

    const [sliderRef, instanceRef] = useKeenSlider()

    return (
        <div ref={sliderRef} className="keen-slider">
            {
                imageUrls.map((url, i) => (
                    <div key={i} className="keen-slider__slide">
                        <img src={url} />
                    </div>
                ))
            }
        </div>
    )
}

export default Slider