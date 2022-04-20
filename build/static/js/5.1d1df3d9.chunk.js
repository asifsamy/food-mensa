(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[5],{50:function(e,t,n){"use strict";var c=n(52),a=n(6),i=n(53),s=n.n(i),r=n(1);t.a=function(){var e=Object(r.useState)(!1),t=Object(a.a)(e,2),n=t[0],i=t[1],o=Object(r.useState)(null),l=Object(a.a)(o,2),d=l[0],u=l[1],j=Object(r.useCallback)(function(){var e=Object(c.a)(s.a.mark((function e(t,n){var c,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i(!0),u(null),e.prev=2,e.next=5,fetch(t.url,{method:t.method?t.method:"GET",headers:t.headers?t.headers:{},body:t.body?JSON.stringify(t.body):null});case 5:if((c=e.sent).ok){e.next=8;break}throw new Error("Request failed!");case 8:return e.next=10,c.json();case 10:a=e.sent,n(a),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),u(e.t0.message||"Something went wrong!");case 17:i(!1);case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(t,n){return e.apply(this,arguments)}}(),[]);return{isLoading:n,error:d,sendRequest:j}}},51:function(e,t,n){"use strict";var c=n(58),a=n.n(c),i=n(0);t.a=function(e){var t=["button--submit","button--cancel","button--reset","button--edit","button--delete"],n=t.includes(e.buttonStyle)?e.buttonStyle:t[0];return Object(i.jsx)("button",{className:"".concat(a.a.button," ").concat(a.a[n]),type:e.type||"button",onClick:e.onClick,disabled:e.disabled||!1,children:e.children})}},54:function(e,t,n){"use strict";var c=n(1),a=n(65),i=n.n(a),s=n(29),r=n.n(s),o=n(0),l=function(e){return Object(o.jsx)("div",{className:i.a.backdrop,onClick:e.onClose})},d=function(e){return Object(o.jsx)("div",{className:i.a.modal,children:Object(o.jsx)("div",{className:i.a.content,children:e.children})})},u=document.getElementById("overlays");t.a=function(e){return Object(o.jsxs)(c.Fragment,{children:[r.a.createPortal(Object(o.jsx)(l,{onClose:e.onClose}),u),r.a.createPortal(Object(o.jsx)(d,{children:e.children}),u)]})}},55:function(e,t,n){e.exports={actions:"DishItemActions_actions__2WXUm",invalid:"DishItemActions_invalid__3QL1c"}},56:function(e,t,n){"use strict";var c=n(59),a=n.n(c),i=n(0);t.a=function(e){return Object(i.jsx)("div",{className:a.a.card,children:e.children})}},57:function(e,t,n){e.exports={dishes:"AvailableDishes_dishes__Csb6N","dishes-appear":"AvailableDishes_dishes-appear__3Pufg",dishesLoading:"AvailableDishes_dishesLoading__c-p27",fetchDishesError:"AvailableDishes_fetchDishesError__svuCw"}},58:function(e,t,n){e.exports={button:"Button_button__2jVP6","button--cancel":"Button_button--cancel__lkgVB","button--reset":"Button_button--reset__1xpYZ","button--submit":"Button_button--submit__c9QIc","button--edit":"Button_button--edit__2Td8g","button--delete":"Button_button--delete__1_Zsw"}},59:function(e,t,n){e.exports={card:"Card_card__YEWXs"}},60:function(e,t,n){"use strict";var c=n(20),a=n(51),i=n(21),s=n(61),r=n.n(s),o=n(0),l=function(e){return""!==e},d=function(e){return e>0};t.a=function(e){var t=Object(c.a)(l,e.item?e.item.name:""),n=t.value,s=t.isValid,u=t.hasError,j=t.valueChangeHandler,b=t.inputBlurHandler,h=t.reset,m=Object(c.a)(l,e.item?e.item.description:""),p=m.value,O=m.isValid,f=m.hasError,x=m.valueChangeHandler,v=m.inputBlurHandler,_=m.reset,g=Object(c.a)(d,e.item?e.item.price:""),N=g.value,y=g.isValid,C=g.hasError,S=g.valueChangeHandler,D=g.inputBlurHandler,I=g.reset,w=!1;s&&O&&y&&(w=!0);return Object(o.jsx)("div",{children:Object(o.jsxs)("form",{className:r.a.form,onSubmit:function(t){t.preventDefault(),w&&e.onConfirm({name:n,description:p,price:N})},children:[Object(o.jsx)(i.a,{label:"Name",id:"name",type:"text",value:n,onChange:j,onBlur:b,errorStyling:u}),u&&Object(o.jsx)("p",{className:r.a.invalid,children:"Please enter a valid name!"}),Object(o.jsx)(i.a,{label:"Description",id:"description",type:"textarea",value:p,onChange:x,onBlur:v,errorStyling:f}),f&&Object(o.jsx)("p",{className:r.a.invalid,children:"Please enter a valid name!"}),Object(o.jsx)(i.a,{label:"Price",id:"price",type:"number",min:"1",step:"any",value:N,onChange:S,onBlur:D,errorStyling:C}),C&&Object(o.jsx)("p",{className:r.a.invalid,children:"Please enter a valid name!"}),Object(o.jsxs)("div",{className:r.a.actions,children:[Object(o.jsx)(a.a,{buttonStyle:"button--reset",onClick:function(){_(),h(),I()},children:"Reset"}),Object(o.jsx)(a.a,{buttonStyle:"button--edit",type:"submit",disabled:!w,children:e.item?"Update":"Add New Dish"})]})]})})}},61:function(e,t,n){e.exports={form:"NewDishItemForm_form__W9czV",actions:"NewDishItemForm_actions__1xZvE",invalid:"NewDishItemForm_invalid__3k6oU"}},62:function(e,t,n){"use strict";var c=n(6),a=n(1),i=n(3),s=n(9),r=n(16),o=n(50),l=n(63),d=n(0),u=function(e){switch(e){case 0:return Object(d.jsx)(l.a,{color:"grey"});case 50:return Object(d.jsx)(l.b,{color:"orange"});case 100:return Object(d.jsx)(l.a,{color:"orange"});default:return}},j=function(e){for(var t=[],n=parseFloat(e).toString().split("."),a=Object(c.a)(n,2),i=a[0],s=a[1],r=0;r<i;r++)t.push(100);s&&t.push(50);for(var o=i;o<(s?4:5);o++)t.push(0);return t},b=function(e){var t=e.ratingValue;return Object(d.jsx)(a.Fragment,{children:j(t).map((function(e,t){return Object(d.jsx)("span",{children:u(e)},t)}))})},h=function(e){var t=e.dishItemId,n=Object(a.useState)(0),i=Object(c.a)(n,2),s=i[0],r=i[1],l=Object(o.a)().sendRequest;return Object(a.useEffect)((function(){l({url:"https://mensa-app-80da4-default-rtdb.firebaseio.com/reviews/".concat(t,".json")},(function(e){var t=[],n=0;for(var c in e)t.push(e[c].rating),n+=e[c].rating;if(t.length>0){var a=function(e){var t=Math.abs(e)-Math.floor(e);return t>=0&&t<.26?Math.floor(e):t>.75&&t<1?Math.ceil(e):Math.floor(e)+.5}(Number(n/t.length).toFixed(2));r(a)}}))}),[t,l]),Object(d.jsx)(b,{ratingValue:s})},m=n(66),p=n.n(m),O=n(52),f=n(53),x=n.n(f),v=n(51),_=n(27),g=n(54),N=n(55),y=n.n(N),C=function(e){var t=Object(a.useState)(!0),n=Object(c.a)(t,2),i=n[0],s=n[1],r=Object(a.useState)(!1),l=Object(c.a)(r,2),u=l[0],j=l[1],b=Object(o.a)(),h=b.isLoading,m=b.error,p=b.sendRequest,O=function(){s(!1),j(!1),e.callDeleteState(!1)},f=function(){j(!0),e.deleteById(e.id)},x=Object(d.jsxs)(a.Fragment,{children:[Object(d.jsx)("p",{children:"Are you sure! You want to delete this dish item!"}),Object(d.jsxs)("div",{className:y.a.actions,children:[Object(d.jsx)(v.a,{buttonStyle:"button--cancel",onClick:O,children:"Cancel"}),Object(d.jsx)(v.a,{buttonStyle:"button--delete",onClick:function(){p({url:"https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes/".concat(e.id,".json"),method:"DELETE"},f)},children:"Confirm"})]})]}),N=Object(d.jsx)("div",{className:"centered",children:Object(d.jsx)(_.a,{})}),C=Object(d.jsxs)(a.Fragment,{children:[Object(d.jsx)("p",{children:"The Dish item has been deleted successfully!Reload the page to see the changes!"}),Object(d.jsx)("div",{className:y.a.actions,children:Object(d.jsx)(v.a,{buttonStyle:"button--cancel",onClick:O,children:"Close"})})]}),S=Object(d.jsx)("div",{className:y.a.actions,children:Object(d.jsx)("p",{className:y.a.invalid,children:m})});return Object(d.jsx)("div",{children:i&&Object(d.jsxs)(g.a,{onClose:O,children:[!u&&!h&&!m&&x,h&&N,u&&!h&&C,m&&S]})})},S=n(60),D=function(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2),i=n[0],s=n[1],r=Object(a.useState)(!1),l=Object(c.a)(r,2),u=l[0],j=l[1],b=Object(a.useState)(!1),h=Object(c.a)(b,2),m=h[0],p=h[1],f=Object(o.a)(),N=f.isLoading,D=f.error,I=f.sendRequest,w=function(){s(!1),j(!1)},k=function(t){j(!0),e.onUpdateItem({id:e.item.id,name:t.name,description:t.description,price:t.price})},F=function(){var t=Object(O.a)(x.a.mark((function t(n){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:I({url:"https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes/".concat(e.item.id,".json"),method:"PUT",headers:{"Content-Type":"application/json"},body:{name:n.name,description:n.description,price:+n.price}},k.bind(null,n));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),A=Object(d.jsxs)(a.Fragment,{children:[Object(d.jsx)(S.a,{item:e.item,onConfirm:F}),Object(d.jsx)("div",{className:y.a.actions,children:Object(d.jsx)(v.a,{buttonStyle:"button--cancel",onClick:w,children:"Cancel"})})]}),E=Object(d.jsx)("div",{className:"centered",children:Object(d.jsx)(_.a,{})}),B=Object(d.jsxs)(a.Fragment,{children:[Object(d.jsx)("p",{children:"The Dish item is updated successfully! Reload the page to see changes!"}),Object(d.jsx)("div",{className:y.a.actions,children:Object(d.jsx)(v.a,{buttonStyle:"button--cancel",onClick:w,children:"Close"})})]}),L=Object(d.jsx)("div",{className:y.a.actions,children:Object(d.jsx)("p",{className:y.a.invalid,children:D})}),P=Object(d.jsx)(C,{id:e.item.id,callDeleteState:p,deleteById:e.onDelete});return Object(d.jsxs)(a.Fragment,{children:[Object(d.jsx)(v.a,{buttonStyle:"button--edit",onClick:function(){s(!0)},children:"Update"}),Object(d.jsx)(v.a,{buttonStyle:"button--delete",onClick:function(){p(!0)},children:"Delete"}),i&&Object(d.jsxs)(g.a,{onClose:w,children:[!N&&!u&&A,N&&E,!N&&u&&B,D&&L]}),m&&P]})},I=n(67),w=n.n(I),k=function(e){var t=Object(a.useRef)(),n=Object(a.useState)(!0),i=Object(c.a)(n,2),s=i[0],r=i[1];return Object(d.jsxs)("form",{className:w.a.form,onSubmit:function(n){n.preventDefault();var c=t.current.value,a=+c;0===c.trim().length||a<1||a>5?r(!1):e.onAddToCart(a)},children:[Object(d.jsxs)("div",{className:w.a.input,children:[Object(d.jsx)("label",{htmlFor:e.id,children:"Amount"}),Object(d.jsx)("input",{id:"amount_".concat(e.id),ref:t,type:"number",min:"1",max:"5",step:"1",defaultValue:"1"})]}),Object(d.jsx)(v.a,{type:"submit",children:"+ Add"}),!s&&Object(d.jsx)("p",{children:"Please enter a valid amount(1-5)"})]})};t.a=function(e){var t=Object(a.useState)({id:e.id,name:e.name,price:e.price,description:e.description}),n=Object(c.a)(t,2),o=n[0],l=n[1],u=Object(i.h)(),j=/admin+\W*/.test(u.pathname),b="\u20ac".concat(Number(o.price).toFixed(2)),m=Object(a.useContext)(r.a),O={id:o.id,name:o.name,price:o.price,description:o.description};return Object(d.jsxs)("li",{className:p.a.dish,children:[Object(d.jsxs)("div",{children:[j?Object(d.jsx)("h3",{children:o.name}):Object(d.jsx)(s.b,{to:"/dishes/".concat(e.id),children:Object(d.jsx)("h3",{children:o.name})}),Object(d.jsx)("div",{className:p.a.description,children:o.description}),Object(d.jsx)("div",{className:p.a.price,children:b}),Object(d.jsx)(h,{dishItemId:e.id})]}),Object(d.jsxs)("div",{children:[j&&Object(d.jsx)(D,{item:O,onUpdateItem:function(e){l(e)},onDelete:e.onDeleteItem}),!j&&Object(d.jsx)(k,{id:e.id,onAddToCart:function(t){m.addItem({id:e.id,name:e.name,amount:t,price:e.price})}})]})]})}},65:function(e,t,n){e.exports={backdrop:"Modal_backdrop__HtLmJ",modal:"Modal_modal__2L3_b","slide-down":"Modal_slide-down__19PJI",content:"Modal_content__G3IwK"}},66:function(e,t,n){e.exports={dish:"DishItem_dish__2Aya-",description:"DishItem_description__2dLwp",price:"DishItem_price__HVKAF"}},67:function(e,t,n){e.exports={form:"DishItemForm_form__1ySFI",input:"DishItemForm_input__HEXzg"}},68:function(e,t,n){"use strict";var c=n(23),a=n(6),i=n(1),s=n(50),r=n(56),o=n(27),l=n(52),d=n(53),u=n.n(d),j=n(51),b=n(54),h=n(55),m=n.n(h),p=n(60),O=n(0),f=function(e){var t=Object(i.useState)(!0),n=Object(a.a)(t,2),c=n[0],r=n[1],d=Object(i.useState)(!1),h=Object(a.a)(d,2),f=h[0],x=h[1],v=Object(s.a)(),_=v.isLoading,g=v.error,N=v.sendRequest,y=function(){r(!1),x(!1),e.callNewDishState(!1)},C=function(t,n){x(!0);var c=n.name,a={id:c,name:t.name,description:t.description,price:t.price};e.onAddNewDishItem(a),console.log(c)},S=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N({url:"https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes.json",method:"POST",headers:{"Content-Type":"application/json"},body:{name:t.name,description:t.description,price:t.price}},C.bind(null,t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=Object(O.jsxs)(i.Fragment,{children:[Object(O.jsx)(p.a,{onConfirm:S}),Object(O.jsx)("div",{className:m.a.actions,children:Object(O.jsx)(j.a,{buttonStyle:"button--cancel",onClick:y,children:"Close"})})]}),I=Object(O.jsx)("div",{className:"centered",children:Object(O.jsx)(o.a,{})}),w=Object(O.jsxs)(i.Fragment,{children:[Object(O.jsx)("p",{children:"A New Dish Item is added successfully! Reload the page to see changes!"}),Object(O.jsx)("div",{className:m.a.actions,children:Object(O.jsx)(j.a,{buttonStyle:"button--cancel",onClick:y,children:"Close"})})]}),k=Object(O.jsx)("div",{className:m.a.actions,children:Object(O.jsx)("p",{className:m.a.invalid,children:g})});return Object(O.jsx)("div",{children:c&&Object(O.jsxs)(b.a,{onClose:y,children:[!_&&!f&&D,_&&I,!_&&f&&w,g&&k]})})},x=n(57),v=n.n(x),_=n(62),g=n(3);t.a=function(){var e=Object(i.useState)([]),t=Object(a.a)(e,2),n=t[0],l=t[1],d=Object(i.useState)(!1),u=Object(a.a)(d,2),j=u[0],b=u[1],h=Object(g.h)(),m=/admin+\W*/.test(h.pathname),p=Object(s.a)(),x=p.isLoading,N=p.error,y=p.sendRequest;Object(i.useEffect)((function(){y({url:"https://mensa-app-80da4-default-rtdb.firebaseio.com/dishes.json"},(function(e){var t=[];for(var n in e)t.push({id:n,name:e[n].name,description:e[n].description,price:e[n].price});l(t)}))}),[y]);var C=function(e){var t=Object(c.a)(n),a=n.findIndex((function(t){return t.id===e}));t.splice(a,1),l(t)},S=n.map((function(e){return Object(O.jsx)(_.a,{id:e.id,name:e.name,description:e.description,price:e.price,onDeleteItem:C},e.id)}));if(x)return Object(O.jsx)("section",{className:v.a.dishesLoading,children:Object(O.jsx)(o.a,{})});if(N)return Object(O.jsx)("section",{className:v.a.fetchDishesError,children:Object(O.jsx)("p",{children:N})});var D=Object(O.jsxs)(i.Fragment,{children:[j&&Object(O.jsx)(f,{onAddNewDishItem:function(e){l((function(t){return t.concat(e)}))},callNewDishState:b}),Object(O.jsx)("div",{className:"centered",children:Object(O.jsx)("button",{className:"uni-button",type:"button",onClick:function(){b(!0)},children:"Add a New Dish Item"})}),Object(O.jsx)("h2",{className:"centered",children:"All Available Dish Items"})]});return Object(O.jsxs)(i.Fragment,{children:[m&&D,Object(O.jsx)("section",{className:v.a.dishes,children:Object(O.jsx)(r.a,{children:Object(O.jsx)("ul",{children:S})})})]})}},76:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(28),i=n(68),s=n(0);t.default=function(){return Object(s.jsxs)(c.Fragment,{children:[Object(s.jsxs)(a.a,{children:[Object(s.jsx)("title",{children:"Food Mensa - All Dish Items"}),Object(s.jsx)("meta",{name:"description",content:"All available Dish items"})]}),Object(s.jsx)(i.a,{})]})}}}]);
//# sourceMappingURL=5.1d1df3d9.chunk.js.map