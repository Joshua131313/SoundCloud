import React from 'react'
import Slider from 'react-custom-slider';

const SliderComp = (props) => {
  const {value, handleChange, contsizer='100%', length=100} = props

  return (
    <div className="slider" style={{width: contsizer}}>
    <Slider  value={value}
            markersSize={20}
            markers={0}
            onChange={(value) => handleChange(value)}
            fillColor={'var(--theme-color)'}
            handlerShape='rounded'
            handlerWidth={10}
            handlerHeight={10}
            trackLength={length}
            max={100}
            showMarkers={false}
          />
    </div>
  )
}
export default SliderComp