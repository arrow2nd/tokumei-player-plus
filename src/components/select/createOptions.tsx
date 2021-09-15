import React from 'react'
import { RadioInfo } from '../../types/RadioData'

/**
 * 選択要素を作成
 *
 * @param list ラジオリスト
 * @returns 更新中・更新終了したラジオの選択要素
 */
export function createOptions(
  list: RadioInfo[]
): [JSX.Element[], JSX.Element[]] {
  const options = (items: RadioInfo[]) =>
    items.map(({ name }) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))

  return [
    options(list.filter((e) => e.onAir === true)),
    options(list.filter((e) => e.onAir === false))
  ]
}
