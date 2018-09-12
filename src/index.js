require('./index.flex.css');
const escape = require("html-escape");
const defaultOpts = {
  el: document.body,
  input: ".chat-input",
  sendBtn: ".send-btn",
  body: ".chat-content",
  placeholder: "你说，我听",
  getElement(elKey) {
    const el = this.run(elKey);
    if (typeof el === "string") {
      return document.querySelector(el);
    }
    return el;
  },
  renderHeader() {
    return `<h1 class="chat-title">${this.run("title")}</h1>`;
  },
  renderFooter() {
    return `
      <table>
        <tr>
          <td style="width: 100%;"><input class="chat-input" placeholder="${this.run(
            "placeholder"
          )}" autocomplete="off" autofocus="on"></input></td>
          <td><button class="send-btn">发送</button></td>
        </tr>
      </table>
    `;
  },
  onRecvMsg(msg) {
    this.run("renderItem", msg, "left");
    this.run("scrollToBottom");
  },
  makeItemHtml(msg, side) {
    return `
        <div class="msg-item-content triangle ${side}">${msg.html || this.escape(msg)}</div>
    `;
  },
  renderItem(msg, side) {
    const msgEl = document.createElement("div");
    msgEl.className = `msg-item ${side}`;
    msgEl.innerHTML = this.run('makeItemHtml', msg, side);
    this.body.appendChild(msgEl);
  },
  render(msgs) {
    this.run("getElement", "el").innerHTML = `
      <div class="chat">
        <div class="chat-header">
          ${this.run("renderHeader")}
        </div>
        <div class="chat-header-plugin"></div>
        <div class="chat-content">
        </div>
        <div class="chat-footer-plugin"></div>
        <div class="chat-footer">
          ${this.run("renderFooter")}
        </div>
        <div class="chat-plugins"></div>
      </div>
    `;
  },
  addEventListener(el, name, fn) {
    el.addEventListener(name, fn, false);
  },
  bindEvents() {
    const sendBtn = (this.sendBtn = this.run("getElement", "sendBtn"));
    const input = (this.input = this.run("getElement", "input"));
    const body = (this.body = this.run("getElement", "body"));
    const send = () => {
      const val = input.value;
      if (val) {
        this.run("send", val);
        input.value = "";
        this.run("scrollToBottom", body);
      }
    };
    this.run("addEventListener", sendBtn, "click", send);
    this.run("addEventListener", input, "focus", () => {
      this.run("scrollToBottom", body);
    });
    this.run("addEventListener", input, "keyup", e => {
      if (e.code === "Enter" || e.key === "Enter" || e.keyCode === 13) {
        send();
      }
    });
  },
  scrollToBottom(el) {
    const body = el || this.body;
    body.scrollTop = body.scrollHeight;
  },
};
class Chat {
  constructor (opts = {}) {
    this.opts = Object.assign({}, defaultOpts, opts);
  }
  config (key = '', val) {
    if (!key || typeof key != 'string') return;
    if (val !== undefined) {
      this.opts[key] = val;
      return;
    }
    return this.opts[key];
  }
  run (key, ...rest) {
    if (typeof key === "function") {
      return key.call(this, ...rest);
    }
    const fn = this.config(key);
    if (typeof fn === "function") {
      return fn.call(this, ...rest);
    }
    return fn;
  }
  init () {
    this.run("beforeRender");
    this.run("render");
    this.run("bindEvents");
    this.run("afterRender");
    return this;
  }
  escape (str) {
    return escape.call(null, str);
  }
}
module.exports = Chat;
