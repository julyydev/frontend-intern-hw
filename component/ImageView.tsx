import React, {useMemo} from 'react'
import styled from '@emotion/native';

const imageView = (imageArray: string[], index: number) => useMemo(() => {
  if (imageArray.length === 0) {
    console.log('error')
    return <></>
  }
  console.log(`imageView: ${index}, url: ${imageArray[index]}`)
  console.log(`image length: ${imageArray.length}`)
  return <StyledImage source={{uri: imageArray[index]}} />
}, [imageArray])

export default imageView

const StyledImage = styled.Image({
  width: 350,
  height: 450,
  resizeMode: 'contain'
})
