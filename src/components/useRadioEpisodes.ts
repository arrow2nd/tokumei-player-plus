import { useEffect, useState } from 'react'

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

  console.log(title, num[1])

  return Number(num[1])
}

export const useRadioEpisodes = (
  first: number,
  last: number,
  tag: string,
  regex: string
): number[] => {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  useEffect(() => {
    if (last === 0) {
      // 更新中のラジオ
      getLatestRadioNum(tag, regex)
        .then((max) => {
          setMin(first)
          setMax(max)
        })
        .catch((err) => console.error(err))
    } else {
      // 更新終了済みのラジオ
      setMin(first)
      setMax(last)
    }
    console.log(first, last, tag)
  }, [first, last, tag, regex])

  return [min, max]
}
