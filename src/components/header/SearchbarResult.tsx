import { Link, useParams } from "react-router-dom";

const defaultUserImg =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'

type SearchbarResultType = {
  id: string
  username: string
  lowResImageLink: string
  handleResultClick: () => void
}

const SearchbarResult = ({
  id,
  username,
  lowResImageLink,
  handleResultClick,
}: SearchbarResultType): JSX.Element => {

  const { userId } = useParams()

  console.log(userId, id)

  return (
    <Link to={userId ?? '' === id ? 'mypage' : `/user/${id}`} onClick={handleResultClick}>
      <div className='searchbar__result' key={id}>
        <img
          className='searchbar__result-img'
          src={lowResImageLink || defaultUserImg}
          alt='search'
        />
        <div className='searchbar__result'>{username}</div>
      </div>
    </Link>
  )
}

export default SearchbarResult
