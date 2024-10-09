(function(){"use strict";var t={218:function(t,n,i){var e=i(242),o=i(396),r=i(139);const a=(0,o._)("header",null,[(0,o._)("h1",null,"వడ్డీ కాలిక్యులేటర్")],-1),l={class:"card"},s={class:"form-group"},u=(0,o._)("label",{for:"principal_amount"},"అసలు మెుత్తం",-1),f={class:"form-group"},p=(0,o._)("label",{for:"intrest"},"వడ్డీ రేటు",-1),d=(0,o.uE)('<option value="0.5">0.5</option><option value="1">1</option><option value="1.5">1.5</option><option value="2">2</option><option value="2.5">2.5</option><option value="3">3</option>',6),m=[d],c={class:"form-group"},_=(0,o._)("label",{for:"from_date"},"ఇచ్చిన తేదీ",-1),h={class:"form-group"},v=(0,o._)("label",{for:"to_date"},"తీసుకున్న తేదీ",-1),g=(0,o._)("div",{class:"form-group"},[(0,o._)("button",{type:"submit"},"లెక్కించు")],-1),y={key:0},w=(0,o._)("p",null,"వివరాలు అన్నింటినీ నింపి ఫారం సబ్మిట్ చేయండి.",-1),b=[w],D={key:1},k=(0,o._)("strong",null,"మొత్తం నెలలు: ",-1),z=(0,o._)("strong",null,"మొదటి మొత్తం : ",-1),U=(0,o._)("strong",null,"వడ్డీ మొత్తం : ",-1),O=(0,o._)("strong",null,"మొత్తం డబ్బు : ",-1),Y=(0,o._)("strong",null,"మొత్తం వడ్డీ : ",-1),M=(0,o._)("strong",null,"మొత్తం డబ్బు : ",-1);function j(t,n,i,d,w,j){return(0,o.wg)(),(0,o.iD)(o.HY,null,[a,(0,o._)("div",l,[(0,o._)("div",null,[(0,o._)("form",{onSubmit:n[4]||(n[4]=(0,e.iM)(((...t)=>j.calculate&&j.calculate(...t)),["prevent"]))},[(0,o._)("div",s,[u,(0,o.wy)((0,o._)("input",{type:"number",class:"form-control",id:"principal_amount","onUpdate:modelValue":n[0]||(n[0]=t=>w.principal=t)},null,512),[[e.nr,w.principal,void 0,{trim:!0}]])]),(0,o._)("div",f,[p,(0,o.wy)((0,o._)("select",{name:"intrest",id:"cars",class:"form-control","onUpdate:modelValue":n[1]||(n[1]=t=>w.intrest=t)},m,512),[[e.bM,w.intrest,void 0,{trim:!0}]])]),(0,o._)("div",c,[_,(0,o.wy)((0,o._)("input",{type:"date",class:"form-control",id:"from_date","onUpdate:modelValue":n[2]||(n[2]=t=>w.from_date=t)},null,512),[[e.nr,w.from_date,void 0,{trim:!0}]])]),(0,o._)("div",h,[v,(0,o.wy)((0,o._)("input",{type:"date",class:"form-control",id:"to_date","onUpdate:modelValue":n[3]||(n[3]=t=>w.to_date=t)},null,512),[[e.nr,w.to_date,void 0,{trim:!0}]])]),g],32),w.errormessage?((0,o.wg)(),(0,o.iD)("div",y,b)):(0,o.kq)("",!0),w.display_details?((0,o.wg)(),(0,o.iD)("div",D,[(0,o._)("p",null,[k,(0,o.Uk)((0,r.zw)(w.diffmonths)+" నెలలు "+(0,r.zw)(w.diffDays)+" రోజులు ",1)]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.compound_details,(t=>((0,o.wg)(),(0,o.iD)("div",{key:t.cumulativeYear},[(0,o._)("h3",null,(0,r.zw)(t.cumulativeYear)+" సంవత్సరానికి వివరాలు:",1),(0,o._)("p",null,[z,(0,o.Uk)((0,r.zw)(t.principalAmount),1)]),(0,o._)("p",null,[U,(0,o.Uk)((0,r.zw)(t.interestAmount),1)]),(0,o._)("p",null,[O,(0,o.Uk)((0,r.zw)(t.totalAmount),1)])])))),128)),(0,o._)("p",null,[(0,o._)("strong",null,(0,r.zw)(w.diffmonths)+" నెలలు వడ్డీ : ",1),(0,o.Uk)(" "+(0,r.zw)(w.intrest_amount_months),1)]),(0,o._)("p",null,[(0,o._)("strong",null,(0,r.zw)(w.diffDays)+" రోజులు: వడ్డీ ",1),(0,o.Uk)((0,r.zw)(w.intrest_amount_days),1)]),(0,o._)("p",null,[Y,(0,o.Uk)((0,r.zw)(t.total_intrest),1)]),(0,o._)("p",null,[M,(0,o.Uk)((0,r.zw)(w.total_amount),1)])])):(0,o.kq)("",!0)])])],64)}var A={data(){return{principal:"",cummulative:"",intrest:"",to_date:"",from_date:"",intrest_amount_months:0,intrest_amount_days:0,total_amount:0,diffDays:0,diffmonths:0,diffYears:0,display_details:!1,errormessage:!1,compound_details:[]}},methods:{CompoundInterest(){let t=0,n=0;for(let i=0;i<this.diffYears;i+=this.cummulative){0===i&&(t=this.principal),t+=n,t=this.principal;let e=this.interest,o=1/this.cummulative,r=this.cummulative;n=t*Math.pow(1+e/o,o*r)-t;let a=t+n;this.compound_details.push({principalAmount:t,interestAmount:n,totalAmount:a,cumulativeYear:i*this.cummulative})}},getDateDiff(t=new Date(this.from_date),n=new Date(this.to_date)){const i=Math.floor((n-t)/864e5);let e=n.getFullYear()-t.getFullYear(),o=n.getMonth()-t.getMonth(),r=n.getDate()-t.getDate();r<0&&(o--,r+=new Date(n.getFullYear(),n.getMonth(),0).getDate()),o<0&&(e--,o+=12);const a=12*e+o;return{months:a,days:r,totalDays:i,years:e}},calculate(){if(""===this.principal||""===this.intrest||""===this.to_date||""===this.from_date)return this.errormessage=!0,void(this.display_details=!1);this.errormessage=!1,this.display_details=!0;let t=this.getDateDiff();this.diffDays=t.days,this.diffmonths=t.months,this.diffYears=t.years,"0"!==this.cummulative&&this.CompoundInterest(),this.intrest_amount_months=Math.floor(this.principal*+this.intrest*this.diffmonths/100),this.intrest_amount_days=Math.floor(this.principal*+this.intrest*this.diffDays/3e3),this.total_intrest=this.intrest_amount_days+this.intrest_amount_months,this.total_amount=this.principal+this.total_intrest}}},x=i(89);const C=(0,x.Z)(A,[["render",j]]);var F=C;const V=(0,e.ri)(F);V.mount("#app")}},n={};function i(e){var o=n[e];if(void 0!==o)return o.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(n,e,o,r){if(!e){var a=1/0;for(f=0;f<t.length;f++){e=t[f][0],o=t[f][1],r=t[f][2];for(var l=!0,s=0;s<e.length;s++)(!1&r||a>=r)&&Object.keys(i.O).every((function(t){return i.O[t](e[s])}))?e.splice(s--,1):(l=!1,r<a&&(a=r));if(l){t.splice(f--,1);var u=o();void 0!==u&&(n=u)}}return n}r=r||0;for(var f=t.length;f>0&&t[f-1][2]>r;f--)t[f]=t[f-1];t[f]=[e,o,r]}}(),function(){i.d=function(t,n){for(var e in n)i.o(n,e)&&!i.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={143:0};i.O.j=function(n){return 0===t[n]};var n=function(n,e){var o,r,a=e[0],l=e[1],s=e[2],u=0;if(a.some((function(n){return 0!==t[n]}))){for(o in l)i.o(l,o)&&(i.m[o]=l[o]);if(s)var f=s(i)}for(n&&n(e);u<a.length;u++)r=a[u],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(f)},e=self["webpackChunkvue_first_project"]=self["webpackChunkvue_first_project"]||[];e.forEach(n.bind(null,0)),e.push=n.bind(null,e.push.bind(e))}();var e=i.O(void 0,[998],(function(){return i(218)}));e=i.O(e)})();
//# sourceMappingURL=app.22266f8b.js.map