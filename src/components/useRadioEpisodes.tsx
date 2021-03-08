import { useEffect, useState } from 'react'
import { RadioData } from './RadioData'

const cache: { [s: string]: number } = {}

/**
 * 最小値～最大値が格納された配列を作成
 *
 * @param min 最小値
 * @param max 最大値
 * @returns 数値配列
 */
function createArray(min: number, max: number): number[] {
  return min === 0
    ? [...Array(max + 1).keys()]
    : [...Array(max).keys()].map((i) => ++i)
}

/**
 * 最新回の番号を取得
 *
 * @param tag ラジオタグ名
 * @param regex 正規表現文字列
 * @return 最新回の番号
 */
async function getLatestRadioNum(tag: string, regex: string) {
  const url = `https://omocoro.jp/tag/${encodeURIComponent(tag)}`
  const res = await fetch(url).catch(() => {
    throw new Error('最新の放送回が取得できませんでした')
  })

  // 解析
  const html = await res.text()
  const dom = new DOMParser().parseFromString(html, 'text/html').body
  const title = dom.querySelector('.title > a')?.textContent
  if (!title) {
    throw new Error('htmlが解析できませんでした')
  }

  // 放送回
  const latest = title.match(regex)
  if (latest === null) {
    throw new Error('最新の放送回が取得できませんでした')
  }
  return Number(latest[1])
}

export const useRadioEpisodes = (
  data: RadioData
): [number[], number, number] => {
  const [numArray, setNumArray] = useState([] as number[])
  const [latest, setMax] = useState(0)

  useEffect(() => {
    const fetchLatestNumber = async () => {
      const latest = await getLatestRadioNum(data.tag, data.regex)
      cache[data.tag] = latest
      setMax(latest)
      setNumArray(createArray(data.oldest, latest))
    }

    // 更新終了済みなら受け取った値をそのまま使う
    if (data.latest !== 0) {
      setNumArray(createArray(data.oldest, data.latest))
      return
    }

    // 取得済みなら一時キャッシュから値を取得
    if (data.tag in cache) {
      setMax(cache[data.tag])
      setNumArray(createArray(data.oldest, cache[data.tag]))
      return
    }

    // 最新回を取得
    fetchLatestNumber()
  }, [data.oldest, data.latest, data.regex, data.tag])

  return [numArray, data.oldest, latest]
}
