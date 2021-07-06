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

export const useFetchImage = (isFetchNeeded: boolean, setFetchNeeded: (value: boolean) => void, setImageArray: (value: (value2: string[]) => string[]) => void) => {
  const fetchImage = useCallback(async (): Promise<Array<string>> => {
    const response = await fetch(Flickr_URL)
    const json: Response = (await response.json()) as Response
    return json.items.map((item) => item.media.m)
  }, [])

  const fetchNeeded = () => {
    if (isFetchNeeded) {
      void fetchImage()
        .then((newImageArray) => {
          setImageArray((current: string[]) => {
            current.push(...newImageArray)
            return current
          })
          setFetchNeeded(false)
        })
    }
  }

  return {fetchNeeded}
}
