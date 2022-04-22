# 语林 RainForest

一个技术博客分享平台

## 安装

```bash
git clone git@github.com:2022-Soft-Group/rainforest.git
cd rainforest
npm i # 安装依赖
npm run dev # 运行开发环境
```

## Vscode 开发插件

> "coenraads.bracket-pair-colorizer-2",

    	"naumovs.color-highlight",
    	"pranaygp.vscode-css-peek",
    	"mikestead.dotenv",
    	"editorconfig.editorconfig",
    	"mhutchie.git-graph",
    	"eamodio.gitlens",
    	"afzalsayed96.icones",
    	"antfu.iconify",
    	"kisstkondoros.vscode-gutter-preview",
    	"pkief.material-icon-theme",
    	"zhuangtongfa.material-theme",
    	"jimdong.naive-ui-snippets",
    	"christian-kohler.path-intellisense",
    	"esbenp.prettier-vscode",
    	"johnsoncodehk.volar",
    	"johnsoncodehk.vscode-typescript-vue-plugin",
    	"sdras.vue-vscode-snippets",
    	"dariofuzinato.vue-peek",
    	"voorjaar.windicss-intellisense"

全部都已经配置好在`.vscode/extensions.json`里面，弹出推荐安装全部安装即可。

Volar 推荐开启 Take Over Mode 去替换 Vscode 原生的 TypeScript and JavaScript Language Features, 开启方法见https://github.com/johnsoncodehk/volar/discussions/471

## Markdown 插件

markdown 的渲染使用第三方库 markdown-it-vue，本项目使用 Zian502 开发的 markdown-it-vue 的 vue3.0 分支。本地依赖安装方法如下：

```bash
npm install git@github.com:Zian502/markdown-it-vue.git
```

然后再本地克隆项目仓库

```bash
git clone git@github.com:Zian502/markdown-it-vue.git
cd markdown-it-vue
npm install
npm run build
```

然后将编译好的 dist 文件夹全部复制到本项目 node_modules 的 markdown-it-vue 下即可使用
