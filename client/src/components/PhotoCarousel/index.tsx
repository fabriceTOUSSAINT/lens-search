import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_SELECTED_LENS } from '../../apollo/localSchema'
import { PHOTOS_SHOT_WITH } from '../../apollo/serverSchema'

const PhotoCarousel: React.FC = (props: any) => {
  const { data: selectedLensCache } = useQuery(GET_SELECTED_LENS)
  const [lazyFetchPhotos, { data }] = useLazyQuery(PHOTOS_SHOT_WITH)

  useEffect(() => {
    if (Boolean(selectedLensCache?.getSelectedLens?.lensName)) {
      lazyFetchPhotos({
        variables: {
          lensName: selectedLensCache?.getSelectedLens?.lensName,
        },
      })
    }
  }, [selectedLensCache?.getSelectedLens?.lensName])

  return (
    <div>
      <h3>{`${selectedLensCache?.getSelectedLens?.lensName} Photos`}</h3>

      {data?.photosShotWith?.map((photo: any) => (
        <img key={photo.thumbnail} src={photo.imageUrl} />
      ))}
    </div>
  )
}

export default PhotoCarousel
