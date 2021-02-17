import React from 'react'

const Select = (): JSX.Element => {
  return (
    <div className="Select">
      <select name="ラジオ名">
        <option value="tokumei">匿名ラジオ</option>
        <option value="itm">長島・加藤のイうてるマにイっちゃってる</option>
        <option value="arispa">ありっちゃありスパーク</option>
        <option value="mongol">ラジオ・モンゴルナイトフィーバー</option>
        <option value="kamamicu">かまってみくのしんLove you</option>
        <option value="kayouradio">マンスーン・ヤスミノの音声放送</option>
        <option value="maninu">ラジオ漫画犬血道編</option>
      </select>
      #
      <input type="number" value="1" placeholder="1" min="1" max="999" />
    </div>
  )
}

export default Select
