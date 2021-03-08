import { useEffect, useState } from 'react'

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
  const num = title.match(regex)
  if (num === null) {
    throw new Error('最新の放送回が取得できませんでした')
  }
  return Number(num[1])
}

export const useRadioEpisodes = (
  first: number,
  last: number,
  tag: string,
  regex: string
): number[] => {
  const [numArray, setNumArray] = useState([] as number[])

  useEffect(() => {
    // 更新終了済みなら受け取った値をそのまま使う
    if (last !== 0) {
      setNumArray(createArray(first, last))
      return
    }

    // 取得済みなら一時キャッシュから値を取得
    if (tag in cache) {
      console.log(`[cache] max:${cache[tag]}`)
      setNumArray(createArray(first, cache[tag]))
      return
    }

    // 最新回を取得
    getLatestRadioNum(tag, regex)
      .then((max) => {
        console.log(`[get] first:${first} max:${max}`)
        cache[tag] = max
        setNumArray(createArray(first, max))
      })
      .catch((err) => console.error(err))
  }, [first, last, tag, regex])

  return numArray
}
