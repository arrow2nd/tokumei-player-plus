import React, { useEffect, useState } from 'react'
import { RadioData } from './RadioData'

const cache: { [s: string]: number } = {}

type RadioEpisodesType = [
  episodeOptions: JSX.Element[],
  oldest: number,
  latest: number
]

export const useRadioEpisodes = (data: RadioData): RadioEpisodesType => {
  const [options, setOptions] = useState([] as JSX.Element[])
  const [latest, setLatest] = useState(0)

  useEffect(() => {
    const fetchLatestNumber = async () => {
      let latest: number
      try {
        latest = await getLatestRadioNum(data.tag, data.regex)
      } catch (err) {
        window.api.ErrorDialog('最新の話数が取得できませんでした', err.message)
        return
      }

      // キャッシュする
      cache[data.id] = latest
      setLatest(latest)
      setOptions(createOptions(data.oldest, latest, data.ignore))
    }

    // 更新終了済みなら受け取った値をそのまま使う
    if (data.latest !== 0) {
      setLatest(data.latest)
      setOptions(createOptions(data.oldest, data.latest, data.ignore))
      return
    }

    // 取得済みならキャッシュから値を取得
    if (data.id in cache) {
      setLatest(cache[data.id])
      setOptions(createOptions(data.oldest, cache[data.id], data.ignore))
      return
    }

    // 話数を取得
    fetchLatestNumber()
  }, [data.oldest, data.latest, data.regex, data.tag, data.ignore])

  return [options, data.oldest, latest]
}

/**
 * 話数の選択肢要素を作成
 *
 * @param oldest 最古話数
 * @param latest 最新の話数
 * @param ignoreList 除外リスト
 * @returns 話数の選択肢要素
 */
function createOptions(
  oldest: number,
  latest: number,
  ignoreList: number[]
): JSX.Element[] {
  const elementCount = latest - oldest + 1
  const numArray = [...Array(elementCount).keys()].map((i) => i + oldest)

  const options = numArray
    .filter((e) => !ignoreList.includes(e))
    .map((e) => (
      <option key={e} value={e}>
        {'# ' + String(e).padStart(3, '0')}
      </option>
    ))

  return options
}

/**
 * 最新の話数を取得
 *
 * @param tag ラジオタグ名
 * @param regex 正規表現文字列
 * @return 最新の話数
 */
async function getLatestRadioNum(tag: string, regex: string) {
  const url = `https://omocoro.jp/tag/${encodeURIComponent(tag)}`
  const res = await fetch(url).catch(() => {
    throw new Error(
      'サイトにアクセスできませんでした。ネットワークに問題がある可能性があります。'
    )
  })

  // HTMLを解析
  const html = await res.text()
  const dom = new DOMParser().parseFromString(html, 'text/html').body

  // ラジオのタイトル要素を取得
  const titleNode = dom.querySelectorAll('.title > a')
  if (!titleNode) {
    throw new Error(
      'HTMLの解析に失敗しました。書式が変更された可能性があります。'
    )
  }

  for (let i = 0; i < titleNode.length; i++) {
    const titleText = titleNode.item(i)?.textContent
    if (!titleText) continue

    // タイトル文字列から最新の話数を抽出
    const latestRadioNum = titleText.match(regex)
    if (latestRadioNum) return Number(latestRadioNum[1])
  }

  throw new Error('正規表現に一致する話数が見つかりませんでした。')
}
