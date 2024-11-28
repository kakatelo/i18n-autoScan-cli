// vve-i18n-cli.config.js
module.exports = {
  // 工作目录
  cwd: '.',

  // 默认所有模块，如果有传module参数，就只处理某个模块
  // '**/module-**/**/index.js'
  moduleIndexRules: ['.'],
  // 忽略模块
  ignoreModuleIndexRules: [],
  // 匹配含有国际化文本的文件规则
  i18nFileRules: ['**/*.+(vue|js)'],
  // 不匹配含有国际化文本的文件规则
  ignoreI18nFileRules: [],
  // 国际化文本的正则表达式，正则中第一个捕获对象当做国际化文本
  i18nTextRules: [/(?:[\$.])T\([\s\n]*['"](.+?)['"]/g],
  // 模块的国际化的json文件需要被保留下的key，即使这些组件在项目中没有被引用
  // 规则可以是一个字符串，正则，或者是函数
  keepKeyRules: [
    /^G\/+/ // G/开头的会被保留
  ],
  // 忽略国际化KEY的规则
  // 规则可以是一个字符串，正则，或者是函数
  ignoreKeyRules: [],
  // 生成的国际化资源包的输出目录
  outDir: 'lang',
  // 生成的国际化的语言
  i18nLanguages: [
    'zh' // 中文
    // "en" // 英文
  ],
  // 配置文件的路径，没有配置，默认路径是在${cwd}/vve-i18n-cli.config.js
  config: undefined,
  // 是否取配置文件
  disableConfigFile: false,
  // 是否翻译
  translate: false,
  // 翻译的基础语言，默认是用中文翻译
  translateFromLang: 'zh',
  // 是否强制翻译，即已翻译修改的内容，也重新用翻译生成
  forceTranslate: false,
  // 翻译的语言
  translateLanguage: ['zh', 'en'],
  // 非中文使用拼音来来翻译
  translateUsePinYin: false,
  // 模块下${outDir}/index.js文件不存在才拷贝index.js
  copyIndex: false,
  // 是否强制拷贝最新index.js
  forceCopyIndex: false,
  // 根目录，国际文本所在的根目录
  rootDir: 'base/pages/pages/project/operationlog',

  // 国际化文本包裹相关
  zhWrap: {
    cwd: '.',
    // 根目录，国际文本所在的根目录
    rootDir: 'base/pages/pages/project/operationlog',
    ignoreI18nFileRules: [],
    i18nFileRules: ['!(node_modules|config|statsvnTmp)/**/*.+(js|vue)'],
    ignorePreReg: [/T\s*\([\s\n]*$/, /Tl\s*\([\s\n]*$/, /i18n\s*\([\s\n]*$/, /console\.(?:log|error|warn|info|debug)\s*\(\s*$/, /\/\/\s*$/, new RegExp('//.+'), new RegExp('i18n-disabled.+')],
    ignoreText: ["^[\\u4e00-\\u9fa5a-zA-Z0-9“._=,':;*#！”-]+$", /T\(/, /Tl\(/],
    // js相关文件需要引入的国际化文件
    i18nImportForJs: '',
    // js相关文件需要使用国际化方法
    jsI18nFuncName: '$T',
    // vue相关文件需要使用的国际化方法
    vueI18nFuncName: '$T',
    isWrapByI18n: ''
  },
  zhCheck: {
    cwd: '.',
    // 根目录，国际文本所在的根目录
    rootDir: '.',
    ignoreI18nFileRules: [],
    i18nFileRules: ['!(node_modules|config|statsvnTmp|public|projects)/**/*.+(vue)'],
    // 反引号中需要忽略的文本规则，可以是正则或者字符串
    ignoreTextInQuoteRules: [/t\(/]
  }
}
