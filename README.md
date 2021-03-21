### 1.配置与实战
- 如何配置和实战

### webpack.config.js配置
- externals 
CDN引入文件，减小包的大小
``` javascript
     externals: {
        jquery: 'jQuery'
    },
```
- resolveLoader [extensions|alias|modules|mainFiles|mainFields]
配置和resolve是相同的属性
- resolve [extensions|alias|modules|mainFiles|mainFields]
### 没有依赖包的优化策略
- noParse
- new webpack.IgnorePlugin 
- thread-loader [多进程打包]
### 缓存
缓存，提升构建速度
- css引入cache-loader

### 编译体积化

