/** 百度统计 hm.js 内联引导片段（Starlight head + 首页 layout 共用） */
export const baiduTongjiHeadEntry = {
  tag: "script",
  content: `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5ff6c886339374fdf083fb7154643b09";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`,
}
