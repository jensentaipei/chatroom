const path = require('path')
const vantTheme = path.resolve(__dirname, "./src/assets/less/vantChange.less")

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/chatroom/'
    : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 可在此编写样式变量
          // 'blue': 'red',
          // 也可以引入我们创建好的theme.less文件
          hack: `true; @import "${vantTheme}";`,
        },
        javascriptEnabled: true
      },
    },
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}