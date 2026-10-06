// 活期王利息计算器：金额滑块 ＋ 天数 ＋ 你现在账户的利率。只做单利粗算示意；没有 JS 时页面上的静态算账表照样可读。
(function () {
  var root = document.querySelector('[data-calc]');
  if (!root) return;
  var amt = root.querySelector('[name=amt]'), days = root.querySelector('[name=days]'), mine = root.querySelector('[name=mine]');
  var out = root.querySelector('[data-calc-out]');
  var PROMO = 0.03, REG = 0.015, CAP = 500000;
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  function cents(n) { return '$' + n.toFixed(2); }
  function run() {
    var a = Math.max(0, Math.min(+amt.value || 0, 1000000));
    var d = Math.max(1, Math.min(+days.value || 730, 730));
    var m = Math.max(0, Math.min(parseFloat(mine.value) || 0, 20)) / 100;
    var inPromo = Math.min(a, CAP), over = a - inPromo;
    var hqw = inPromo * PROMO * d / 365 + over * REG * d / 365;
    var cur = a * m * d / 365;
    root.querySelector('[data-v=amt]').textContent = money(a);
    root.querySelector('[data-v=days]').textContent = d + ' 天';
    var max = Math.max(hqw, cur, 1);
    out.innerHTML =
      '<div class="cr"><span>放在活期王（新钱按 3.00%）</span><b>' + money(hqw) + '</b><i style="width:' + (hqw / max * 100) + '%"></i></div>' +
      '<div class="cr cr-muted"><span>放在你现在的账户（' + (m * 100).toFixed(2) + '%）</span><b>' + money(cur) + '</b><i style="width:' + (cur / max * 100) + '%"></i></div>' +
      '<p class="cr-diff">差别约 <b>' + money(hqw - cur) + '</b>，相当于每天 <b>' + cents((hqw - cur) / d) + '</b>' +
      (over > 0 ? '。超过 $500,000 的部分按常规利率粗算。' : '。') + '</p>';
  }
  [amt, days, mine].forEach(function (el) { el.addEventListener('input', run); });
  run();
})();
