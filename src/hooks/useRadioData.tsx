import React, { useEffect, useState } from 'react'
import { RadioInfo, RadioData } from '../types/RadioData'

const apiBaseUrl = 'https://arrow2nd.github.io/omkr-radio/'
const cache: { [s: string]: RadioData } = {}

/**
 * ラジオのリストを取得
 *
 * @returns ラジオのリスト
 */
export const fetchRadioList = async (): Promise<RadioInfo[]> => {
  const res = await fetch(apiBaseUrl + 'list.json')

  if (res.status !== 200) {
    window.api.ErrorDialog(
      '通信エラー',
      'ラジオのリストが取得できませんでした。'
    )

    return []
  }

  const json: RadioInfo[] = await res.json()
  return json
}

type RadioEpisodesType = [
  episodeOptions: JSX.Element[],
  oldest: number,
  latest: number
]

/**
 * 話数のデータを取得
 *
 * @param radioName ラジオ名
 * @returns 話数の選択要素, 最古話 ,最新話
 */
export const useRadioData = (radioName: string): RadioEpisodesType => {
  const [radioEpisodes, setRadioEpisodes] = useState([
    [],
    0,
    0
  ] as RadioEpisodesType)

  useEffect(() => {
    const func = async () => {
      const radioData = await fetchRadioData(radioName)
      const oldest = radioData.items[0].num
      const latest = radioData.items.slice(-1)[0].num
      const options = radioData.items.map((e) => (
        <option key={e.title} value={e.url}>
          {'# ' + String(e.num).padStart(3, '0')}
        </option>
      ))

      setRadioEpisodes([options, oldest, latest])
    }

    func()
  }, [radioName])

  return radioEpisodes
}

/**
 * ラジオの話数データを取得
 *
 * @param radioName ラジオ名
 * @returns RadioData
 */
async function fetchRadioData(radioName: string): Promise<RadioData> {
  const res = await fetch(`${apiBaseUrl}/data/${radioName}.json`)

  if (res.status !== 200) {
  }

  const json: RadioData = await res.json()
  return json
}
