(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{893:function(e,t,r){var content=r(903);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(47).default)("3fd0fe90",content,!0,{sourceMap:!1})},902:function(e,t,r){"use strict";r(893)},903:function(e,t,r){var n=r(46)(!1);n.push([e.i,":root{--default-background:#fff;--scrollbar:#ecebeb;--header-border:#e3e3e3;--burger-bg:#202020;--burger-bg-transparent:#fff;--main-text-color:#202020;--secondary-text-color:#585858;--default-btn-bg:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%);--default-btn-border:#09f2c3;--fields:#f9f9f9;--fields-focused:#fff;--fields-text:#151515;--fields-placeholeder-text:#8f8f8f;--fields-border:#c7c7c7;--fields-botder-danger:#ff5252;--label:#585858;--validate-success:#585858;--select-border:#e3e3e3;--select-shadow:0px 10px 30px rgba(0,0,0,0.25);--select-text:#747474;--select-arrow:#202020;--switch-theme-bg:#f9f9f9;--switch-theme-border:#e3e3e3;--balance-card-shadow:0px 10px 40px rgba(0,0,0,0.1);--balance-card-address-field:#fff;--balance-card-copy:#e3e3e3;--token-card-bg:#ecebeb;--transfer-form-bg:#ecebeb;--transaction-card-bg:#ecebeb;--transaction-badge-bg:#fff}:root,:root.dark-mode{--loader:#09f2c3;--link-active:#09f2c3;--danger-btn-bg:#ff234b;--danger-btn-border:#ff234b;--success-btn-bg:#26d652;--success-btn-border:#26d652;--disabled-btn-bg:#c7c7c7;--disabled-btn-border:#c7c7c7;--disabled-btn-text:#ababab;--validate-danger:#ff5252;--balance-card-bg:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%)}:root.dark-mode{--default-background:#202020;--scrollbar:#3c3c3c;--header-border:#3c3c3c;--burger-bg:#fff;--burger-bg-transparent:#fff;--main-text-color:#fff;--secondary-text-color:#fff;--default-btn-bg:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%);--default-btn-border:#09f2c3;--fields:#585858;--fields-focused:#585858;--fields-text:#fff;--fields-placeholeder-text:#8f8f8f;--fields-border:#8f8f8f;--fields-botder-danger:#ff5252;--label:hsla(0,0%,78%,0.3451);--validate-success:#26d652;--select-border:#3c3c3c;--select-shadow:0px 10px 20px rgba(0,0,0,0.3);--select-text:#ababab;--select-arrow:#fff;--switch-theme-bg:transparent;--switch-theme-border:#3c3c3c;--balance-card-shadow:0px 10px 40px rgba(0,0,0,0.4);--balance-card-address-field:#fff;--balance-card-copy:#e3e3e3;--token-card-bg:#3c3c3c;--transfer-form-bg:#3c3c3c;--transaction-card-bg:#3c3c3c;--transaction-badge-bg:#585858}.skeleton_size{min-width:206px;height:100%}.token-card{min-width:206px;padding:20px;background-color:#ecebeb;background-color:var(--token-card-bg);border-radius:14px}.token-card__header{display:grid;grid-template-columns:30px 1fr;align-items:center;grid-column-gap:10px}.token-card__header_mb{margin-bottom:14px}.token-card__logo{width:30px;height:30px;border-radius:50%}.token-card__title{font-size:18px;font-weight:600;color:#202020;color:var(--main-text-color)}.token-card__amount{font-size:16px;font-weight:400;text-align:right;color:#585858;color:var(--secondary-text-color)}",""]),e.exports=n},910:function(e,t,r){"use strict";r.r(t);r(67),r(1);var n=r(45),o=r(34),c=function(e,t,r,n){return new(r||(r=Promise))((function(o,c){function d(e){try{f(n.next(e))}catch(e){c(e)}}function l(e){try{f(n.throw(e))}catch(e){c(e)}}function f(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(d,l)}f((n=n.apply(e,t||[])).next())}))},d=o.b.extend({name:"TokenCard",props:{token:{type:Object,required:!0}},data:function(){return{isLoading:!1}},computed:Object.assign(Object.assign({},Object(n.b)({tokensLogo:"main/getTokensUrl",isConnected:"main/getIsConnected"})),{tokenLogo:function(){return this.tokensLogo[this.token.symbol.toUpperCase()]||this.Require("default-token.svg")}}),watch:{isConnected:function(e){e&&this.updateBalance()},token:function(e,t){console.log("token: ",e),console.log("oldToken: ",t),e.symol!==t.sumbol&&this.updateBalance()}},methods:{updateBalance:function(){return c(this,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,this.$store.dispatch("main/updateTokenBalance",this.token);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log("err: ",e.t0);case 9:return e.prev=9,this.isLoading=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,this,[[0,6,9,12]])})))}}}),l=(r(902),r(27)),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"token-card",class:{skeleton:e.isLoading}},[r("div",{staticClass:"token-card__header token-card__header_mb"},[r("img",{staticClass:"token-card__logo",attrs:{src:e.tokenLogo,alt:e.token.symbol.toUpperCase()}}),e._v(" "),r("p",{staticClass:"token-card__title"},[e._v("\n      "+e._s(e.token.symbol.toUpperCase())+"\n    ")])]),e._v(" "),r("div",{staticClass:"token-card__body"},[e.isConnected?r("p",{staticClass:"token-card__amount",attrs:{title:e.token.balance}},[e._v("\n      "+e._s(e.$cn(e.token.balance,6))+" "+e._s(e.token.symbol)+"\n    ")]):r("p",{staticClass:"token-card__amount"},[e._v("\n      Connect wallet first\n    ")])])])}),[],!1,null,null,null);t.default=component.exports}}]);