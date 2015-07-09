(function(doc) {
  'use strict';

  /* jshint esnext:true */

  const reRefs = /\[(.+?)\]: (.+)/g;
  const reSemantics = /__(.+?)__|(#{1,3}) (.+)|\[([^\[]+?)\]/g;

  const sheet = doc.head.appendChild(
    doc.createElement('style')).sheet;

  sheet.insertRule(
    '*{white-space:pre;font-family:monospace;font-size:1rem;}', 0);
  sheet.insertRule(
    'img{width:36rem;}', 0);
  sheet.insertRule(
    'h1,h2,h3{margin:0 0 -1rem;}', 0);

  const refs = {};

  function extractRefs(match, title, url) {
    refs[title] = url;
    return '';
  }

  function parse(match, em, hPrefix, hTitle, aRef) {
    if (em) return `<em>${em}</em>`;
    if (hPrefix) return `<h${hPrefix.length}>${hTitle}</h${hPrefix.length}>`;
    if (refs[aRef]) return `<a href="${refs[aRef]}">${aRef}</a>`;
    return match;
  }

  doc.body.innerHTML = doc.body.innerHTML.replace(
    reRefs, extractRefs).replace(
    reSemantics, parse);

})(document);
