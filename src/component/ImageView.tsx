import React, {useMemo} from 'react'
import styled from '@emotion/native'

const imageView = (image: string) => useMemo(() => {
  return <StyledImage source={{uri: image}}/>
}, [image])

export default imageView

const StyledImage = styled.Image({
  width: 350,
  height: 450,
  resizeMode: 'contain',
})
