import React, {useMemo} from 'react'
import styled from '@emotion/native';

const imageView = (imageArray: string[], index: number) => useMemo(() => {
  if (imageArray.length === 0) {
    return <></>
  }
  return <StyledImage source={{uri: imageArray[index]}} />
}, [imageArray])

export default imageView

const StyledImage = styled.Image({
  width: 350,
  height: 450,
  resizeMode: 'contain'
})
