import { Link } from 'react-router-dom'
import { toImgSrc } from '../../utils/toImgSrc'

const defaultUserImg =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'

type SearchbarResultType = {
  id: number
  username: string
  picture: string
  handleResultClick: () => void
}

export const SearchbarResult = ({
  id,
  username,
  picture,
  handleResultClick,
}: SearchbarResultType): JSX.Element => {
  return (
    <Link to={`/user/${id}`} onClick={handleResultClick}>
      <div className='searchbar__result' key={id}>
        <img
          className='searchbar__result-img'
          src={picture ? toImgSrc(picture) : defaultUserImg}
          alt='search'
        />
        <div className='searchbar__result'>{username}</div>
      </div>
    </Link>
  )
}
