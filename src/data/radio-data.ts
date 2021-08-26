import { RadioData } from '../components/RadioData'

const data: RadioData[] = [
  // --- 更新中 ---
  {
    id: 'arispa',
    name: 'ありっちゃありスパーク・マシュ',
    tag: 'ありっちゃありスパーク',
    regex: 'ありっちゃありスパーク・マシュ(\\d+)',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'arimasyu/[num_0]/[num_0]mas.mp3',
    oldest: 1,
    latest: 0,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'tokumei',
    name: 'ARuFa・恐山の匿名ラジオ',
    tag: '匿名ラジオ',
    regex: '【(\\d+)】',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'tokumei/[num_0].mp3',
    oldest: 1,
    latest: 0,
    ignore: [217, 268],
    replace: [
      {
        before: 263,
        after: '26a3'
      },
      {
        before: 264,
        after: '264non'
      },
      {
        before: 265,
        after: '2y65'
      },
      {
        before: 266,
        after: '26m6o'
      },
      {
        before: 267,
        after: '267u'
      },
      {
        before: 269,
        after: '269sr'
      }
    ],
    isContinuation: false
  },
  {
    id: 'kamamicu-ks',
    name: '作業用かまみく',
    tag: 'かまってみくのしん',
    regex: '【(\\d+)】',
    numData: [
      {
        start: 1,
        padNum: 0
      }
    ],
    url: 'kamamicu/ks[num_0]/ks[num_0].mp3',
    oldest: 1,
    latest: 0,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'itm',
    name: '長島・加藤のイうてるマにイっちゃってる',
    tag: 'イうてるマにイっちゃってる',
    regex: '【(\\d+)】',
    numData: [
      {
        start: 1,
        padNum: 3
      },
      {
        start: 1,
        padNum: 2
      }
    ],
    url: 'itm/[num_0]/itm_[num_1].mp3',
    oldest: 1,
    latest: 0,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'kayouradio',
    name: 'マンスーン・ヤスミノの音声放送',
    tag: '音声放送',
    regex: '【(\\d+)】',
    numData: [
      {
        start: 0,
        padNum: 3
      }
    ],
    url: 'kayouradio/[num_0]/[num_0].mp3',
    oldest: 0,
    latest: 0,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'soldier',
    name: '鎧坂・のぎへっぺんのソルジャーラジオ',
    tag: 'ソルジャーラジオ',
    regex: '【(\\d+)】',
    numData: [
      {
        start: 1,
        padNum: 3
      },
      {
        start: 0,
        padNum: 2
      }
    ],
    url: 'yoropen/soldier/[num_0]/soldier[num_1].mp3',
    oldest: 0,
    latest: 0,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'maninu-4',
    name: 'ラジオ漫画犬 咆哮編',
    tag: 'ラジオ漫画犬',
    regex: 'ラジオ漫画犬咆哮編(\\d+)',
    numData: [
      {
        start: 168,
        padNum: 3
      }
    ],
    url: 'maninu/[num_0]/[num_0].mp3',
    oldest: 0,
    latest: 0,
    ignore: [],
    replace: [],
    isContinuation: false
  },

  // --- 更新終了 ---
  {
    id: 'ariari',
    name: 'ありっちゃありアワー',
    tag: 'ありっちゃありアワー',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'ariari/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 158,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'arispa',
    name: 'ありっちゃありスパーク',
    tag: 'ありっちゃありスパーク',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'arispa/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 101,
    ignore: [],
    replace: [
      {
        before: 100,
        after: '0995'
      },
      {
        before: 101,
        after: '100'
      }
    ],
    isContinuation: false
  },
  {
    id: 'kgb',
    name: '加藤・ギャラクシーのラジオKGB',
    tag: 'KGB',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'kgb/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 56,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'kamamicu',
    name: 'かまってみくのしんLove you',
    tag: 'かまってみくのしん',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 0
      }
    ],
    url: 'kamamicu/l[num_0]/l[num_0].mp3',
    oldest: 1,
    latest: 52,
    ignore: [],
    replace: [
      {
        before: 52,
        after: '972000'
      }
    ],
    isContinuation: false
  },
  {
    id: 'shimowata-1',
    name: 'シモダテツヤと私（地獄のミサワ）',
    tag: 'シモダテツヤと私（地獄のミサワ）',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'shimowata/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 32,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'shimowata-2',
    name: 'シモダテツヤと私（ヨッピー）',
    tag: 'シモダテツヤと私（ヨッピー）',
    regex: '',
    numData: [
      {
        start: 33,
        padNum: 3
      }
    ],
    url: 'shimowata/[num_0]/[num_0].mp3',
    oldest: 33,
    latest: 58,
    ignore: [],
    replace: [],
    isContinuation: true
  },
  {
    id: 'zannen',
    name: 'シモダ＆イーグルの残念ラジオ',
    tag: '残念ラジオ',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'zannen/[num_0]/zannen[num_0].mp3',
    oldest: 1,
    latest: 4,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'sebu-nagata-1',
    name: 'セブ山・永田の金曜ラジオ【1~104】',
    tag: '金曜ラジオ',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 0
      }
    ],
    url: 'sebu-nagata/[num_0]kaime.mp3',
    oldest: 1,
    latest: 104,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'sebu-nagata-2',
    name: 'セブ山・永田の金曜ラジオ【105~250】',
    tag: '金曜ラジオ',
    regex: '',
    numData: [
      {
        start: 105,
        padNum: 0
      }
    ],
    url: 'sebu-nagata/[num_0]kaime/[num_0]kaime.mp3',
    oldest: 105,
    latest: 250,
    ignore: [],
    replace: [],
    isContinuation: true
  },
  {
    id: 'soujanee',
    name: 'そうじゃねえだろのラジオじゃねえだろ！',
    tag: 'ラジオじゃねえだろ',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 4
      }
    ],
    url: 'soujanee/[num_0]/soujanee.mp3',
    oldest: 1,
    latest: 100,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'pakupaku-1',
    name: 'たかや・マンスーンのパクパクラジオ【1~32】',
    tag: 'パクパクラジオ',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'pakupaku/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 32,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'pakupaku-2',
    name: 'たかや・マンスーンのパクパクラジオ【33~49】',
    tag: 'パクパクラジオ',
    regex: '',
    numData: [
      {
        start: 33,
        padNum: 3
      }
    ],
    url: 'pakupaku/[num_0]/pak[num_0].mp3',
    oldest: 33,
    latest: 49,
    ignore: [],
    replace: [],
    isContinuation: true
  },
  {
    id: 'maninu-1',
    name: '凸ノ・カメントツのラジオ漫画犬',
    tag: 'ラジオ漫画犬',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'maninu/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 31,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'dainaka',
    name: 'みくのしん・おおきちの大仲良しラジオ',
    tag: '大仲良しラジオ',
    regex: '',
    numData: [
      {
        start: 1,
        padNum: 3
      }
    ],
    url: 'dainaka/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 31,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'maninu-2',
    name: 'ラジオ漫画犬 漂流編',
    tag: 'ラジオ漫画犬',
    regex: '',
    numData: [
      {
        start: 32,
        padNum: 3
      }
    ],
    url: 'maninu/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 70,
    ignore: [],
    replace: [],
    isContinuation: false
  },
  {
    id: 'maninu-3',
    name: 'ラジオ漫画犬 血道編',
    tag: 'ラジオ漫画犬',
    regex: '',
    numData: [
      {
        start: 102,
        padNum: 3
      }
    ],
    url: 'maninu/[num_0]/[num_0].mp3',
    oldest: 1,
    latest: 66,
    ignore: [],
    replace: [],
    isContinuation: false
  }
]

export default data
