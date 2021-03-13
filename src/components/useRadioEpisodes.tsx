import React, { useEffect, useState } from 'react'
import data from '../data/radio-data'
import { RadioData } from './RadioData'

const cache: { [s: string]: number } = {}

type RadioEpisodesType = [
  episodeOptions: JSX.Element[],
  oldest: number,
  latest: number
]

/**
 * 話数の選択肢要素を作成
 *
 * @param min 最小値
 * @param max 最大値
 * @param ignore 除外リスト
 * @param isWithoutChangeShow 値をそのまま表示するか（falseなら話数を１から表示）
 * @returns 話数の選択肢要素
 */
function createOptions(
  min: number,
  max: number,
  ignore: number[],
  isWithoutChangeShow: boolean
): JSX.Element[] {
  const elementCount = min <= 1 ? max : max - min + 1
  const numArray =
    min === 0
      ? [...Array(elementCount + 1).keys()]
      : [...Array(elementCount).keys()].map((i) => i + min)

  const options = numArray
    .filter((e) => !ignore.includes(e))
    .map((e) => (
      <option key={e} value={e}>
        {'# ' + String(isWithoutChangeShow ? e : e - min + 1).padStart(3, '0')}
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

  // 解析
  const html = await res.text()
  const dom = new DOMParser().parseFromString(html, 'text/html').body
  const title = dom.querySelector('.title > a')?.textContent
  if (!title) {
    throw new Error(
      'HTMLの解析に失敗しました。書式が変更された可能性があります。'
    )
  }

  // 最新回抽出
  const latest = title.match(regex)
  if (latest === null) {
    throw new Error(
      '話数の抽出に失敗しました。書式が変更された可能性があります。'
    )
  }

  return Number(latest[1])
}

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

      // 話数とファイル名のズレを修正
      if (data.tag === 'ラジオ漫画犬') {
        latest += data.oldest - 1
      }

      // キャッシュする
      cache[data.id] = latest
      setLatest(latest)
      setOptions(
        createOptions(
          data.oldest,
          latest,
          data.ignore,
          data.isWithoutChangeShow
        )
      )
    }

    // 更新終了済みなら受け取った値をそのまま使う
    if (data.latest !== 0) {
      setLatest(data.latest)
      setOptions(
        createOptions(
          data.oldest,
          data.latest,
          data.ignore,
          data.isWithoutChangeShow
        )
      )
      return
    }

    // 取得済みなら一時キャッシュから値を取得
    if (data.id in cache) {
      setLatest(cache[data.id])
      setOptions(
        createOptions(
          data.oldest,
          cache[data.id],
          data.ignore,
          data.isWithoutChangeShow
        )
      )
      return
    }

    // 話数を取得
    fetchLatestNumber()
  }, [data.oldest, data.latest, data.regex, data.tag, data.ignore])

  return [options, data.oldest, latest]
}
