(this.webpackJsonpgiphy=this.webpackJsonpgiphy||[]).push([[0],{21:function(e,t,n){},23:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),a=n.n(r),i=n(14),u=n.n(i),o=(n(21),n(2)),s=n.n(o),h=n(3),l=n(8),p=(n(23),n(4)),f=n.n(p),j=n(15),d=console;function b(){return Object(c.jsxs)("form",{class:"form",children:[Object(c.jsxs)("div",{children:[Object(c.jsxs)("label",{for:"giphyKey",children:["Giphy Key (",Object(c.jsx)("a",{href:"https://developers.giphy.com/dashboard/?create=true",children:"Create one"}),")"]}),Object(c.jsx)("input",{type:"text",name:"giphyKey",placeholder:"Paste Giphy App Key"})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{for:"twitchChannel",children:"Twitch Channel"}),Object(c.jsx)("input",{type:"text",name:"twitchChannel",placeholder:"Twitch Channel"})]}),Object(c.jsx)("div",{children:Object(c.jsx)("input",{type:"submit",value:"submit"})})]})}function O(e){var t=e.giphyKey,n=e.twitchChannel,a=Object(r.useMemo)((function(){return new j.GiphyFetch(t)}),[t]),i=Object(r.useState)(null),u=Object(l.a)(i,2),o=u[0],p=u[1];return Object(r.useEffect)((function(){return f.a.onCommand=function(){var e=Object(h.a)(s.a.mark((function e(t,n,c,r,i){var u,o,h,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("g"!==n){e.next=10;break}return u=c,d.info("Searching for ".concat(u)),e.next=5,a.random({tag:u,rating:"pg-13"});case 5:o=e.sent,h=o.data,d.info("Found",h),l=h.image_mp4_url,p(l);case 10:case"end":return e.stop()}}),e)})));return function(t,n,c,r,a){return e.apply(this,arguments)}}(),f.a.Init(n),function(){f.a.Disconnect()}}),[a,n]),Object(c.jsx)(x,{url:o})}function x(e){var t=e.url,n=Object(r.useRef)(null);return Object(r.useEffect)((function(){n.current&&t&&Object(h.a)(s.a.mark((function e(){var c,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.current.src=t,e.next=3,n.current.load();case 3:n.current.play(),c=function(){},5e3,r=(new Date).getTime(),c=function(e){(new Date).getTime()-r<=5e3?(d.info("Duration not reached looping"),n.current.play()):(d.info("Duration reached ending"),n.current.src=null,n.current.removeEventListener("ended",c))},n.current.addEventListener("ended",c);case 9:case"end":return e.stop()}}),e)})))()}),[n,t]),Object(c.jsx)("video",{ref:n})}var g=function(){var e=new URLSearchParams(window.location.search),t=e.get("giphyKey"),n=e.get("twitchChannel"),a=Object(r.useState)(!1),i=Object(l.a)(a,2),u=i[0],o=i[1];return Object(r.useEffect)((function(){u||Object(h.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Audio,e.prev=1,e.next=4,t.play();case 4:o(!0),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(1);case 9:case"end":return e.stop()}}),e,null,[[1,7]])})))()})),n&&t?u?Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(O,{giphyKey:t,twitchChannel:n})}):Object(c.jsx)("button",{onClick:function(e){return o(!0)},children:"CLICK ME"}):Object(c.jsx)(b,{})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};u.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root")),y()}},[[47,1,2]]]);
//# sourceMappingURL=main.84649b5f.chunk.js.map