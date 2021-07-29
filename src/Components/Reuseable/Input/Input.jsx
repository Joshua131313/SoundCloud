import React from 'react'
import './Input.css'

const Appinput = (props) => {
  const {
  type='text', value, 
  setValue, placeholder, 
  disabled=false, 
  readonly=false,
  required= true, 
  icon, text} = props
  return (
    <label className='appinput'>

      {text&&<span>{placeholder}</span>}
      <input 
      placeholder={placeholder}
      value={value}
      onChange={e=>setValue(e.target.value)}
      type={type}  
      title={placeholder}
      readOnly={readonly}
      required={required} 
      min={0}
      disabled={disabled}/>
     <i className={icon}></i>
   </label>
  )
}
export default Appinput