import React, { useEffect, useState } from 'react'

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
): JSX.Element[] => {
  const [opts, setOpts] = useState([] as JSX.Element[])

  const createOptions = (min: number, max: number): JSX.Element[] => {
    const epOpts: JSX.Element[] = []
    for (let i = min; i <= max; i++) {
      epOpts.push(
        <option key={i} value={i}>
          {'# ' + String(i).padStart(3, '0')}
        </option>
      )
    }
    return epOpts
  }

  useEffect(() => {
    // 更新終了済みのラジオ
    if (last !== 0) {
      setOpts(createOptions(first, last))
      return
    }

    // TODO: ここでキャッシュが存在するかチェック。あればそれを返す

    // 最新回を取得
    getLatestRadioNum(tag, regex)
      .then((max) => {
        console.log(`get f:${first} m:${max}`)

        // TODO: ここで取得した最新回の数値をキャッシュ

        setOpts(createOptions(first, max))
      })
      .catch((err) => console.error(err))
  }, [first, last, tag, regex])

  return opts
}
