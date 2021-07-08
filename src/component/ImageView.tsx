import React, {useMemo} from 'react'
import styled from '@emotion/native'

const imageView = (imageSource: string) => useMemo(() => {
  return <StyledImage source={{uri: imageSource}}/>
}, [imageSource])

export default imageView

const StyledImage = styled.Image({
  width: 350,
  height: 450,
  resizeMode: 'contain',
})
