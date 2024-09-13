(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))_(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&_(d)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function _(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var W,S,He,x,Ce,Te,ie,se,_e,oe,Le,B={},we=[],Xe=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Z=Array.isArray;function E(t,e){for(var n in e)t[n]=e[n];return t}function xe(t){var e=t.parentNode;e&&e.removeChild(t)}function R(t,e,n){var _,i,o,d={};for(o in e)o=="key"?_=e[o]:o=="ref"?i=e[o]:d[o]=e[o];if(arguments.length>2&&(d.children=arguments.length>3?W.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)d[o]===void 0&&(d[o]=t.defaultProps[o]);return I(t,d,_,i,null)}function I(t,e,n,_,i){var o={type:t,props:e,key:n,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:i??++He,__i:-1,__u:0};return i==null&&S.vnode!=null&&S.vnode(o),o}function j(t){return t.children}function G(t,e){this.props=t,this.context=e}function $(t,e){if(e==null)return t.__?$(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?$(t):null}function Re(t){var e,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return Re(t)}}function le(t){(!t.__d&&(t.__d=!0)&&x.push(t)&&!V.__r++||Ce!==S.debounceRendering)&&((Ce=S.debounceRendering)||Te)(V)}function V(){var t,e,n,_,i,o,d,c;for(x.sort(ie);t=x.shift();)t.__d&&(e=x.length,_=void 0,o=(i=(n=t).__v).__e,d=[],c=[],n.__P&&((_=E({},i)).__v=i.__v+1,S.vnode&&S.vnode(_),he(n.__P,_,i,n.__n,n.__P.namespaceURI,32&i.__u?[o]:null,d,o??$(i),!!(32&i.__u),c),_.__v=i.__v,_.__.__k[_.__i]=_,Ue(d,_,c),_.__e!=o&&Re(_)),x.length>e&&x.sort(ie));V.__r=0}function $e(t,e,n,_,i,o,d,c,s,a,f){var l,u,h,p,N,y=_&&_.__k||we,C=e.length;for(n.__d=s,ze(n,e,y),s=n.__d,l=0;l<C;l++)(h=n.__k[l])!=null&&typeof h!="boolean"&&typeof h!="function"&&(u=h.__i===-1?B:y[h.__i]||B,h.__i=l,he(t,h,u,i,o,d,c,s,a,f),p=h.__e,h.ref&&u.ref!=h.ref&&(u.ref&&ue(u.ref,null,h),f.push(h.ref,h.__c||p,h)),N==null&&p!=null&&(N=p),65536&h.__u||u.__k===h.__k?s=Ae(h,s,t):typeof h.type=="function"&&h.__d!==void 0?s=h.__d:p&&(s=p.nextSibling),h.__d=void 0,h.__u&=-196609);n.__d=s,n.__e=N}function ze(t,e,n){var _,i,o,d,c,s=e.length,a=n.length,f=a,l=0;for(t.__k=[],_=0;_<s;_++)d=_+l,(i=t.__k[_]=(i=e[_])==null||typeof i=="boolean"||typeof i=="function"?null:typeof i=="string"||typeof i=="number"||typeof i=="bigint"||i.constructor==String?I(null,i,null,null,null):Z(i)?I(j,{children:i},null,null,null):i.constructor===void 0&&i.__b>0?I(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):i)!=null?(i.__=t,i.__b=t.__b+1,c=Ge(i,n,d,f),i.__i=c,o=null,c!==-1&&(f--,(o=n[c])&&(o.__u|=131072)),o==null||o.__v===null?(c==-1&&l--,typeof i.type!="function"&&(i.__u|=65536)):c!==d&&(c==d-1?l--:c==d+1?l++:c>d?f>s-d?l+=c-d:l--:c<d&&(c==d-l?l-=c-d:l++),c!==_+l&&(i.__u|=65536))):(o=n[d])&&o.key==null&&o.__e&&!(131072&o.__u)&&(o.__e==t.__d&&(t.__d=$(o)),ce(o,o,!1),n[d]=null,f--);if(f)for(_=0;_<a;_++)(o=n[_])!=null&&!(131072&o.__u)&&(o.__e==t.__d&&(t.__d=$(o)),ce(o,o))}function Ae(t,e,n){var _,i;if(typeof t.type=="function"){for(_=t.__k,i=0;_&&i<_.length;i++)_[i]&&(_[i].__=t,e=Ae(_[i],e,n));return e}t.__e!=e&&(e&&t.type&&!n.contains(e)&&(e=$(t)),n.insertBefore(t.__e,e||null),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType===8);return e}function Oe(t,e){return e=e||[],t==null||typeof t=="boolean"||(Z(t)?t.some(function(n){Oe(n,e)}):e.push(t)),e}function Ge(t,e,n,_){var i=t.key,o=t.type,d=n-1,c=n+1,s=e[n];if(s===null||s&&i==s.key&&o===s.type&&!(131072&s.__u))return n;if(_>(s!=null&&!(131072&s.__u)?1:0))for(;d>=0||c<e.length;){if(d>=0){if((s=e[d])&&!(131072&s.__u)&&i==s.key&&o===s.type)return d;d--}if(c<e.length){if((s=e[c])&&!(131072&s.__u)&&i==s.key&&o===s.type)return c;c++}}return-1}function Se(t,e,n){e[0]==="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||Xe.test(e)?n:n+"px"}function q(t,e,n,_,i){var o;e:if(e==="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof _=="string"&&(t.style.cssText=_=""),_)for(e in _)n&&e in n||Se(t.style,e,"");if(n)for(e in n)_&&n[e]===_[e]||Se(t.style,e,n[e])}else if(e[0]==="o"&&e[1]==="n")o=e!==(e=e.replace(/(PointerCapture)$|Capture$/i,"$1")),e=e.toLowerCase()in t||e==="onFocusOut"||e==="onFocusIn"?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=n,n?_?n.u=_.u:(n.u=se,t.addEventListener(e,o?oe:_e,o)):t.removeEventListener(e,o?oe:_e,o);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!=="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function Me(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e.t==null)e.t=se++;else if(e.t<n.u)return;return n(S.event?S.event(e):e)}}}function he(t,e,n,_,i,o,d,c,s,a){var f,l,u,h,p,N,y,C,M,H,g,b,T,Y,A,v,F=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(s=!!(32&n.__u),o=[c=e.__e=n.__e]),(f=S.__b)&&f(e);e:if(typeof F=="function")try{if(C=e.props,M="prototype"in F&&F.prototype.render,H=(f=F.contextType)&&_[f.__c],g=f?H?H.props.value:f.__:_,n.__c?y=(l=e.__c=n.__c).__=l.__E:(M?e.__c=l=new F(C,g):(e.__c=l=new G(C,g),l.constructor=F,l.render=Ve),H&&H.sub(l),l.props=C,l.state||(l.state={}),l.context=g,l.__n=_,u=l.__d=!0,l.__h=[],l._sb=[]),M&&l.__s==null&&(l.__s=l.state),M&&F.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=E({},l.__s)),E(l.__s,F.getDerivedStateFromProps(C,l.__s))),h=l.props,p=l.state,l.__v=e,u)M&&F.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),M&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(M&&F.getDerivedStateFromProps==null&&C!==h&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(C,g),!l.__e&&(l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(C,l.__s,g)===!1||e.__v===n.__v)){for(e.__v!==n.__v&&(l.props=C,l.state=l.__s,l.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.forEach(function(O){O&&(O.__=e)}),b=0;b<l._sb.length;b++)l.__h.push(l._sb[b]);l._sb=[],l.__h.length&&d.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(C,l.__s,g),M&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(h,p,N)})}if(l.context=g,l.props=C,l.__P=t,l.__e=!1,T=S.__r,Y=0,M){for(l.state=l.__s,l.__d=!1,T&&T(e),f=l.render(l.props,l.state,l.context),A=0;A<l._sb.length;A++)l.__h.push(l._sb[A]);l._sb=[]}else do l.__d=!1,T&&T(e),f=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++Y<25);l.state=l.__s,l.getChildContext!=null&&(_=E(E({},_),l.getChildContext())),M&&!u&&l.getSnapshotBeforeUpdate!=null&&(N=l.getSnapshotBeforeUpdate(h,p)),$e(t,Z(v=f!=null&&f.type===j&&f.key==null?f.props.children:f)?v:[v],e,n,_,i,o,d,c,s,a),l.base=e.__e,e.__u&=-161,l.__h.length&&d.push(l),y&&(l.__E=l.__=null)}catch(O){if(e.__v=null,s||o!=null){for(e.__u|=s?160:32;c&&c.nodeType===8&&c.nextSibling;)c=c.nextSibling;o[o.indexOf(c)]=null,e.__e=c}else e.__e=n.__e,e.__k=n.__k;S.__e(O,e,n)}else o==null&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=Je(n.__e,e,n,_,i,o,d,s,a);(f=S.diffed)&&f(e)}function Ue(t,e,n){e.__d=void 0;for(var _=0;_<n.length;_++)ue(n[_],n[++_],n[++_]);S.__c&&S.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(o){o.call(i)})}catch(o){S.__e(o,i.__v)}})}function Je(t,e,n,_,i,o,d,c,s){var a,f,l,u,h,p,N,y=n.props,C=e.props,M=e.type;if(M==="svg"?i="http://www.w3.org/2000/svg":M==="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(a=0;a<o.length;a++)if((h=o[a])&&"setAttribute"in h==!!M&&(M?h.localName===M:h.nodeType===3)){t=h,o[a]=null;break}}if(t==null){if(M===null)return document.createTextNode(C);t=document.createElementNS(i,M,C.is&&C),o=null,c=!1}if(M===null)y===C||c&&t.data===C||(t.data=C);else{if(o=o&&W.call(t.childNodes),y=n.props||B,!c&&o!=null)for(y={},a=0;a<t.attributes.length;a++)y[(h=t.attributes[a]).name]=h.value;for(a in y)if(h=y[a],a!="children"){if(a=="dangerouslySetInnerHTML")l=h;else if(a!=="key"&&!(a in C)){if(a=="value"&&"defaultValue"in C||a=="checked"&&"defaultChecked"in C)continue;q(t,a,null,h,i)}}for(a in C)h=C[a],a=="children"?u=h:a=="dangerouslySetInnerHTML"?f=h:a=="value"?p=h:a=="checked"?N=h:a==="key"||c&&typeof h!="function"||y[a]===h||q(t,a,h,y[a],i);if(f)c||l&&(f.__html===l.__html||f.__html===t.innerHTML)||(t.innerHTML=f.__html),e.__k=[];else if(l&&(t.innerHTML=""),$e(t,Z(u)?u:[u],e,n,_,M==="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,d,o?o[0]:n.__k&&$(n,0),c,s),o!=null)for(a=o.length;a--;)o[a]!=null&&xe(o[a]);c||(a="value",p!==void 0&&(p!==t[a]||M==="progress"&&!p||M==="option"&&p!==y[a])&&q(t,a,p,y[a],i),a="checked",N!==void 0&&N!==t[a]&&q(t,a,N,y[a],i))}return t}function ue(t,e,n){try{if(typeof t=="function"){var _=typeof t.__u=="function";_&&t.__u(),_&&e==null||(t.__u=t(e))}else t.current=e}catch(i){S.__e(i,n)}}function ce(t,e,n){var _,i;if(S.unmount&&S.unmount(t),(_=t.ref)&&(_.current&&_.current!==t.__e||ue(_,null,e)),(_=t.__c)!=null){if(_.componentWillUnmount)try{_.componentWillUnmount()}catch(o){S.__e(o,e)}_.base=_.__P=null}if(_=t.__k)for(i=0;i<_.length;i++)_[i]&&ce(_[i],e,n||typeof t.type!="function");n||t.__e==null||xe(t.__e),t.__c=t.__=t.__e=t.__d=void 0}function Ve(t,e,n){return this.constructor(t,n)}function Ze(t,e,n){var _,i,o,d;S.__&&S.__(t,e),i=(_=typeof n=="function")?null:e.__k,o=[],d=[],he(e,t=(!_&&n||e).__k=R(j,null,[t]),i||B,B,e.namespaceURI,!_&&n?[n]:i?null:e.firstChild?W.call(e.childNodes):null,o,!_&&n?n:i?i.__e:e.firstChild,_,d),Ue(o,t,d)}function De(t,e,n){var _,i,o,d,c=E({},t.props);for(o in t.type&&t.type.defaultProps&&(d=t.type.defaultProps),e)o=="key"?_=e[o]:o=="ref"?i=e[o]:c[o]=e[o]===void 0&&d!==void 0?d[o]:e[o];return arguments.length>2&&(c.children=arguments.length>3?W.call(arguments,2):n),I(t.type,c,_||t.key,i||t.ref,null)}function Ie(t,e){var n={__c:e="__cC"+Le++,__:t,Consumer:function(_,i){return _.children(i)},Provider:function(_){var i,o;return this.getChildContext||(i=[],(o={})[e]=this,this.getChildContext=function(){return o},this.componentWillUnmount=function(){i=null},this.shouldComponentUpdate=function(d){this.props.value!==d.value&&i.some(function(c){c.__e=!0,le(c)})},this.sub=function(d){i.push(d);var c=d.componentWillUnmount;d.componentWillUnmount=function(){i&&i.splice(i.indexOf(d),1),c&&c.call(d)}}),_.children}};return n.Provider.__=n.Consumer.contextType=n}W=we.slice,S={__e:function(t,e,n,_){for(var i,o,d;e=e.__;)if((i=e.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(t)),d=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,_||{}),d=i.__d),d)return i.__E=i}catch(c){t=c}throw t}},He=0,G.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=E({},this.state),typeof t=="function"&&(t=t(E({},n),this.props)),t&&E(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),le(this))},G.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),le(this))},G.prototype.render=j,x=[],Te=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ie=function(t,e){return t.__v.__b-e.__v.__b},V.__r=0,se=0,_e=Me(!1),oe=Me(!0),Le=0;var e0=0;function r(t,e,n,_,i,o){e||(e={});var d,c,s=e;if("ref"in s)for(c in s={},e)c=="ref"?d=e[c]:s[c]=e[c];var a={type:t,props:s,key:n,ref:d,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--e0,__i:-1,__u:0,__source:i,__self:o};if(typeof t=="function"&&(d=t.defaultProps))for(c in d)s[c]===void 0&&(s[c]=d[c]);return S.vnode&&S.vnode(a),a}var U,m,te,pe,de=0,Be=[],k=S,me=k.__b,ye=k.__r,ve=k.diffed,ke=k.__c,Fe=k.unmount,Ne=k.__;function ee(t,e){k.__h&&k.__h(m,t,de||e),de=0;var n=m.__H||(m.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function We(t,e,n){var _=ee(U++,2);if(_.t=t,!_.__c&&(_.__=[n0(void 0,e),function(c){var s=_.__N?_.__N[0]:_.__[0],a=_.t(s,c);s!==a&&(_.__N=[a,_.__[1]],_.__c.setState({}))}],_.__c=m,!m.u)){var i=function(c,s,a){if(!_.__c.__H)return!0;var f=_.__c.__H.__.filter(function(u){return!!u.__c});if(f.every(function(u){return!u.__N}))return!o||o.call(this,c,s,a);var l=!1;return f.forEach(function(u){if(u.__N){var h=u.__[0];u.__=u.__N,u.__N=void 0,h!==u.__[0]&&(l=!0)}}),!(!l&&_.__c.props===c)&&(!o||o.call(this,c,s,a))};m.u=!0;var o=m.shouldComponentUpdate,d=m.componentWillUpdate;m.componentWillUpdate=function(c,s,a){if(this.__e){var f=o;o=void 0,i(c,s,a),o=f}d&&d.call(this,c,s,a)},m.shouldComponentUpdate=i}return _.__N||_.__}function je(t,e){var n=ee(U++,4);!k.__s&&Ye(n.__H,e)&&(n.__=t,n.i=e,m.__h.push(n))}function P(t){return de=5,fe(function(){return{current:t}},[])}function fe(t,e){var n=ee(U++,7);return Ye(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function Ke(t){var e=m.context[t.__c],n=ee(U++,9);return n.c=t,e?(n.__==null&&(n.__=!0,e.sub(m)),e.props.value):t.__}function t0(){for(var t;t=Be.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(J),t.__H.__h.forEach(ae),t.__H.__h=[]}catch(e){t.__H.__h=[],k.__e(e,t.__v)}}k.__b=function(t){m=null,me&&me(t)},k.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),Ne&&Ne(t,e)},k.__r=function(t){ye&&ye(t),U=0;var e=(m=t.__c).__H;e&&(te===m?(e.__h=[],m.__h=[],e.__.forEach(function(n){n.__N&&(n.__=n.__N),n.i=n.__N=void 0})):(e.__h.forEach(J),e.__h.forEach(ae),e.__h=[],U=0)),te=m},k.diffed=function(t){ve&&ve(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(Be.push(e)!==1&&pe===k.requestAnimationFrame||((pe=k.requestAnimationFrame)||r0)(t0)),e.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.i=void 0})),te=m=null},k.__c=function(t,e){e.some(function(n){try{n.__h.forEach(J),n.__h=n.__h.filter(function(_){return!_.__||ae(_)})}catch(_){e.some(function(i){i.__h&&(i.__h=[])}),e=[],k.__e(_,n.__v)}}),ke&&ke(t,e)},k.unmount=function(t){Fe&&Fe(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(_){try{J(_)}catch(i){e=i}}),n.__H=void 0,e&&k.__e(e,n.__v))};var ge=typeof requestAnimationFrame=="function";function r0(t){var e,n=function(){clearTimeout(_),ge&&cancelAnimationFrame(e),setTimeout(t)},_=setTimeout(n,100);ge&&(e=requestAnimationFrame(n))}function J(t){var e=m,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),m=e}function ae(t){var e=m;t.__c=t.__(),m=e}function Ye(t,e){return!t||t.length!==e.length||e.some(function(n,_){return n!==t[_]})}function n0(t,e){return typeof e=="function"?e(t):e}let w;const i0=(t,e)=>{if(w=void 0,e&&e.type==="click"){if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button!==0)return t;const n=e.target.closest("a[href]");if(!n||n.origin!=location.origin||/^#/.test(n.getAttribute("href"))||!/^(_?self)?$/i.test(n.target))return t;w=!0,e.preventDefault(),e=n.href.replace(location.origin,"")}else typeof e=="string"?w=!0:e&&e.url?(w=!e.replace,e=e.url):e=location.pathname+location.search;return w===!0?history.pushState(null,"",e):w===!1&&history.replaceState(null,"",e),e},_0=(t,e,n)=>{t=t.split("/").filter(Boolean),e=(e||"").split("/").filter(Boolean);for(let _=0,i,o;_<Math.max(t.length,e.length);_++){let[,d,c,s]=(e[_]||"").match(/^(:?)(.*?)([+*?]?)$/);if(i=t[_],!(!d&&c==i)){if(!d&&i&&s=="*"){n.rest="/"+t.slice(_).map(decodeURIComponent).join("/");break}if(!d||!i&&s!="?"&&s!="*")return;if(o=s=="+"||s=="*",o?i=t.slice(_).map(decodeURIComponent).join("/"):i&&(i=decodeURIComponent(i)),n.params[c]=i,c in n||(n[c]=i),o)break}}return n};function K(t){const[e,n]=We(i0,t.url||location.pathname+location.search),_=w===!0,i=fe(()=>{const o=new URL(e,location.origin),d=o.pathname.replace(/(.)\/$/g,"$1");return{url:e,path:d,query:Object.fromEntries(o.searchParams),route:(c,s)=>n({url:c,replace:s}),wasPush:_}},[e]);return je(()=>(addEventListener("click",n),addEventListener("popstate",n),()=>{removeEventListener("click",n),removeEventListener("popstate",n)}),[]),R(K.ctx.Provider,{value:i},t.children)}const o0=Promise.resolve();function qe(t){const[e,n]=We(v=>v+1,0),{url:_,query:i,wasPush:o,path:d}=Qe(),{rest:c=d,params:s={}}=Ke(be),a=P(!1),f=P(d),l=P(0),u=P(),h=P(),p=P(),N=P(!1),y=P();y.current=!1;const C=P(!1);let M,H,g;Oe(t.children).some(v=>{if(_0(c,v.props.path,g={...v.props,path:c,query:i,params:s,rest:""}))return M=De(v,g);v.props.default&&(H=De(v,g))});let b=M||H;fe(()=>{h.current=u.current;const v=h.current&&h.current.props.children;!v||!b||b.type!==v.type||b.props.component!==v.props.component?(this.__v&&this.__v.__k&&this.__v.__k.reverse(),l.current++,C.current=!0):C.current=!1},[_]);const T=u.current&&u.current.__u&Q&&u.current.__u&X,Y=u.current&&u.current.__h;u.current=R(be.Provider,{value:g},b),T?(u.current.__u|=Q,u.current.__u|=X):Y&&(u.current.__h=!0);const A=h.current;return h.current=null,this.__c=(v,F)=>{y.current=!0,h.current=A,t.onLoadStart&&t.onLoadStart(_),a.current=!0;let O=l.current;v.then(()=>{O===l.current&&(h.current=null,u.current&&(F.__h&&(u.current.__h=F.__h),F.__u&X&&(u.current.__u|=X),F.__u&Q&&(u.current.__u|=Q)),o0.then(n))})},je(()=>{const v=this.__v&&this.__v.__e;if(y.current){!N.current&&!p.current&&(p.current=v);return}!N.current&&p.current&&(p.current!==v&&p.current.remove(),p.current=null),N.current=!0,f.current!==d&&(o&&scrollTo(0,0),t.onRouteChange&&t.onRouteChange(_),f.current=d),t.onLoadEnd&&a.current&&t.onLoadEnd(_),a.current=!1},[d,o,e]),C.current?[R(re,{r:u}),R(re,{r:h})]:R(re,{r:u})}const Q=32,X=128,re=({r:t})=>t.current;qe.Provider=K;K.ctx=Ie({});const be=Ie({}),z=t=>R(t.component,t),Qe=()=>Ke(K.ctx),Pe=S.__e;S.__e=(t,e,n)=>{if(t&&t.then){let _=e;for(;_=_.__;)if(_.__c&&_.__c.__c)return e.__e==null&&(e.__e=n.__e,e.__k=n.__k),e.__k||(e.__k=[]),_.__c.__c(t,e)}Pe&&Pe(t,e,n)};function l0(){const{url:t}=Qe();return r(j,{children:r("header",{children:[r("div",{class:"headerlogo",children:"basicp.art"}),r("nav",{children:[r("a",{href:"/home",class:t=="/home"&&"active",children:"Home"}),r("a",{href:"/resistors",class:(t=="/resistors"||t=="/")&&"active",children:"Resistors"}),r("a",{href:"/other",class:t=="/other"&&"active",children:"Other"})]})]})})}function c0(){return r("div",{class:"home",children:r("section",{children:[r(ne,{title:"Resistors",description:"Shop for surface mount resistors available in the Basic or Preferred Extended jlcpcb.com parts library",href:"/resistors"}),r(ne,{title:"Capacitors",description:"Coming Soon"}),r(ne,{title:"Other",description:"A scattered, incomplete collection of other components we tend to reach for in our projects",href:"/other"})]})})}function ne(t){return r("a",{href:t.href,target:"_blank",class:"resource",children:[r("h2",{children:t.title}),r("p",{children:t.description})]})}const d0="/assets/1206-DxWgHeDA.jpg",a0="/assets/0805-BxvC7ltX.jpg",s0="/assets/0603-Bsmpkku1.jpg",h0="/assets/0402-Dw__dT88.jpg",L={0:{FriendlyName:"0",SMD1206:"C17888",SMD0805:"C17477",SMD0603:"C21189",SMD0402:"C17168"},1:{FriendlyName:"1",SMD1206:"C17928",SMD0805:"C25271",SMD0603:"C22936",SMD0402:"C25086"},2:{FriendlyName:"2",SMD0805:"C17606",SMD0603:"C22977"},10:{FriendlyName:"10",SMD1206:"C17903",SMD0805:"C17415",SMD0603:"C22859",SMD0402:"C25077"},15:{FriendlyName:"15",SMD0805:"C17480",SMD0603:"C22810"},20:{FriendlyName:"20",SMD1206:"C17955",SMD0805:"C17544",SMD0603:"C22950"},22:{FriendlyName:"22",SMD1206:"C17958",SMD0805:"C17561",SMD0603:"C23345",SMD0402:"C25092"},27:{FriendlyName:"27",SMD0805:"C17594",SMD0603:"C25190"},33:{FriendlyName:"33",SMD0805:"C17634",SMD0603:"C23140",SMD0402:"C25105"},47:{FriendlyName:"47",SMD0805:"C17714",SMD0603:"C23182",SMD0402:"C25118"},51:{FriendlyName:"51",SMD0805:"C17738",SMD0603:"C23197",SMD0402:"C25125"},56:{FriendlyName:"56",SMD0805:"C17757",SMD0603:"C25196"},68:{FriendlyName:"68",SMD0805:"C17802",SMD0603:"C27592"},75:{FriendlyName:"75",SMD0603:"C4275",SMD0402:"C25133"},82:{FriendlyName:"82",SMD0603:"C23255"},100:{FriendlyName:"100",SMD1206:"C17901",SMD0805:"C17408",SMD0603:"C22775",SMD0402:"C25076"},120:{FriendlyName:"120",SMD1206:"C17909",SMD0805:"C17437",SMD0603:"C22787",SMD0402:"C25079"},150:{FriendlyName:"150",SMD0805:"C17471",SMD0603:"C22808",SMD0402:"C25082"},180:{FriendlyName:"180",SMD1206:"C17924",SMD0805:"C25270",SMD0603:"C22828"},200:{FriendlyName:"200",SMD0805:"C17540",SMD0603:"C8218",SMD0402:"C25087"},220:{FriendlyName:"220",SMD0805:"C17557",SMD0603:"C22962",SMD0402:"C25091"},240:{FriendlyName:"240",SMD0805:"C17572",SMD0603:"C23350"},270:{FriendlyName:"270",SMD0805:"C17590",SMD0603:"C22966"},300:{FriendlyName:"300",SMD1206:"C17887",SMD0805:"C17617",SMD0603:"C23025",SMD0402:"C25102"},330:{FriendlyName:"330",SMD0805:"C17630",SMD0603:"C23138",SMD0402:"C25104"},360:{FriendlyName:"360",SMD0603:"C25194"},390:{FriendlyName:"390",SMD0805:"C17655",SMD0603:"C23151"},430:{FriendlyName:"430",SMD0603:"C23170"},470:{FriendlyName:"470",SMD0805:"C17710",SMD0603:"C23179",SMD0402:"C25117"},510:{FriendlyName:"510",SMD0805:"C17734",SMD0603:"C23193",SMD0402:"C25123"},560:{FriendlyName:"560",SMD0805:"C28636",SMD0603:"C23204"},620:{FriendlyName:"620",SMD0603:"C23220"},680:{FriendlyName:"680",SMD0805:"C17798",SMD0603:"C23228",SMD0402:"C25130"},750:{FriendlyName:"750",SMD1206:"C17985",SMD0805:"C17818",SMD0603:"C23241"},820:{FriendlyName:"820",SMD0805:"C17837",SMD0603:"C23253"},1e3:{FriendlyName:"1k",SMD1206:"C4410",SMD0805:"C17513",SMD0603:"C21190",SMD0402:"C11702"},1100:{FriendlyName:"1.1k",SMD0603:"C22764"},1200:{FriendlyName:"1.2k",SMD0805:"C17379",SMD0603:"C22765",SMD0402:"C25862"},1500:{FriendlyName:"1.5k",SMD0805:"C4310",SMD0603:"C22843",SMD0402:"C25867"},1800:{FriendlyName:"1.8k",SMD0805:"C17398",SMD0603:"C4177"},2e3:{FriendlyName:"2k",SMD1206:"C17944",SMD0805:"C17604",SMD0603:"C22975",SMD0402:"C4109"},2200:{FriendlyName:"2.2k",SMD0805:"C17520",SMD0603:"C4190",SMD0402:"C25879"},2400:{FriendlyName:"2.4k",SMD0805:"C17526",SMD0603:"C22940",SMD0402:"C25882"},2700:{FriendlyName:"2.7k",SMD0805:"C17530",SMD0603:"C13167"},3e3:{FriendlyName:"3k",SMD0805:"C17661",SMD0603:"C4211"},3300:{FriendlyName:"3.3k",SMD0805:"C26010",SMD0603:"C22978",SMD0402:"C25890"},3600:{FriendlyName:"3.6k",SMD0805:"C18359",SMD0603:"C22980"},3900:{FriendlyName:"3.9k",SMD0805:"C17614",SMD0603:"C23018",SMD0402:"C51721"},4300:{FriendlyName:"4.3k",SMD0805:"C17667",SMD0603:"C23159"},4700:{FriendlyName:"4.7k",SMD1206:"C17936",SMD0805:"C17673",SMD0603:"C23162",SMD0402:"C25900"},4990:{FriendlyName:"4.99k",SMD0805:"C17677",SMD0603:"C23046"},5100:{FriendlyName:"5.1k",SMD0805:"C27834",SMD0603:"C23186",SMD0402:"C25905"},5600:{FriendlyName:"5.6k",SMD0805:"C4382",SMD0603:"C23189",SMD0402:"C25908"},6200:{FriendlyName:"6.2k",SMD0805:"C17767",SMD0603:"C4260"},6800:{FriendlyName:"6.8k",SMD0805:"C17772",SMD0603:"C23212",SMD0402:"C25917"},7500:{FriendlyName:"7.5k",SMD0805:"C17807",SMD0603:"C23234",SMD0402:"C25918"},8200:{FriendlyName:"8.2k",SMD0805:"C17828",SMD0603:"C25981",SMD0402:"C25924"},9100:{FriendlyName:"9.1k",SMD0805:"C17855",SMD0603:"C23260"},1e4:{FriendlyName:"10k",SMD1206:"C17902",SMD0805:"C17414",SMD0603:"C25804",SMD0402:"C25744"},11e3:{FriendlyName:"11k",SMD0805:"C17429",SMD0603:"C25950"},12e3:{FriendlyName:"12k",SMD0805:"C17444",SMD0603:"C22790",SMD0402:"C25752"},13e3:{FriendlyName:"13k",SMD0805:"C17455",SMD0603:"C22797"},15e3:{FriendlyName:"15k",SMD0805:"C17475",SMD0603:"C22809",SMD0402:"C25756"},16e3:{FriendlyName:"16k",SMD0805:"C17490"},18e3:{FriendlyName:"18k",SMD0805:"C17506",SMD0603:"C25810",SMD0402:"C25762"},2e4:{FriendlyName:"20k",SMD0805:"C4328",SMD0603:"C4184",SMD0402:"C25765"},22e3:{FriendlyName:"22k",SMD0805:"C17560",SMD0603:"C31850",SMD0402:"C25768"},24e3:{FriendlyName:"24k",SMD0805:"C17575",SMD0603:"C23352",SMD0402:"C25769"},27e3:{FriendlyName:"27k",SMD0805:"C17593",SMD0603:"C22967",SMD0402:"C25771"},3e4:{FriendlyName:"30k",SMD0805:"C17621",SMD0603:"C22984"},33e3:{FriendlyName:"33k",SMD0805:"C17633",SMD0603:"C4216",SMD0402:"C25779"},36e3:{FriendlyName:"36k",SMD0805:"C4360",SMD0603:"C23147"},39e3:{FriendlyName:"39k",SMD0805:"C25826",SMD0603:"C23153",SMD0402:"C25783"},40200:{FriendlyName:"40.2k",SMD0603:"C12447"},43e3:{FriendlyName:"43k",SMD0805:"C17695",SMD0603:"C23172"},47e3:{FriendlyName:"47k",SMD0805:"C17713",SMD0603:"C25819",SMD0402:"C25792"},49900:{FriendlyName:"49.9k",SMD0805:"C17719",SMD0603:"C23184",SMD0402:"C25897"},51e3:{FriendlyName:"51k",SMD0805:"C17737",SMD0603:"C23196",SMD0402:"C25794"},56e3:{FriendlyName:"56k",SMD0805:"C17756",SMD0603:"C23206",SMD0402:"C25796"},62e3:{FriendlyName:"62k",SMD0805:"C17783",SMD0603:"C23221"},68e3:{FriendlyName:"68k",SMD0805:"C17801",SMD0603:"C23231",SMD0402:"C36871"},75e3:{FriendlyName:"75k",SMD0805:"C17819",SMD0603:"C23242",SMD0402:"C25798"},82e3:{FriendlyName:"82k",SMD0805:"C17840",SMD0603:"C23254"},91e3:{FriendlyName:"91k",SMD0603:"C23265"},1e5:{FriendlyName:"100k",SMD1206:"C17900",SMD0805:"C149504",SMD0603:"C25803",SMD0402:"C25741"},11e4:{FriendlyName:"110k",SMD0603:"C25805"},12e4:{FriendlyName:"120k",SMD0805:"C17436",SMD0603:"C25808",SMD0402:"C25750"},13e4:{FriendlyName:"130k",SMD0603:"C22795"},15e4:{FriendlyName:"150k",SMD0805:"C17470",SMD0603:"C22807",SMD0402:"C25755"},16e4:{FriendlyName:"160k",SMD0603:"C22813"},18e4:{FriendlyName:"180k",SMD0805:"C17501",SMD0603:"C22827"},2e5:{FriendlyName:"200k",SMD0805:"C17539",SMD0603:"C25811",SMD0402:"C25764"},22e4:{FriendlyName:"220k",SMD0805:"C17556",SMD0603:"C22961",SMD0402:"C25767"},24e4:{FriendlyName:"240k",SMD0603:"C4197"},27e4:{FriendlyName:"270k",SMD0805:"C17589",SMD0603:"C22965"},3e5:{FriendlyName:"300k",SMD0805:"C17616",SMD0603:"C23024",SMD0402:"C25774"},33e4:{FriendlyName:"330k",SMD0805:"C17629",SMD0603:"C23137",SMD0402:"C25778"},36e4:{FriendlyName:"360k",SMD0603:"C23146"},39e4:{FriendlyName:"390k",SMD0805:"C17656",SMD0603:"C23150"},43e4:{FriendlyName:"430k",SMD0603:"C25969"},47e4:{FriendlyName:"470k",SMD0805:"C17709",SMD0603:"C23178",SMD0402:"C25790"},51e4:{FriendlyName:"510k",SMD0805:"C17733",SMD0603:"C23192",SMD0402:"C11616"},56e4:{FriendlyName:"560k",SMD0603:"C23203"},68e4:{FriendlyName:"680k",SMD0805:"C17797",SMD0603:"C25822"},75e4:{FriendlyName:"750k",SMD0603:"C23240"},1e6:{FriendlyName:"1M",SMD1206:"C17927",SMD0805:"C17514",SMD0603:"C22935",SMD0402:"C26083"},12e5:{FriendlyName:"1.2M",SMD1206:"C22107"},15e5:{FriendlyName:"1.5M",SMD0603:"C4172"},2e6:{FriendlyName:"2M",SMD0805:"C26112",SMD0603:"C22976"},22e5:{FriendlyName:"2.2M",SMD0805:"C26113",SMD0603:"C22938"},3e6:{FriendlyName:"3M",SMD0603:"C23156"},47e5:{FriendlyName:"4.7M",SMD0603:"C23163"},51e5:{FriendlyName:"5.1M",SMD0603:"C13320"},1e7:{FriendlyName:"10M",SMD0805:"C26108",SMD0603:"C7250",SMD0402:"C26082"},"0.1":{FriendlyName:"100mR",SMD1206:"C25334"},"2.2":{FriendlyName:"2.2",SMD0805:"C17521",SMD0603:"C22939"},"4.7":{FriendlyName:"4.7",SMD0805:"C17675",SMD0603:"C23164"},"5.1":{FriendlyName:"5.1",SMD0805:"C17724",SMD0603:"C25197"},"49.9":{FriendlyName:"49.9",SMD0805:"C17720",SMD0603:"C23185",SMD0402:"C25120"}};function D(t){return r("div",{class:"hover-copy",onClick:()=>{navigator.clipboard.writeText(t.part)},children:t.part})}function Ee(){console.log(L);const t=Object.keys(L).sort((e,n)=>e-n);return console.log(t),r("div",{class:"resistors",children:r("table",{children:[r("thead",{children:r("tr",{children:[r("td",{children:"Value"}),r("td",{children:[r("img",{class:"resistorHeader",src:d0}),r("div",{children:"1206"})]}),r("td",{children:[r("img",{class:"resistorHeader",src:a0}),r("div",{children:"0805"})]}),r("td",{children:[r("img",{class:"resistorHeader",src:s0}),r("div",{children:"0603"})]}),r("td",{children:[r("img",{class:"resistorHeader",src:h0}),r("div",{children:"0402"})]})]})}),r("tbody",{children:t.map(e=>r("tr",{children:[r("td",{children:r("b",{children:[L[e].FriendlyName," Ω"]})}),r("td",{children:r(D,{part:L[e].SMD1206})}),r("td",{children:r(D,{part:L[e].SMD0805})}),r("td",{children:r(D,{part:L[e].SMD0603})}),r("td",{children:r(D,{part:L[e].SMD0402})})]}))})]})})}function u0(){return r("div",{class:"otherComponents",children:r("table",{children:[r("thead",{children:r("tr",{children:[r("td",{children:"Function"}),r("td",{children:"Manufacturer"}),r("td",{children:"Component"}),r("td",{children:"Footprint"}),r("td",{children:"Part Number"}),r("td",{children:"Notes"})]})}),r("tr",{children:[r("td",{children:"I2C I/O Expander"}),r("td",{children:"Hgsemi"}),r("td",{children:"PCF8574M/TR"}),r("td",{children:"SOP-16-150"}),r("td",{children:r(D,{part:"C5310792"})})]}),r("tr",{children:[r("td",{children:"RS485 Transciever"}),r("td",{children:"Hgsemi"}),r("td",{children:"SP3485EIMM/TR"}),r("td",{children:"MSOP-8"}),r("td",{children:r(D,{part:"C5310822"})})]}),r("tr",{children:[r("td",{children:"5V ESD Protection TVS Diode Array"}),r("td",{children:"ProTek Devices"}),r("td",{children:"SRV05-4-P-T7"}),r("td",{children:"SOT-23-6"}),r("td",{children:r(D,{part:"C85364"})})]}),r("tr",{children:[r("td",{children:"Addressable LED"}),r("td",{children:"XINGLIGHT"}),r("td",{children:"XL-1010RGBC-WS2812B"}),r("td",{children:"1mm x 1mm"}),r("td",{children:r(D,{part:"C5349953"})})]}),r("tr",{children:[r("td",{children:"Connector (JST-SH 4P / Qwiic)"}),r("td",{children:"BOOMELE"}),r("td",{children:"1.0T-4P"}),r("td",{children:"SMD P=1mm Top Entry"}),r("td",{children:r(D,{part:"C145961"})})]}),r("tr",{children:[r("td",{children:"Connector (JST-SH 3P / RP Debug)"}),r("td",{children:"BOOMELE"}),r("td",{children:"1.0T-3P"}),r("td",{children:"SMD P=1mm Top Entry"}),r("td",{children:r(D,{part:"C145960"})})]}),r("tr",{children:[r("td",{children:"Microcontroller"}),r("td",{children:"Raspberry Pi"}),r("td",{children:"RP2040"}),r("td",{children:"LQFN-56 7x7"}),r("td",{children:r(D,{part:"C2040"})})]}),r("tr",{children:[r("td",{children:"12Mhz Crystal"}),r("td",{children:"YXC"}),r("td",{children:"X322512MSB4SI"}),r("td",{children:"SMD3225-4P"}),r("td",{children:r(D,{part:"C9002"})}),r("td",{children:"Note:  Not RP foundation's recommended crystal, but seems to work okay in practice?  YMMV"})]}),r("tr",{children:[r("td",{children:"16MB (128MBit) SPI Flash"}),r("td",{children:"Winbond Elec"}),r("td",{children:"W25Q128JVSIQ"}),r("td",{children:"SMD3225-4P"}),r("td",{children:r(D,{part:"C97521"})})]}),r("tr",{children:[r("td",{children:"2Kbit EUI-48 EEPROM (MAC Address)"}),r("td",{children:"Microchip"}),r("td",{children:"24AA025E48T-I/OT"}),r("td",{children:"SOT-23-6"}),r("td",{children:r(D,{part:"C129895"})})]}),r("tr",{children:[r("td",{children:"TF Card Socket"}),r("td",{children:"Shou Han"}),r("td",{children:"TF PUSH"}),r("td",{children:"SMD"}),r("td",{children:r(D,{part:"C393941"})})]}),r("tr",{children:[r("td",{children:"USB-C Connector (20V/5A 16P)"}),r("td",{children:"HCTL"}),r("td",{children:"HC-TYPE-C-16P-01A"}),r("td",{children:"USB-C SMD"}),r("td",{children:r(D,{part:"C2894897"})})]}),r("tr",{children:[r("td",{children:"SPI Ethernet PHY+MAC"}),r("td",{children:"Wiznet"}),r("td",{children:"W5500"}),r("td",{children:"LQFP-48_7x7"}),r("td",{children:r(D,{part:"C32843"})})]}),r("tr",{children:[r("td",{children:"25Mhz Crystal"}),r("td",{children:"YXC"}),r("td",{children:"X322525MOB4SI"}),r("td",{children:"SMD3225-4P"}),r("td",{children:r(D,{part:"C9006"})}),r("td",{children:"Note:  Works well with W5500"})]}),r("tr",{children:[r("td",{children:"10/100 Ethernet Connector"}),r("td",{children:"HanRun"}),r("td",{children:"HR913550A"}),r("td",{children:"Through Hole"}),r("td",{children:r(D,{part:"C163507"})}),r("td",{children:"Note:  Includes magnetics and LEDs, but not PoE compatible."})]}),r("tr",{children:[r("td",{children:"Optocoupler (AC, 4-channel)"}),r("td",{children:"Everlight"}),r("td",{children:"ELQ3H4(TA)-G"}),r("td",{children:"SSOP-16-1.27mm"}),r("td",{children:r(D,{part:"C150957"})})]}),r("tr",{children:[r("td",{children:"Darlington high current driver array"}),r("td",{children:"Texas Instruments"}),r("td",{children:"ULN2003ADR"}),r("td",{children:"SOIC-16"}),r("td",{children:r(D,{part:"C7512"})})]}),r("tr",{children:[r("td",{children:"3V to 5V Unidirectional Level Shifter"}),r("td",{children:"Texas Instruments"}),r("td",{children:"SN74AHCT1G125DCKR"}),r("td",{children:"SC-70-5"}),r("td",{children:r(D,{part:"C350557"})})]}),r("tr",{children:[r("td",{children:"LED (0603, Red)"}),r("td",{children:"Hubei Kento Elec"}),r("td",{children:"KT-0603R"}),r("td",{children:"0603"}),r("td",{children:r(D,{part:"C2286"})})]}),r("tr",{children:[r("td",{children:"LED (0603, White)"}),r("td",{children:"Hubei Kento Elec"}),r("td",{children:"KT-0603W"}),r("td",{children:"0603"}),r("td",{children:r(D,{part:"C2290"})})]}),r("tr",{children:[r("td",{children:"LED (0603, Yellow)"}),r("td",{children:"Everlight"}),r("td",{children:"19-213/Y2C-CQ2R2L/3T(CY)"}),r("td",{children:"0603"}),r("td",{children:r(D,{part:"C72038"})})]})]})})}function f0(){return r(K,{children:[r(l0,{}),r("main",{children:r(qe,{children:[r(z,{path:"/home",component:c0}),r(z,{path:"/resistors",component:Ee}),r(z,{path:"/other",component:u0}),r(z,{default:!0,component:Ee})]})}),r("footer",{children:r("h4",{children:"All trademarks used within are property of their respective owners.  basicp.art is not affiliated with LCSC or JLCPCB.  By using this site, you accept all risk associated with use, including the risk of inaccurate information in the parts table."})})]})}Ze(r(f0,{}),document.getElementById("app"));