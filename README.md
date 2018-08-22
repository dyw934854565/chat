## Chat
不依赖jquery，极简单的方式创建一个聊天界面

# how to use

by npm

```
const Chat = import('chat-box-js');

new Chat({
  el: '.phone',  // 挂载的dom， 聊天界面渲染在这个dom上，宽高都是100%
  title: '聊天',
  beforeRender() {
    // dom创建之前，可以去localstorage或者远程拿历史消息
  },
  afterRender() {
    this.run('onRecvMsg', '你好， 很高兴认识你'); // dom添加之后调用，可以渲染历史消息，或者欢迎语
  },
  send(msg) {
    this.run('renderItem', msg, 'right');  // 把自己说的话添加至dom
    // send msg  可以通过ajax或者websocket发送文案

    this.run('onRecvMsg', '机器人自动回复：' + Math.random().toFixed(2) * 100);  // 添加一条回复至dom
  },
}).init();

```

# 查看demo

```
npm run server
```
访问http://localhost:3000/demo

# script  暂时没有cdn，可以下载下来

```
<script src="index.min.js"></script>  // 引入index.min.js
<script>
new Chat({
/*
  options
*/
})
</script>
```

