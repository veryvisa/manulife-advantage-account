// 倒计时、二维码弹窗。没有 JS 时页面照样完整可读（截止日写在正文里）。
(function () {
  // 申请须在 10 月 30 日当天之内被宏利收到；按太平洋时间当天结束计
  var END = Date.parse('2026-10-31T00:00:00-07:00');
  var full = document.querySelectorAll('[data-countdown="full"]');
  var short = document.querySelectorAll('[data-countdown="short"]');
  function tick() {
    var ms = END - Date.now();
    if (ms <= 0) {
      full.forEach(function (el) { el.innerHTML = '<span class="cd-fallback">本轮开户促销已于 2026-10-30 截止</span>'; });
      short.forEach(function (el) { el.textContent = '· 已截止'; });
      return false;
    }
    var d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    full.forEach(function (el) {
      el.innerHTML = '<span class="u"><b>' + d + '</b><span>天</span></span><span class="u"><b>' + pad(h) + '</b><span>时</span></span><span class="u"><b>' + pad(m) + '</b><span>分</span></span><span class="u"><b>' + pad(s) + '</b><span>秒</span></span>';
    });
    short.forEach(function (el) { el.textContent = '· 还剩 ' + d + ' 天'; });
    return true;
  }
  if (tick()) setInterval(tick, 1000);

  document.querySelectorAll('[data-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dlg = document.getElementById(btn.getAttribute('data-open'));
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
      else if (dlg) location.hash = 'contact';
    });
  });
  document.querySelectorAll('dialog').forEach(function (dlg) {
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  });
})();
