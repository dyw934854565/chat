function renderDishes(dishes) {
  return Array.from({ length: Math.ceil(dishes.length / 2) }).map((val, index) => {
    const items = [dishes[index * 2], dishes[index * 2 + 1]];
    return `
      <tr>
        ${items.map(item => `
          ${item ? `
            <td${item.changed ? ' class="change"' : ''}>${item.dish}<span style="float: right">${item.price}元</span></td>
          ` : '<td>&nbsp</td>'}
        `).join('')}
      </tr>
    `;
  }).join('');
}
function renderMenu(params) {
  return `
    <table class="table table-bordered">
      <tr>
        <th colspan="2">热菜</th>
      </tr>
      ${
        renderDishes(params.order.hotDishes || [])
      }
      <tr>
        <th colspan="2">凉菜</th>
      </tr>
      ${
        renderDishes(params.order.coldDishes || [])
      }
      <tr>
        <th colspan="2">汇总</th>
      </tr>
      <tr>
      <td>总价格<span style="float: right">${params.order.totalPrice}元</span></td>
      <td>人均价格<span style="float:right">${params.order.avgPrice.toFixed(2)}元</span></td>
      </tr>
    </table>
  `;
}

function renderTop() {
  return `<div class="row top-item">
            <div class="col-lg-6 order" id="order_panel">
              <ul class="order-tab nav nav-tabs">
                <li role="presentation" class="active" data-ref="detail"><a href="#">概况</a></li>
                <li role="presentation" data-ref="taste"><a href="#">口味</a></li>
                <li role="presentation" data-ref="material"><a href="#">食材</a></li>
              </ul>
              <div id="order_detail" class="order-panel" style="display: block;height: auto;">
              </div>
              <div id="order_material" class="order-panel">
              </div>
              <div id="order_taste" class="order-panel">
              </div>
            </div>
          </div>`;
}
const charts = {};
function addChart(el, name, data) {
  var option = {
    series: {
      name,
      type: 'pie',
      data,
      radius: ['50%', '70%'],
      avoidLabelOverlap: false
    }
  };
  if (!charts[el]) {
    charts[el] = echarts.init($(`#${el}`).width($('.chat').width())[0]);
  }
  charts[el].setOption(option);
}
new Chat({
  el: '.phone',
  title: '三哥驾到',
  afterRender() {
    $.post({
      url: "/dialogue/welcome",
      success: (result) => {
        this.run('onRecvMsg', result.response);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
    const chat = this;
    $(renderTop()).insertBefore(chat.body);
    function changePanel() {
      $(".order-tab li").removeClass("active");
      $(this).addClass("active");
      $(".order-panel").hide();
      $("#order_" + $(this).data("ref")).show();
      chat.run('updateBodyHeight');
    }
    $(".order-tab li").click(changePanel);
  },
  send(msg) {
    this.run('renderItem', msg, 'right')
    return $.post({
      url: "/dialogue/process",
      data: JSON.stringify({ 'sentence': msg }),
      success: (result) => {
        if (typeof result.response == "string") {
          this.run('onRecvMsg', result.response);
        } else {
          const order = result.response.order;
          this.run('onRecvMsg', "已为您生成菜单");
          $("#order_detail").html(renderMenu(result.response));
          $('.top-item').show();
          addChart('order_material', '食材', Object.entries(order.materialDistribution).map(([name, value]) => ({ name, value })))
          addChart('order_taste', '味道', Object.entries(order.tasteDistribution).map(([name, value]) => ({ name, value })))
          this.run('updateBodyHeight');
          this.run('scrollToBottom');
        }
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  },
  onRecvMsg(msg) {
    this.run('renderItem', msg, 'left');
    this.run("scrollToBottom");
  },
  updateBodyHeight() {
    this.body.style.top = $('.top-item').height() + 40 + 'px';
  }
}).init();
