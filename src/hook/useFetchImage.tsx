import {useCallback} from 'react'
import {Flickr_URL} from '../assets/url/FlickrURL'

interface Media {
  m: string
}

interface Item {
  media: Media
}

interface Response {
  items: Array<Item>
}

export const useFetchImage = (setIsFetchNeeded: (value: boolean) => void, setImageArray: (value: (value2: string[]) => string[]) => void) => {
  const fetchImage = useCallback(async (): Promise<Array<string>> => {
    const response = await fetch(Flickr_URL)
    const json: Response = (await response.json()) as Response
    return json.items.map((item) => item.media.m)
  }, [])

  const pushImageArray = () => {
    void fetchImage()
      .then((tempImageArray) => {
        setImageArray((current: string[]) => {
          current.push(...tempImageArray)
          return current
        })
        setIsFetchNeeded(false)
      })
  }

  return {pushImageArray}
}
