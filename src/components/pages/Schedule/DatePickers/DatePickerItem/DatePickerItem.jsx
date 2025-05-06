import React from 'react'
import "./datePickerItem.css"

function DatePickerItem({item}) {
  return (
    <div className="datePicker-item">
      {item}
    </div>
  )
}

export default DatePickerItem