import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_SELECTED_LENS } from '../../apollo/localSchema'
import { PHOTOS_SHOT_WITH } from '../../apollo/serverSchema'

const PhotoCarousel: React.FC = (props: any) => {
  const { data: selectedLensCache } = useQuery(GET_SELECTED_LENS)

  // TODO: IDK why this query isn't actually passing back the lens in variables.
  const { data } = useQuery(PHOTOS_SHOT_WITH, {
    fetchPolicy: 'network-only',
    variables: {
      lens: selectedLensCache?.getSelectedLens,
    },
    onCompleted: (data) => console.log(data, 'on completed'),
  })

  //   useEffect(() => {
  //     console.log(selectedLensCache?.getSelectedLens, '<<<, this changed')

  //     if (Boolean(selectedLensCache?.getSelectedLens?.lensName)) {
  //       console.log(selectedLensCache?.getSelectedLens, '<<<<< jawnnnna;lskdjf')

  //       getPhotosShotWithLens()
  //     }
  //   }, [selectedLensCache?.getSelectedLens])

  console.log(selectedLensCache?.getSelectedLens, '<<<<<< jawn it', data)
  return (
    <div>
      <h3>Photos</h3>
    </div>
  )
}

export default PhotoCarousel
