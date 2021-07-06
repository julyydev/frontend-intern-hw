import {useState} from 'react'

export const imageSource = () => {
  const [imageArray, setImageArray] = useState<Array<string>>([])
  const [copyImageArray, setCopyImageArray] = useState<Array<string>>([])

  return {imageArray, setImageArray, copyImageArray, setCopyImageArray}
}
