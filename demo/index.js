new Chat({
  el: '.phone',
  title: '聊天',
  afterRender() {
    this.run('onRecvMsg', '你好， 很高兴认识你');
  },
  send(msg) {
    this.run('renderItem', msg, 'right');
    // send msg
    this.run('onRecvMsg', '机器人自动回复：' + Math.random().toFixed(2) * 100);
  },
}).init();
