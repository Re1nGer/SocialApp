import { MouseEventHandler } from 'react'
import './HeaderIcon.css'

type HeaderLogoIconPropType = {
  onClick: MouseEventHandler<HTMLDivElement>
}
export function HeaderLogoIcon({ onClick }: HeaderLogoIconPropType) {
  return (
    <div className='m-icon' onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        id='Layer_1'
        data-name='Layer 1'
        viewBox='0 0 766.15 715.7'
      >
        <defs>
          <style>
            {
              '.cls-1{fill:var(--primary);}.cls-2{fill:var(--primary);}.cls-3{fill:var(--primary);} '
            }
          </style>
        </defs>
        <title>Header Icon</title>
        <polygon className='cls-1' points='0 684.86 0 414.84 136.41 549.85 0 684.86' />
        <polygon className='cls-2' points='0 331.69 0 0 547.52 549.85 382.29 715.7 0 331.69' />
        <polygon
          className='cls-1'
          points='766.15 684.86 766.15 414.84 631.61 549.85 766.15 684.86'
        />
        <polygon
          className='cls-3'
          points='425.12 343.83 766.15 4.67 766.15 333.56 588.63 508.27 425.12 343.83'
        />
      </svg>
    </div>
  )
}
