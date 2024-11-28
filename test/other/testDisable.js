// const reg = /\/\/.*auto-i18n-zh-check-disable-line.*$/
const reg = /\/\/(\s*|.*\s+)auto-i18n-zh-check-disable-line(\s*$|\s+.*)/

// console.log(reg.test('aaa// auto-i18n-zh-check-disable-line fd'))
// console.log(reg.test('dd // fd auto-i18n-zh-check-disable-line fdf'))
// console.log(reg.test('// fd auto-i18n-zh-check-disable-line fdf'))
// console.log(reg.test('// fd auto-i18n-zh-check-disable-line fd'))
// console.log(reg.test('// fd auto-i18n-zh-check-disable-line fdf'))
// console.log(reg.test('//auto-i18n-zh-check-disable-line )auto-i18n-zh-check-disable-line'))
// console.log(reg.test('// auto-i18n-zh-check-disable-line )auto-i18n-zh-check-disable-line'))
// console.log(reg.test('// auto-i18n-zh-check-disable-line'))

// console.log(reg.test('//3ve-i18n-zh-check-disable-line111'))
// console.log(reg.test('//auto-i18n-zh-check-disable-line3'))
// console.log(reg.test('//22auto-i18n-zh-check-disable-line111'))

var str = `
3123
fsfsffsd // auto-i18n-zh-check-disable-line fd
3123
当前行被禁用 321// auto-i18n-zh-check-disable-line fd
afsdafsadf

// auto-i18n-zh-check-disable-next-line
fdsf
sdddddd
fsf // auto-i18n-zh-check-disable-next-line 23123
这一行被禁用
fdsaf
fdsf
*

/* auto-i18n-zh-check-disable */13123

alert('这里被禁用)

/* auto-i18n-zh-check-enable */

/* auto-i18n-zh-check-disable */13123

alert('这里被禁用2324)

/* auto-i18n-zh-check-enable */


/* auto-i18n-zh-check-disable */

alert('这里被禁用2324)
`

var strOrigin = str

const disableTextArr = []

var disableRules = [
  // 单行禁用，使用：在当前行添加 // auto-i18n-zh-check-disable-line
  /(.*\/\/(?:[^\S\r\n]*|.*[^\S\r\n]+)auto-i18n-zh-check-disable-line(?:[^\S\r\n]*|[^\S\r\n]+.*))/g,
  // 下一行禁用，使用：在上一行添加 // auto-i18n-zh-check-disable-next-line
  /\/\/(?:[^\S\r\n]*|.*[^\S\r\n]+)auto-i18n-zh-check-disable-next-line(?:[^\S\r\n]*|[^\S\r\n]+.*)\n(.+)/g,
  // 代码块禁用，使用：在需要的地方包括
  /\/\*\s*auto-i18n-zh-check-disable\s*\*\/([\s\S]*?)(?:(?:\/\*\s*auto-i18n-zh-check-enable\s*\*\/)|$)/g
]

function replaceWithPlaceholderByRule(str, rule) {
  str = str.replace(rule, function (match, key, index) {
    const count = disableTextArr.length
    disableTextArr.push(key)
    return match.replace(key, `@@@@@@disableText_${count}@@@@@@`)
  })
  return str
}

function replaceWithPlaceholder(str, disableRules) {
  for (let i = 0; i < disableRules.length; i++) {
    str = replaceWithPlaceholderByRule(str, disableRules[i])
  }
  return str
}

function placeholderRestore(str) {
  str = str.replace(/(@@@@@@disableText_(\d+)@@@@@@)/g, function (match, key, key2, index) {
    return disableTextArr[key2]
  })
  return str
}

console.log(replaceWithPlaceholder(strOrigin, disableRules))

strTest = placeholderRestore(replaceWithPlaceholder(strOrigin, disableRules))

console.log(strOrigin === strTest)
