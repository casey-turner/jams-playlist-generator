// @ts-nocheck

import BaseSlider, { SliderProps as BaseSliderProps } from '@mui/base/Slider'
import * as React from 'react'

function SliderValueLabel({ children }) {
  return (
    <span className="absolute flex h-8 w-8 items-center justify-center bg-blue-600 text-sm text-white">
      <div>{children}</div>
    </span>
  )
}

const Slider = React.forwardRef(function Slider(
  props: BaseSliderProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const { min, max } = props
  return (
    <div className="mt-5">
      <label className="mb-2 block font-bold">Number Of Tracks</label>
      <div className="flex max-w-[750px] items-center justify-between gap-5">
        <span className="text-sm font-bold text-gray-900">{min}</span>
        <BaseSlider
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
              className:
                'bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full',
            },
          }}
          slots={{ valueLabel: SliderValueLabel }}
        />
        <span className="text-sm font-bold text-gray-900">{max}</span>
      </div>
    </div>
  )
})

export default Slider
