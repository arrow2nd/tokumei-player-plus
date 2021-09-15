/**
 * 秒数からmm:ss形式の文字列を作成
 *
 * @param sec 秒数
 * @returns 時間文字列
 */
export function createTimeStr(sec: number) {
  const minStr = String(Math.floor(sec / 60)).padStart(2, '0')
  const secStr = String(Math.floor(sec % 60)).padStart(2, '0')

  return `${minStr}:${secStr}`
}
