require('./index.css');
const defaultOpts = {
  headerHeight: 40,
  el: document.body,
  input: ".chat-input",
  sendBtn: ".send-btn",
  body: ".chat-content",
  placeholder: "你说，我听",
  getElement(key) {
    const el = this.run(key);
    if (typeof el === "string") {
      return document.querySelector(el);
    }
    return el;
  },
  renderHeader() {
    return this.run("title");
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
  renderItem(msg, side) {
    $(this.run("el")).find(".chat-content").append(`
      <div class="msg-item ${side}">
        <div class="msg-item-content triangle ${side}">${msg}</div>
      </div>
    `);
  },
  render(msgs) {
    this.run("getElement", "el").innerHTML = `
      <div class="chat">
        <div class="chat-header">
          ${this.run("renderHeader")}
        </div>
        <div class="chat-content">
        </div>
        <div class="chat-footer">
          ${this.run("renderFooter")}
        </div>
      <div>
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
  }
};
const plugins = {};
class Chat {
  constructor (opts = {}) {
    this.opts = opts;
  }
  registerPlugin (plugin, name) {
    if (!plugin) return false;
    if (!name && !plugin.name) return false;
    if (!name) {
      name = plugin.name;
    }
    plugins[name] = plugin;
    return true;
  }
  getPlugin (plugin) {
    if (typeof plugin === "string") {
      return plugins[plugin] || {};
    }
    return plugin || {};
  }
  config (key = '', val) {
    if (!key || typeof key != 'string') return;
    if (val !== undefined) {
      this.opts[key] = val;
      return;
    }
    const checkList = [this.opts, this.getPlugin(this.opts.plugin), defaultOpts];
    for (let i = 0; i < checkList.length; i++) {
      const item = checkList[i];
      if (item && item[key] !== undefined) {
        return item[key];
      }
    };
    return;
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
    this.run("beforeInit");
    this.run("render");
    this.run("bindEvents");
    this.run("afterRender");
  }
}


module.exports = Chat;
