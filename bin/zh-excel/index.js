/**
 * 抽取未翻译的词条到excel文件中
 */
const map = require('map-stream')
const path = require('path')
const vfs = require('vinyl-fs')
const XLSX = require('xlsx')

const ROOT_DIR = path.resolve('./')
const fileRules = ['**/*/lang/en.json']

const writeExcel = (arr, name = 'enJson') => {
  const sheet_data = arr.map((v) => {
    return {
      Name: v['zh'],
      Value: v['en'],
      new: '',
      desc: '',
      suggest: ''
    }
  })
  const new_sheet = XLSX.utils.json_to_sheet(sheet_data)
  // // 创新一个新的excel对象，就是workbook
  const new_workbook = XLSX.utils.book_new()
  // // 将表的内容写入workbook
  XLSX.utils.book_append_sheet(new_workbook, new_sheet, 'sheet1')
  XLSX.writeFile(new_workbook, `${name}.xlsx`)
}

function run() {
  const zhList = []
  console.log('================================>start', ROOT_DIR)
  vfs
    .src(
      fileRules.map((item) => path.resolve(ROOT_DIR, item)),
      {
        ignore: ['**/*/node_modules/**/*', 'statsvnTmp/**/*']
      }
    )
    .pipe(
      map((file, cb) => {
        console.log('处理文件 =========================>', file.path)

        let fileContent = file.contents.toString()

        fileContent = JSON.parse(fileContent)
        Object.keys(fileContent).map((zh) => {
          zhList.push({
            zh: zh,
            en: fileContent[zh]
          })
          // if (zh.match(/[\u4E00-\u9FFF]/)) {
          //   if (zh === fileContent[zh]) {
          //     // 未翻译
          //     zhList.push(zh);
          //   }
          // }
        })
        cb()
      })
    )
    .on('end', () => {
      // 使用 Map 根据 zh 属性去重
      const uniqueZhList = Array.from(
        zhList
          .reduce((acc, curr) => {
            acc.set(curr.zh, curr)
            return acc
          }, new Map())
          .values()
      )

      writeExcel(uniqueZhList)
      console.log('未翻译词条数量：', uniqueZhList.length)
      console.log('================================>end', '根目录下生成 excle 文件')
    })
}

run()
