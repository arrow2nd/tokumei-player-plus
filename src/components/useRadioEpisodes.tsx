import React, { useEffect, useState } from 'react'
import { RadioData } from './RadioData'

const cache: { [s: string]: number } = {}

type RadioEpisodesType = [
  episodeOptions: JSX.Element[],
  oldest: number,
  latest: number
]

/**
 * 放送回の選択肢要素を作成
 *
 * @param min 最小値
 * @param max 最大値
 * @param ignore 除外リスト
 * @returns 放送回の選択肢要素
 */
function createOptions(
  min: number,
  max: number,
  ignore: number[]
): JSX.Element[] {
  const numArray =
    min === 0
      ? [...Array(max + 1).keys()]
      : [...Array(max).keys()].map((i) => ++i)

  const options = numArray
    .filter((e) => !ignore.includes(e))
    .map((e) => (
      <option key={e} value={e}>
        {'# ' + String(e).padStart(3, '0')}
      </option>
    ))

  return options
}

/**
 * 最新回を取得
 *
 * @param tag ラジオタグ名
 * @param regex 正規表現文字列
 * @return 最新回の番号
 */
async function getLatestRadioNum(tag: string, regex: string) {
  const url = `https://omocoro.jp/tag/${encodeURIComponent(tag)}`
  const res = await fetch(url).catch(() => {
    throw new Error('最新回が取得できませんでした')
  })

  // 解析
  const html = await res.text()
  const dom = new DOMParser().parseFromString(html, 'text/html').body
  const title = dom.querySelector('.title > a')?.textContent
  if (!title) {
    throw new Error('HTMLの解析に失敗しました')
  }

  // 最新回抽出
  const latest = title.match(regex)
  if (latest === null) {
    throw new Error('最新回が取得できませんでした')
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
      setOptions(createOptions(data.oldest, latest, data.ignore))
    }

    // 更新終了済みなら受け取った値をそのまま使う
    if (data.latest !== 0) {
      setLatest(data.latest)
      setOptions(createOptions(data.oldest, data.latest, data.ignore))
      return
    }

    // 取得済みなら一時キャッシュから値を取得
    if (data.tag in cache) {
      setLatest(cache[data.tag])
      setOptions(createOptions(data.oldest, cache[data.tag], data.ignore))
      return
    }

    // 最新回を取得
    fetchLatestNumber()
  }, [data.oldest, data.latest, data.regex, data.tag, data.ignore])

  return [options, data.oldest, latest]
}
