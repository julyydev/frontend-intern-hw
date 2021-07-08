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

export const fetchImage = async (): Promise<Array<string>> => {
  const response = await fetch(Flickr_URL)
  const json: Response = (await response.json()) as Response
  return json.items.map((item) => item.media.m)
}
