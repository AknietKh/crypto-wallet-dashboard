(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{892:function(e,c,t){var content=t(901);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(47).default)("3c51e5a9",content,!0,{sourceMap:!1})},900:function(e,c,t){"use strict";t(892)},901:function(e,c,t){var d=t(46)(!1);d.push([e.i,"[data-v-05cb3246]:root{--default-background:#fff;--scrollbar:#ecebeb;--header-border:#e3e3e3;--burger-bg:#202020;--burger-bg-transparent:#fff;--main-text-color:#202020;--secondary-text-color:#585858;--default-btn-bg:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%);--default-btn-border:#09f2c3;--fields:#f9f9f9;--fields-focused:#fff;--fields-text:#151515;--fields-placeholeder-text:#8f8f8f;--fields-border:#c7c7c7;--fields-botder-danger:#ff5252;--label:#585858;--validate-success:#585858;--select-border:#e3e3e3;--select-shadow:0px 10px 30px rgba(0,0,0,0.25);--select-text:#747474;--select-arrow:#202020;--switch-theme-bg:#f9f9f9;--switch-theme-border:#e3e3e3;--balance-card-shadow:0px 10px 40px rgba(0,0,0,0.1);--balance-card-address-field:#fff;--balance-card-copy:#e3e3e3;--token-card-bg:#ecebeb;--transfer-form-bg:#ecebeb;--transaction-card-bg:#ecebeb;--transaction-badge-bg:#fff}[data-v-05cb3246]:root,:root.dark-mode[data-v-05cb3246]{--loader:#09f2c3;--link-active:#09f2c3;--danger-btn-bg:#ff234b;--danger-btn-border:#ff234b;--success-btn-bg:#26d652;--success-btn-border:#26d652;--disabled-btn-bg:#c7c7c7;--disabled-btn-border:#c7c7c7;--disabled-btn-text:#ababab;--validate-danger:#ff5252;--balance-card-bg:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%)}:root.dark-mode[data-v-05cb3246]{--default-background:#202020;--scrollbar:#3c3c3c;--header-border:#3c3c3c;--burger-bg:#fff;--burger-bg-transparent:#fff;--main-text-color:#fff;--secondary-text-color:#fff;--default-btn-bg:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%);--default-btn-border:#09f2c3;--fields:#585858;--fields-focused:#585858;--fields-text:#fff;--fields-placeholeder-text:#8f8f8f;--fields-border:#8f8f8f;--fields-botder-danger:#ff5252;--label:hsla(0,0%,78%,0.3451);--validate-success:#26d652;--select-border:#3c3c3c;--select-shadow:0px 10px 20px rgba(0,0,0,0.3);--select-text:#ababab;--select-arrow:#fff;--switch-theme-bg:transparent;--switch-theme-border:#3c3c3c;--balance-card-shadow:0px 10px 40px rgba(0,0,0,0.4);--balance-card-address-field:#fff;--balance-card-copy:#e3e3e3;--token-card-bg:#3c3c3c;--transfer-form-bg:#3c3c3c;--transaction-card-bg:#3c3c3c;--transaction-badge-bg:#585858}.balance-card[data-v-05cb3246]{display:flex;justify-content:space-between;border-radius:14px;background:linear-gradient(253.94deg,#09f2c3 8.37%,#15dce4 69.71%);background:var(--balance-card-bg);box-shadow:0 10px 40px rgba(0,0,0,.1);box-shadow:var(--balance-card-shadow)}.balance-card__left[data-v-05cb3246]{max-width:480px;width:100%;padding:35px}.balance-card__terminal[data-v-05cb3246]{width:488px;height:220px}.balance-card__title[data-v-05cb3246]{font-size:16px;font-weight:400;line-height:20px;margin-bottom:8px}.balance-card__balance[data-v-05cb3246]{font-size:40px;font-weight:700;line-height:49px;margin-bottom:30px}.copy-field[data-v-05cb3246]{display:flex;justify-content:space-between;align-items:center;width:100%;height:42px;background:#fff;background:var(--balance-card-address-field);border-radius:35px;padding:12px 5px 12px 13px}.copy-field__user-address[data-v-05cb3246]{overflow:hidden;text-overflow:ellipsis}.copy-field__copy[data-v-05cb3246]{padding:5px 8px;border-radius:50%;background-color:#e3e3e3;background-color:var(--balance-card-copy)}.copy-field__icon[data-v-05cb3246]{font-size:16px}",""]),e.exports=d},909:function(e,c,t){"use strict";t.r(c);var d=t(45),r=t(34),n=r.b.extend({name:"BalanceCard",props:{token:{type:Object,required:!0}},computed:Object.assign({},Object(d.b)({userAddress:"main/getUserAddress",isConnected:"main/getIsConnected"})),methods:{handleCopy:function(){this.$copyText(this.userAddress),this.ShowToast("Copied: ".concat(this.userAddress),r.a.SUCCESS)}}}),l=(t(900),t(27)),component=Object(l.a)(n,(function(){var e=this,c=e.$createElement,t=e._self._c||c;return t("div",{staticClass:"balance-card"},[t("div",{staticClass:"balance-card__left"},[t("h2",{staticClass:"balance-card__title"},[e._v("\n      "+e._s(e.$t("balance-card.title"))+"\n    ")]),e._v(" "),e.isConnected?t("p",{staticClass:"balance-card__balance",attrs:{title:e.token.balance}},[e._v("\n      "+e._s(e.$cn(e.token.balance,6))+" "+e._s(e.token.symbol)+"\n    ")]):t("p",{staticClass:"balance-card__balance"},[e._v("\n      -\n    ")]),e._v(" "),t("div",{staticClass:"balance-card__address-field copy-field"},[t("p",{staticClass:"copy-field__user-address"},[e._v("\n        "+e._s(e.userAddress||"Connect wallet first")+"\n      ")]),e._v(" "),t("button",{staticClass:"copy-field__copy",attrs:{disabled:!e.isConnected},on:{click:e.handleCopy}},[t("span",{staticClass:"icon-copy copy-field__icon"})])])]),e._v(" "),t("div",{staticClass:"balance-card__right"},[t("img",{staticClass:"balance-card__terminal",attrs:{src:e.Require("card-reader.png"),alt:"card reader"}})])])}),[],!1,null,"05cb3246",null);c.default=component.exports}}]);