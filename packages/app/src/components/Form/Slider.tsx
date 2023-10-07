import BaseSlider, { SliderProps as BaseSliderProps } from '@mui/base/Slider'
import * as React from 'react'

function SliderValueLabel({ children }: { children: string }) {
  return (
    <span className="bg-yale-blue absolute -top-10 flex h-6 w-8 items-center justify-center rounded-sm text-xs font-medium text-white before:absolute before:bottom-0 before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:transform before:bg-inherit md:text-sm">
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
    <>
      <label className="text-gunmetal mb-12 block text-sm font-bold md:text-base">
        Number Of Tracks
      </label>
      <BaseSlider
        {...props}
        ref={ref}
        slotProps={{
          thumb: {
            className:
              'ring-yale-blue ring-2 w-4 h-4 -mt-0.5 -ml-2 flex items-center justify-center bg-ghost-white rounded-full shadow absolute',
          },
          root: {
            className: 'w-full relative inline-block h-2 cursor-pointer',
          },
          rail: {
            className: 'bg-silver h-3 w-full rounded-full block absolute',
          },
          track: {
            className: 'bg-yale-blue h-3 absolute rounded-full',
          },
        }}
        slots={{ valueLabel: SliderValueLabel }}
      />
      <div className="flex justify-between">
        <span className="text-gunmetal text-xs font-bold md:text-sm">
          {min}
        </span>
        <span className="text-gunmetal text-xs font-bold md:text-sm">
          {max}
        </span>
      </div>
    </>
  )
})

export default Slider
