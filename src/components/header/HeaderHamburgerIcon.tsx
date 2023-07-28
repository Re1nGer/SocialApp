type HeaderHamburgerIconType = {
  open: boolean,
  handleOpen?: () => void
}

const HeaderHamburgerIcon = ({ open, handleOpen }: HeaderHamburgerIconType) => {

  return (
    <nav className='lg:hidden block ham_menu ' onClick={handleOpen}>
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_first
         ${open ? 'ham_menu__bar_first--open' : ''}`}
      />
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_second ${open ? 'ham_menu__bar_second--open' : ''} `}
      />
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_third ${open ? 'ham_menu__bar_third--open' : ''}`}
      />
      <span
        role='button'
        className={`ham_menu__bar ham_menu__bar_fourth ${open ? 'ham_menu__bar_fourth--open' : ''}`}
      />
    </nav>
  )
}

export default HeaderHamburgerIcon