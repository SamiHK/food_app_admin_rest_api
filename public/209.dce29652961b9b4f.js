"use strict";(self.webpackChunkfoodapp=self.webpackChunkfoodapp||[]).push([[209],{7209:(N,T,a)=>{a.r(T),a.d(T,{CheckoutModule:()=>de});var u=a(9808),_=a(3477),h=a(5861),v=a(2205),p=a(1106),e=a(4893),C=a(1023),x=a(104),m=a(6395),g=a(9633),n=a(5033),l=a(2382),A=a(1728);function S(r,c){if(1&r&&(e.TgZ(0,"h6"),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.formattedAddress)}}function U(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body"),e.TgZ(2,"c-form-check"),e.TgZ(3,"input",30),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw(3).selectedAddress=s}),e.qZA(),e.TgZ(4,"label",31),e.TgZ(5,"span"),e.YNc(6,S,2,1,"h6",32),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=c.$implicit,o=e.oxw(3);e.xp6(3),e.s9C("id",t.id),e.Q6J("ngModel",o.selectedAddress)("value",t),e.xp6(1),e.s9C("for",t.id),e.xp6(2),e.Q6J("ngIf",t.formattedAddress)}}function w(r,c){if(1&r&&(e.TgZ(0,"c-row",5),e.TgZ(1,"c-col"),e.TgZ(2,"h4"),e._uU(3,"Registered Addresses"),e.qZA(),e.YNc(4,U,7,5,"c-card",29),e.qZA(),e.qZA()),2&r){const t=e.oxw(2);e.xp6(4),e.Q6J("ngForOf",t.addresses)}}function L(r,c){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const t=c.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}function M(r,c){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const t=c.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}function I(r,c){if(1&r&&(e.TgZ(0,"option",33),e._uU(1),e.qZA()),2&r){const t=c.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}function F(r,c){if(1&r){const t=e.EpF();e.YNc(0,w,5,1,"c-row",10),e.TgZ(1,"c-row",11),e.TgZ(2,"c-col"),e.TgZ(3,"h4"),e._uU(4,"Register new address"),e.qZA(),e.TgZ(5,"c-card"),e.TgZ(6,"c-card-body"),e.TgZ(7,"form",12),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().save()}),e.TgZ(8,"fieldset",13),e.TgZ(9,"div",14),e.TgZ(10,"input",15),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw().addressLine1=s}),e.qZA(),e.TgZ(11,"label",16),e._uU(12,"Address"),e.qZA(),e.qZA(),e.TgZ(13,"c-row",17),e.TgZ(14,"c-col",18),e.TgZ(15,"div",14),e.TgZ(16,"select",19),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw().selectedCountry=s}),e._UZ(17,"option",20),e.YNc(18,L,2,2,"option",21),e.qZA(),e.TgZ(19,"label",22),e._uU(20,"Country"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(21,"c-col",18),e.TgZ(22,"div",14),e.TgZ(23,"select",23),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw().selectedState=s}),e._UZ(24,"option",20),e.YNc(25,M,2,2,"option",21),e.qZA(),e.TgZ(26,"label",24),e._uU(27,"State"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(28,"c-col",18),e.TgZ(29,"div",14),e.TgZ(30,"select",25),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw().selectedCity=s}),e._UZ(31,"option",20),e.YNc(32,I,2,2,"option",21),e.qZA(),e.TgZ(33,"label",26),e._uU(34,"City"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(35,"c-row"),e.TgZ(36,"c-col",27),e.TgZ(37,"button",28),e._uU(38," Register New Address "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=e.oxw();e.Q6J("ngIf",t.addresses&&t.addresses.length>0),e.xp6(10),e.Q6J("ngModel",t.addressLine1),e.xp6(3),e.Q6J("gutter",3),e.xp6(3),e.Q6J("ngModel",t.selectedCountry),e.xp6(2),e.Q6J("ngForOf",t.countries),e.xp6(5),e.Q6J("ngModel",t.selectedState)("disabled",!t.selectedCountry),e.xp6(2),e.Q6J("ngForOf",t.states),e.xp6(5),e.Q6J("ngModel",t.selectedCity)("disabled",!t.selectedState),e.xp6(2),e.Q6J("ngForOf",t.cities)}}let O=(()=>{class r{constructor(t,o,s,i,d){this.addressService=t,this.orderService=o,this.settingService=s,this.branchStore=i,this.cartStore=d,this.countryListLoading=!1,this.stateListLoading=!1,this.cityListLoading=!1}ngOnInit(){this.loadCountries(),this.cartStore.select("cart").subscribe(t=>{this.cart=t,this.isDelivery=this.cart.isDelivery,this.loadCustomerAddresses()}),this.branchStore.select("branch").subscribe(t=>{this.branch=t})}loadCustomerAddresses(){this.cart&&this.cart.customer&&this.addressService.getCustomerAddress(this.cart.customer.id).subscribe(t=>{var o;this.addresses=t,this.cart&&this.cart.address&&(this.selectedAddress=null===(o=this.addresses)||void 0===o?void 0:o.find(s=>{var i,d;return s.id==(null===(d=null===(i=this.cart)||void 0===i?void 0:i.address)||void 0===d?void 0:d.id)}))})}loadCountries(){var t=this;return(0,h.Z)(function*(){t.countryListLoading=!0,yield t.addressService.countries().forEach(o=>t.countries=o),t.countryListLoading=!1,t.branch&&t.branch.address&&t.branch.address.country&&t.branch.address.country.shortName&&t.countries&&(t.selectedCountry=t.countries.find(o=>{var s,i,d;return o.shortName==(null===(d=null===(i=null===(s=t.branch)||void 0===s?void 0:s.address)||void 0===i?void 0:i.country)||void 0===d?void 0:d.shortName)}),t.selectedCountry&&t.selectedCountry.shortName&&t.loadStates(t.selectedCountry.shortName))})()}onSelectCountry(t){t&&this.selectedCountry&&this.selectedCountry.shortName&&this.loadStates(this.selectedCountry.shortName)}onSelectState(t){var o;t&&this.selectedState&&this.selectedState.id&&this.loadCities(null===(o=this.selectedState)||void 0===o?void 0:o.id)}onSelectCity(t){}loadStates(t){var o=this;return(0,h.Z)(function*(){var s;o.stateListLoading=!0,yield o.addressService.states(t).forEach(i=>o.states=i),o.stateListLoading=!1,o.branch&&o.branch.address&&o.branch.address.state&&o.branch.address.state.id&&(o.selectedState=null===(s=o.states)||void 0===s?void 0:s.find(i=>{var d,Z,f;return i.id==(null===(f=null===(Z=null===(d=o.branch)||void 0===d?void 0:d.address)||void 0===Z?void 0:Z.state)||void 0===f?void 0:f.id)}),o.selectedState&&o.selectedState.id&&o.loadCities(o.selectedState.id))})()}loadCities(t,o){var s=this;return(0,h.Z)(function*(){var i;s.cityListLoading=!0,yield s.addressService.cities(t,o).forEach(d=>s.cities=d),s.cityListLoading=!1,s.branch&&s.branch.address&&s.branch.address.city&&s.branch.address.city.id&&(s.selectedCity=null===(i=s.cities)||void 0===i?void 0:i.find(d=>{var Z,f,q;return d.id==(null===(q=null===(f=null===(Z=s.branch)||void 0===Z?void 0:Z.address)||void 0===f?void 0:f.city)||void 0===q?void 0:q.id)}))})()}ngOnDestroy(){}save(){var t=this;return(0,h.Z)(function*(){var o,s,i,d;t.cart&&t.cart.customer&&t.cart.customer.id&&t.selectedCity&&t.selectedCity.id&&(yield t.addressService.saveCustomerAddress(null===(s=null===(o=t.cart)||void 0===o?void 0:o.customer)||void 0===s?void 0:s.id,{addressLine1:t.addressLine1,cityId:t.selectedCity.id,cityName:t.selectedCity.name,stateName:null===(i=t.selectedState)||void 0===i?void 0:i.name,countryName:null===(d=t.selectedCountry)||void 0===d?void 0:d.name,latLng:void 0}).subscribe(Z=>t.addresses=Z))})()}updateCardDelivery(){this.cartStore.dispatch((0,p.c5)())}createOrder(){if(this.cart){let t=Object.assign(Object.assign({},this.cart),{subTotal:this.cart.subTotal,address:this.selectedAddress});t.status=t.isDelivery?v.i.ACCEPTED:v.i.COMPLETED,t.gst=this.settingService.getGST(),t.deliveryCharges=this.settingService.getDeliveryCharges(),t.total&&(t.subTotal&&t.gst&&(t.total+=t.subTotal*(t.gst/100)),t.subTotal&&t.deliveryCharges&&(t.total+=t.deliveryCharges)),this.orderService.create(t).forEach(o=>{this.cartStore.dispatch((0,p.YW)())}).catch(o=>{this.selectedAddress&&this.cartStore.dispatch((0,p.h1)(this.selectedAddress))})}}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(C.D),e.Y36(x.p),e.Y36(m.Q),e.Y36(g.yh),e.Y36(g.yh))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-address"]],decls:16,vars:3,consts:[[1,"d-flex","gap-2","justify-content-end"],[3,"switch"],["cFormCheckInput","","type","checkbox",3,"ngModel","ngModelChange"],["cFormCheckLabel","","for","isDelivery"],[3,"ngIf"],[1,"mt-2"],[1,"d-flex","justify-content-between"],["cButton","","variant","outline","routerLink","../customer"],["cIcon","","name","cilChevronLeft"],["cButton","","variant","outline",3,"click"],["class","mt-2",4,"ngIf"],[1,"mt-4"],[3,"ngSubmit"],[1,"d-flex","flex-column","gap-3"],["cFormFloating",""],["cFormControl","","id","addressLine1","name","addressLine1","placeholder","Address",3,"ngModel","ngModelChange"],["cLabel","","id","addressLine1"],[3,"gutter"],["md","4","sm","12"],["cSelect","","id","country","name","country","placeholder","Country",3,"ngModel","ngModelChange"],["value","undefined"],[3,"ngValue",4,"ngFor","ngForOf"],["cLabel","","id","country"],["cSelect","","id","state","name","state","placeholder","State",3,"ngModel","disabled","ngModelChange"],["cLabel","","id","state"],["cSelect","","id","city","name","city","placeholder","City",3,"ngModel","disabled","ngModelChange"],["cLabel","","id","city"],[1,"d-flex","justify-content-end"],["cButton","","type","submit"],[4,"ngFor","ngForOf"],["cFormCheckInput","","name","selectedAddress","type","radio",3,"ngModel","value","id","ngModelChange"],["cFormCheckLabel","",3,"for"],[4,"ngIf"],[3,"ngValue"]],template:function(t,o){1&t&&(e.TgZ(0,"c-row"),e.TgZ(1,"c-col",0),e.TgZ(2,"c-form-check",1),e.TgZ(3,"input",2),e.NdJ("ngModelChange",function(i){return o.isDelivery=i})("ngModelChange",function(){return o.updateCardDelivery()}),e.qZA(),e.TgZ(4,"label",3),e._uU(5,"Is Delivery"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(6,F,39,11,"ng-template",4),e.TgZ(7,"c-row",5),e.TgZ(8,"c-col"),e.TgZ(9,"c-card"),e.TgZ(10,"c-card-body",6),e.TgZ(11,"a",7),e.O4$(),e._UZ(12,"svg",8),e._uU(13," Customer "),e.qZA(),e.kcU(),e.TgZ(14,"a",9),e.NdJ("click",function(){return o.createOrder()}),e._uU(15," Create Order "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("switch",!0),e.xp6(1),e.Q6J("ngModel",o.isDelivery),e.xp6(3),e.Q6J("ngIf",o.isDelivery))},directives:[n.iok,n.Yp0,n.FzQ,n.yfq,l.Wl,l.JJ,l.On,n.NWu,u.O5,n.AkF,n.yue,_.yS,n.Hq3,A.ar,l._Y,l.JL,l.F,n.xPZ,n.oHf,l.Fj,n.eFW,n.Aij,n.nqR,l.EJ,l.YN,l.Kr,u.sg,l._],styles:[""]}),r})();var y=a(302);function k(r,c){if(1&r&&(e.TgZ(0,"small",26),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.hij("",t.unit," x ")}}function E(r,c){if(1&r&&(e.TgZ(0,"small",27),e._uU(1),e.ALo(2,"currency"),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(e.xi3(2,1,t.price,"Pkr. "))}}function J(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body",7),e.TgZ(2,"span",8),e.TgZ(3,"span",9),e._UZ(4,"img",10),e.TgZ(5,"h6",11),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"span",12),e.TgZ(8,"button",13),e.NdJ("click",function(){const i=e.CHM(t).$implicit;return e.oxw().removeItemFromCart(i)}),e.O4$(),e._UZ(9,"svg",14),e.qZA(),e.qZA(),e.qZA(),e.kcU(),e.TgZ(10,"span",15),e.YNc(11,k,2,1,"small",16),e.YNc(12,E,3,4,"small",17),e.qZA(),e.TgZ(13,"span",8),e.TgZ(14,"span",18),e.TgZ(15,"button",19),e.NdJ("click",function(){const i=e.CHM(t).$implicit;return e.oxw().reduceItemInCart(i)}),e.O4$(),e._UZ(16,"svg",20),e.qZA(),e.kcU(),e.TgZ(17,"a",21),e._uU(18),e.qZA(),e.TgZ(19,"button",22),e.NdJ("click",function(){const i=e.CHM(t).$implicit;return e.oxw().addItemToCart(i)}),e.O4$(),e._UZ(20,"svg",23),e.qZA(),e.qZA(),e.kcU(),e.TgZ(21,"span"),e.TgZ(22,"c-badge",24),e.TgZ(23,"span",25),e._uU(24),e.ALo(25,"currency"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=c.$implicit;e.xp6(4),e.Q6J("src",t.primaryImg,e.LSH),e.xp6(2),e.Oqu(t.title),e.xp6(5),e.Q6J("ngIf",t.unit),e.xp6(1),e.Q6J("ngIf",t.price),e.xp6(6),e.hij(" ",t.quantity," "),e.xp6(6),e.Oqu(e.xi3(25,6,t.total,"Pkr. "))}}let R=(()=>{class r{constructor(t){this.cartStore=t,this.cart=new y.A}ngOnInit(){this.cartStore.select("cart").forEach(t=>this.cart=t)}removeItemFromCart(t){t&&t.id&&this.cartStore.dispatch((0,p.D9)({id:t.id}))}reduceItemInCart(t){t&&t.id&&this.cartStore.dispatch((0,p.B8)({id:t.id}))}addItemToCart(t){t&&this.cartStore.dispatch((0,p.X7)(t))}changeDelivery(){this.cartStore.dispatch((0,p.c5)())}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(g.yh))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-cart"]],decls:13,vars:1,consts:[[4,"ngFor","ngForOf"],[1,"mt-2"],[1,"d-flex","justify-content-between"],["cButton","","variant","outline","routerLink","/public/menu"],["cIcon","","name","cilChevronLeft"],["cButton","","variant","outline","routerLink","../customer"],["cIcon","","name","cilChevronRight"],[1,"d-flex","flex-column","gap-2"],[1,"d-flex","justify-content-between","align-items-center"],[1,"d-flex","align-items-center","gap-2"],["cImg","",1,"img-xs","rounded-3",3,"src"],[1,"mb-0"],[1,"d-flex"],["cButton","","color","danger","variant","ghost","size","sm",3,"click"],["cIcon","","name","cilX","size","sm"],[1,"d-flex","gap-2","align-items-center"],["class","fw-regular",4,"ngIf"],["class","fs-6 fw-regular",4,"ngIf"],[1,"align-items-center"],["cButton","","size","sm","color","danger",1,"rounded-0","rounded-start",3,"click"],["cIcon","","name","cilMinus","size","sm"],["cButton","","color","light","size","sm",1,"border","broder-0","rounded-0"],["cButton","","size","sm","color","danger",1,"rounded-0","rounded-end",3,"click"],["cIcon","","name","cilPlus","size","sm"],["color","danger"],[1,"fs-6","fw-semibold"],[1,"fw-regular"],[1,"fs-6","fw-regular"]],template:function(t,o){1&t&&(e.TgZ(0,"c-row"),e.TgZ(1,"c-col"),e.YNc(2,J,26,9,"c-card",0),e.qZA(),e.qZA(),e.TgZ(3,"c-row",1),e.TgZ(4,"c-col"),e.TgZ(5,"c-card"),e.TgZ(6,"c-card-body",2),e.TgZ(7,"a",3),e.O4$(),e._UZ(8,"svg",4),e._uU(9," Add Item "),e.qZA(),e.kcU(),e.TgZ(10,"a",5),e._uU(11," Continue "),e.O4$(),e._UZ(12,"svg",6),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("ngForOf",o.cart.items))},directives:[n.iok,n.Yp0,u.sg,n.AkF,n.yue,_.yS,n.Hq3,A.ar,u.O5,n.FN3],pipes:[u.H9],styles:[""]}),r})();function Q(r,c){1&r&&(e.TgZ(0,"c-row"),e.TgZ(1,"c-col"),e.TgZ(2,"c-card"),e.TgZ(3,"c-card-body",2),e.TgZ(4,"span"),e._uU(5," Cart is Empty "),e.qZA(),e.TgZ(6,"button",3),e._uU(7,"Create New Order"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA())}function Y(r,c){if(1&r&&(e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body"),e.TgZ(2,"span",16),e._uU(3),e.qZA(),e.qZA(),e.qZA()),2&r){const t=e.oxw(2);e.xp6(3),e.Oqu(t.cart.customer.fullName)}}function B(r,c){if(1&r&&(e.TgZ(0,"span",14),e.TgZ(1,"span",15),e._uU(2,"GST"),e.qZA(),e.TgZ(3,"span",16),e._uU(4),e.ALo(5,"currency"),e.qZA(),e.qZA()),2&r){const t=e.oxw(2);e.xp6(4),e.AsE("",t.gst,"% - ",e.xi3(5,2,t.cart.subTotal*(t.gst/100),"Pkr "),"")}}function $(r,c){if(1&r&&(e.TgZ(0,"c-row",4),e.TgZ(1,"c-col"),e.TgZ(2,"c-row",5),e.TgZ(3,"c-col"),e.TgZ(4,"c-nav",6),e.TgZ(5,"c-nav-item"),e.TgZ(6,"a",7),e._uU(7," Cart "),e.O4$(),e._UZ(8,"svg",8),e.qZA(),e.qZA(),e.kcU(),e.TgZ(9,"c-nav-item"),e.TgZ(10,"a",9),e._uU(11," Customer "),e.O4$(),e._UZ(12,"svg",8),e.qZA(),e.qZA(),e.kcU(),e.TgZ(13,"c-nav-item"),e.TgZ(14,"a",10),e._uU(15," Address "),e.O4$(),e._UZ(16,"svg",8),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.kcU(),e.TgZ(17,"c-row"),e.TgZ(18,"c-col",11),e._UZ(19,"router-outlet"),e.qZA(),e.TgZ(20,"c-col",12),e.YNc(21,Y,4,1,"c-card",13),e.TgZ(22,"c-card"),e.TgZ(23,"c-card-body"),e.TgZ(24,"span",14),e.TgZ(25,"span",15),e._uU(26,"Total items"),e.qZA(),e.TgZ(27,"span",16),e._uU(28),e.qZA(),e.qZA(),e.TgZ(29,"span",14),e.TgZ(30,"span",15),e._uU(31,"Sub total"),e.qZA(),e.TgZ(32,"span",16),e._uU(33),e.ALo(34,"currency"),e.qZA(),e.qZA(),e.TgZ(35,"span",14),e.TgZ(36,"span",15),e._uU(37,"Delivery charges"),e.qZA(),e.TgZ(38,"span",16),e._uU(39),e.ALo(40,"currency"),e.qZA(),e.qZA(),e.YNc(41,B,6,5,"span",17),e.TgZ(42,"span",14),e.TgZ(43,"span",18),e._uU(44,"Total"),e.qZA(),e.TgZ(45,"span",18),e._uU(46),e.ALo(47,"currency"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&r){const t=e.oxw();e.xp6(2),e.Q6J("gutter",3),e.xp6(19),e.Q6J("ngIf",t.cart.customer),e.xp6(7),e.Oqu(t.cart.items.length),e.xp6(5),e.Oqu(e.xi3(34,7,t.cart.subTotal,"Pkr ")),e.xp6(6),e.Oqu(e.xi3(40,10,t.deliveryCharges,"Pkr ")),e.xp6(2),e.Q6J("ngIf",t.gst),e.xp6(5),e.Oqu(e.xi3(47,13,t.total,"Pkr "))}}let D=(()=>{class r{constructor(t,o){this.cartStore=t,this.appSetting=o,this.cart=new y.A,this.total=0}ngOnInit(){this.gst=this.appSetting.getGST(),this.deliveryCharges=this.appSetting.getDeliveryCharges(),this.cartStore.select("cart").forEach(t=>{this.cart=t,this.cart&&this.cart.subTotal&&(this.total=this.cart.subTotal,this.gst&&(this.total+=this.total*(this.gst/100)),this.deliveryCharges&&(this.total+=this.deliveryCharges))})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(g.yh),e.Y36(m.Q))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-checkout"]],decls:3,vars:2,consts:[["emptyBlock",""],["class","mb-3",4,"ngIf","ngIfElse"],[1,"d-flex","flex-row","justify-content-between"],["cButton","","color","danger","routerLink","/public/menu"],[1,"mb-3"],[1,"mb-3",3,"gutter"],["variant","pills"],["routerLink","cart","cNavLink","","routerLinkActive","active"],["cIcon","","name","cilChevronRight"],["routerLink","customer","cNavLink","","routerLinkActive","active"],["routerLink","address","cNavLink","","routerLinkActive","active"],["md","8","sm","12"],["md","4","sm","12"],[4,"ngIf"],[1,"d-flex","justify-content-between"],[1,""],[1,"fw-semibold"],["class","d-flex justify-content-between",4,"ngIf"],[1,"fw-bold"]],template:function(t,o){if(1&t&&(e.YNc(0,Q,8,0,"ng-template",null,0,e.W1O),e.YNc(2,$,48,16,"c-row",1)),2&t){const s=e.MAs(1);e.xp6(2),e.Q6J("ngIf",o.cart&&o.cart.items&&o.cart.items.length>0)("ngIfElse",s)}},directives:[u.O5,n.iok,n.Yp0,n.AkF,n.yue,n.Hq3,_.rH,n.Aij,n.rZi,n.HOP,_.yS,n.Vh3,_.Od,A.ar,_.lC],pipes:[u.H9],styles:[""]}),r})();var b=a(262),P=a(2340),H=a(520),j=a(5450);let z=(()=>{class r{constructor(t,o){this.http=t,this.commonService=o,this.BASE_URL=`${P.N.API_BASE_URL}/salesperson/customer`}search(t){return this.http.get(`${this.BASE_URL}/search`,{params:{q:t}}).pipe((0,b.K)(this.commonService.catchError))}register(t){return this.http.post(`${this.BASE_URL}`,t).pipe((0,b.K)(this.commonService.catchError))}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(H.eN),e.LFG(j.v))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();function W(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-row"),e.TgZ(1,"c-col"),e.TgZ(2,"c-card"),e.TgZ(3,"c-card-body",8),e.TgZ(4,"span"),e.TgZ(5,"h4"),e._uU(6),e.qZA(),e.TgZ(7,"span"),e._uU(8),e.qZA(),e.qZA(),e.TgZ(9,"span"),e.TgZ(10,"button",9),e.NdJ("click",function(){return e.CHM(t),e.oxw().removeCustomer()}),e.O4$(),e._UZ(11,"svg",10),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=e.oxw();e.xp6(6),e.Oqu(t.selectedCustomer.fullName),e.xp6(2),e.Oqu(t.selectedCustomer.cellNumber)}}function K(r,c){if(1&r&&(e.TgZ(0,"h6"),e._uU(1),e.qZA()),2&r){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.fullName)}}function X(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body"),e.TgZ(2,"c-form-check"),e.TgZ(3,"input",19),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw(3).selectedCustomerId=s}),e.qZA(),e.TgZ(4,"label",20),e.TgZ(5,"span"),e.YNc(6,K,2,1,"h6",21),e.TgZ(7,"span"),e._uU(8),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=c.$implicit,o=e.oxw(3);e.xp6(3),e.s9C("id",t.id),e.Q6J("ngModel",o.selectedCustomerId)("value",t.id),e.xp6(1),e.s9C("for",t.id),e.xp6(2),e.Q6J("ngIf",t.fullName),e.xp6(2),e.Oqu(t.cellNumber)}}function G(r,c){if(1&r&&(e.TgZ(0,"c-row",2),e.TgZ(1,"c-col"),e.YNc(2,X,9,6,"c-card",18),e.qZA(),e.qZA()),2&r){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.searchResult)}}function V(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-card-body"),e.TgZ(1,"form",23),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw(3).registerCustomer()}),e.TgZ(2,"fieldset",12),e.TgZ(3,"c-row",24),e.TgZ(4,"c-col",25),e.TgZ(5,"div",13),e._UZ(6,"input",26),e.TgZ(7,"label",27),e._uU(8,"Cell Number"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"c-col",28),e.TgZ(10,"div",13),e._UZ(11,"input",29),e.TgZ(12,"label",30),e._uU(13,"First Name"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"c-col",28),e.TgZ(15,"div",13),e._UZ(16,"input",31),e.TgZ(17,"label",32),e._uU(18,"Last Name"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(19,"c-row"),e.TgZ(20,"c-col",33),e.TgZ(21,"button",34),e.NdJ("click",function(){return e.CHM(t),e.oxw(3).closeCustomerRegisterForm()}),e._uU(22," Cancel "),e.qZA(),e.TgZ(23,"button",35),e._uU(24," Register "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=e.oxw(3);e.xp6(1),e.Q6J("formGroup",t.registerCustomerForm),e.xp6(2),e.Q6J("gutter",3),e.xp6(3),e.Q6J("valid",t.registerCustomerForm.controls.cellNumber.valid)}}function ee(r,c){if(1&r&&(e.TgZ(0,"span"),e._uU(1," Not Found "),e.TgZ(2,"span",38),e._uU(3),e.qZA(),e.qZA()),2&r){const t=e.oxw(4);e.xp6(3),e.hij("",t.registerNewCustomerCellNumber," ?")}}function te(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-card-body"),e.TgZ(1,"c-row"),e.TgZ(2,"c-col",3),e.TgZ(3,"span",36),e.YNc(4,ee,4,1,"span",21),e.qZA(),e.TgZ(5,"button",37),e.NdJ("click",function(){return e.CHM(t),e.oxw(3).openCustomerRegisterForm()}),e._uU(6," Register New Customer "),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=e.oxw(3);e.xp6(4),e.Q6J("ngIf",t.registerNewCustomerCellNumber)}}function re(r,c){if(1&r&&(e.TgZ(0,"c-card",2),e.YNc(1,V,25,3,"c-card-body",0),e.YNc(2,te,7,1,"ng-template",null,22,e.W1O),e.qZA()),2&r){const t=e.MAs(3),o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",o.isRegisterNewCustomer)("ngIfElse",t)}}function oe(r,c){if(1&r){const t=e.EpF();e.TgZ(0,"c-row"),e.TgZ(1,"c-col"),e.TgZ(2,"c-card"),e.TgZ(3,"c-card-body"),e.TgZ(4,"form",11),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().search()}),e.TgZ(5,"fieldset",12),e.TgZ(6,"div",13),e.TgZ(7,"input",14),e.NdJ("ngModelChange",function(s){return e.CHM(t),e.oxw().searchQuery=s})("ngModelOptions",function(){return{updateOn:"submit"}}),e.qZA(),e.TgZ(8,"label",15),e._uU(9,"Search by cell number"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(10,G,3,1,"c-row",16),e.YNc(11,re,4,2,"ng-template",null,17,e.W1O),e.qZA(),e.qZA()}if(2&r){const t=e.MAs(12),o=e.oxw();e.xp6(7),e.Q6J("ngModel",o.searchQuery),e.xp6(3),e.Q6J("ngIf",o.searchResult&&o.searchResult.length>0)("ngIfElse",t)}}const se=[{path:"",redirectTo:"cart"},{path:"",component:D,children:[{path:"cart",component:R},{path:"customer",component:(()=>{class r{constructor(t,o){this.customerService=t,this.cartStore=o,this.isRegisterNewCustomer=!1,this.searchQuery=null,this.registerCustomerForm=new l.cw({cellNumber:new l.NI(null,l.kI.required),firstName:new l.NI(null),lastName:new l.NI(null)}),this.cartStore.select("cart").subscribe(s=>{this.selectedCustomer=s&&s.customer?s.customer:void 0})}ngOnInit(){}search(){this.searchQuery?(this.isRegisterNewCustomer=!1,this.customerService.search(this.searchQuery).subscribe(t=>{this.searchResult=t,this.registerNewCustomerCellNumber=this.searchResult&&this.searchResult.length?null:this.searchQuery})):this.searchResult=void 0}openCustomerRegisterForm(){this.registerCustomerForm.reset(),this.isRegisterNewCustomer=!0}closeCustomerRegisterForm(){this.isRegisterNewCustomer=!1,this.registerCustomerForm.reset()}registerCustomer(){this.registerCustomerForm.valid&&(this.isRegisterNewCustomer=!1,this.customerService.register(this.registerCustomerForm.value).subscribe(t=>{var o;this.searchResult=[],null===(o=this.searchResult)||void 0===o||o.push(t),this.registerCustomerForm.reset()}))}updateCartCustomer(){var t;if(this.selectedCustomerId&&this.searchResult&&this.searchResult.length){let o=null===(t=this.searchResult)||void 0===t?void 0:t.find(s=>s.id==this.selectedCustomerId);o&&this.cartStore.dispatch((0,p.Hb)(o))}}removeCustomer(){this.cartStore.dispatch((0,p.YI)())}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(z),e.Y36(g.yh))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-customer"]],decls:13,vars:2,consts:[[4,"ngIf","ngIfElse"],["searchAndRegisterCustomerBlock",""],[1,"mt-2"],[1,"d-flex","justify-content-between"],["cButton","","variant","outline","routerLink","../cart"],["cIcon","","name","cilChevronLeft"],["cButton","","variant","outline","routerLink","../address",3,"click"],["cIcon","","name","cilChevronRight"],[1,"d-flex","flex-row","justify-content-between"],["cButton","","color","danger","size","sm","variant","ghost",3,"click"],["cIcon","","name","cilX","size","sm"],[3,"ngSubmit"],[1,"d-flex","flex-column","gap-2"],["cFormFloating",""],["cFormControl","","id","searchQuery","name","searchQuery","placeholder","Search by cell number",3,"ngModel","ngModelChange","ngModelOptions"],["cLabel","","id","searchQuery"],["class","mt-2",4,"ngIf","ngIfElse"],["customerRegisterBlock",""],[4,"ngFor","ngForOf"],["cFormCheckInput","","name","selectedCustomer","type","radio",3,"ngModel","value","id","ngModelChange"],["cFormCheckLabel","",3,"for"],[4,"ngIf"],["registerNewCustomerForm",""],[3,"formGroup","ngSubmit"],[3,"gutter"],["md","4","sm","12"],["cFormControl","","formControlName","cellNumber","id","cellNumber","placeholder","Cell Number",3,"valid"],["cLabel","","id","cellNumber"],["md","4","sm","6"],["cFormControl","","formControlName","firstName","id","firstName","placeholder","First Name"],["cLabel","","id","firstName"],["cFormControl","","formControlName","lastName","id","lastName","placeholder","Last Name"],["cLabel","","id","lastName"],[1,"d-flex","justify-content-end","gap-2"],["cButton","","color","light","type","button",3,"click"],["cButton","","type","submit"],[1,"items-align-center"],["cButton","",3,"click"],[1,"fw-semibold"]],template:function(t,o){if(1&t&&(e.YNc(0,W,12,2,"c-row",0),e.YNc(1,oe,13,3,"ng-template",null,1,e.W1O),e.TgZ(3,"c-row",2),e.TgZ(4,"c-col"),e.TgZ(5,"c-card"),e.TgZ(6,"c-card-body",3),e.TgZ(7,"a",4),e.O4$(),e._UZ(8,"svg",5),e._uU(9," Cart "),e.qZA(),e.kcU(),e.TgZ(10,"a",6),e.NdJ("click",function(){return o.updateCartCustomer()}),e._uU(11," Continue "),e.O4$(),e._UZ(12,"svg",7),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t){const s=e.MAs(2);e.Q6J("ngIf",o.selectedCustomer)("ngIfElse",s)}},directives:[u.O5,n.iok,n.Yp0,n.AkF,n.yue,_.yS,n.Hq3,A.ar,l._Y,l.JL,l.F,n.xPZ,n.oHf,l.Fj,l.JJ,l.On,n.eFW,u.sg,n.FzQ,n.yfq,l._,n.NWu,l.sg,n.Aij,l.u],styles:[""]}),r})()},{path:"address",component:O},{path:"payment",component:(()=>{class r{constructor(){}ngOnInit(){}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-payment"]],decls:2,vars:0,template:function(t,o){1&t&&(e.TgZ(0,"p"),e._uU(1,"payment works!"),e.qZA())},styles:[""]}),r})()}]}];let ne=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[_.Bz.forChild(se)],_.Bz]}),r})();var ce=a(8426),ie=a(5905);const ae=[n.dTQ,n.hJ1,n.ejP,n.zE6,n.U$I,n.Fme,n.nMh,A.QX,n.TXv,ce.Xd,n.dGk,n.P4_,n.lKp,n.z8t],le=[ie.zk.forRoot()];let de=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[u.ez,ne,l.u5,l.UX,...ae,...le]]}),r})()},1023:(N,T,a)=>{a.d(T,{D:()=>e});var u=a(262),_=a(2340),h=a(4893),v=a(520),p=a(5450);let e=(()=>{class C{constructor(m,g){this.http=m,this.commonService=g,this.BASE_URL=`${_.N.API_BASE_URL}/address`}countries(){return this.http.get(`${this.BASE_URL}/countries`).pipe((0,u.K)(this.commonService.catchError))}states(m){return this.http.get(`${this.BASE_URL}/states`,{params:{countryShortName:m}}).pipe((0,u.K)(this.commonService.catchError))}cities(m,g){let n={stateId:m};return g&&(n.q=g),this.http.get(`${this.BASE_URL}/cities`,{params:n}).pipe((0,u.K)(this.commonService.catchError))}getCustomerAddress(m){return this.http.get(`${this.BASE_URL}/customer/${m}`).pipe((0,u.K)(this.commonService.catchError))}saveCustomerAddress(m,g){return this.http.post(`${this.BASE_URL}/customer/${m}`,g).pipe((0,u.K)(this.commonService.catchError))}}return C.\u0275fac=function(m){return new(m||C)(h.LFG(v.eN),h.LFG(p.v))},C.\u0275prov=h.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"}),C})()}}]);