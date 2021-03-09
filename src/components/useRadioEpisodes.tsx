import React, { useEffect, useState } from 'react'
import { RadioData } from './RadioData'

const cache: { [s: string]: number } = {}

type RadioEpisodesType = [
  episodeOptions: JSX.Element[],
  oldest: number,
  latest: number
]

/**
 * 指定範囲の値が入ったoption要素を作成
 *
 * @param min 最小値
 * @param max 最大値
 * @returns option要素の配列
 */
function createOptions(min: number, max: number): JSX.Element[] {
  const numArray =
    min === 0
      ? [...Array(max + 1).keys()]
      : [...Array(max).keys()].map((i) => ++i)
  return numArray.map((e) => (
    <option key={e} value={e}>
      {'# ' + String(e).padStart(3, '0')}
    </option>
  ))
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

export const useRadioEpisodes = (data: RadioData): RadioEpisodesType => {
  const [options, setOptions] = useState([] as JSX.Element[])
  const [latest, setLatest] = useState(0)

  useEffect(() => {
    const fetchLatestNumber = async () => {
      const latest = await getLatestRadioNum(data.tag, data.regex)
      cache[data.tag] = latest
      setLatest(latest)
      setOptions(createOptions(data.oldest, latest))
    }

    // 更新終了済みなら受け取った値をそのまま使う
    if (data.latest !== 0) {
      setLatest(data.latest)
      setOptions(createOptions(data.oldest, data.latest))
      return
    }

    // 取得済みなら一時キャッシュから値を取得
    if (data.tag in cache) {
      setLatest(cache[data.tag])
      setOptions(createOptions(data.oldest, cache[data.tag]))
      return
    }

    // 最新回を取得
    fetchLatestNumber()
  }, [data.oldest, data.latest, data.regex, data.tag])

  return [options, data.oldest, latest]
}
