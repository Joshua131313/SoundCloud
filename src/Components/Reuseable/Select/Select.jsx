import React from 'react'

const Appselect = (props) => {
  const { defaultoption, value, setValue, options} = props

  const optionsrow = options.map(option=> {
    return (
      <option value={option.value}>{option.text}</option>
    )
  })
  

  return (
    <select className='checkoutselect' value={value} onChange={e=> setValue(e.target.value)}>
      <option value={defaultoption.value}>{defaultoption.text}</option>
      {optionsrow}
    </select>
  )
}
export default Appselect