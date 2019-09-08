import { generateDescription } from '~/utils/format'

describe(generateDescription, () => {
  const str = `<p>hogehoge</p>
<p>fugafuga</p>
<p>nuxt</p>
<p>text</p>`
  test('タグを削除した文字列の一行目だけ返す', () => {
    expect(generateDescription(str)).toBe('hogehoge')
  })
  test('第2引数文の行数を返す', () => {
    expect(generateDescription(str, 3)).toBe('hogehogefugafuganuxt')
  })
})
