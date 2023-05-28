import { useState } from 'react'

type HeaderHamburgerMenuPropType = {
  isLightTheme: boolean
}

export function HeaderHamburgerMenu({ isLightTheme }: HeaderHamburgerMenuPropType) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <nav className='ham_menu' onClick={() => setOpen((prevState) => !prevState)}>
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_first
                    ${open ? 'ham_menu__bar_first--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}
      >
        {' '}
      </span>
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_second ${open ? 'ham_menu__bar_second--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}
      />
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_third ${open ? 'ham_menu__bar_third--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}
      />
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_fourth ${open ? 'ham_menu__bar_fourth--open' : null}
                    ${isLightTheme ? 'ham_menu__bar--light' : null}`}
      />
    </nav>
  )
}
