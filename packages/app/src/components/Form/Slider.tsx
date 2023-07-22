// @ts-nocheck

import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/base/Slider'
import * as React from 'react'

function SliderValueLabel({ children }) {
  return (
    <span className="label">
      <div className="value">{children}</div>
    </span>
  )
}

const Slider = React.forwardRef(function Slider(
  props: MuiSliderProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const { min, max } = props
  return (
    <div className="flex max-w-[450px] items-center justify-between">
      <span className="text-sm font-bold text-gray-500">{min}</span>
      <MuiSlider
        {...props}
        ref={ref}
        slotProps={{
          thumb: {
            className:
              'ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute',
          },
          root: {
            className: 'w-full relative inline-block h-2 cursor-pointer',
          },
          rail: {
            className:
              'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute',
          },
          track: {
            className: 'bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full',
          },
        }}
        slots={{ valueLabel: SliderValueLabel }}
      />
      <span className="text-sm font-bold text-gray-500">{max}</span>
    </div>
  )
})

export default Slider
