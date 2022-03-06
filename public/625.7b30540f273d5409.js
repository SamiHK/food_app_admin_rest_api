"use strict";(self.webpackChunkfoodapp=self.webpackChunkfoodapp||[]).push([[625],{9998:(T,v,i)=>{i.d(v,{w:()=>u});var e=i(4893),m=i(9808);function l(r,g){1&r&&(e.TgZ(0,"p",2),e._uU(1,"this field is required"),e.qZA())}function _(r,g){1&r&&(e.TgZ(0,"p",2),e._uU(1,"invalid email"),e.qZA())}function M(r,g){if(1&r&&(e.TgZ(0,"p",2),e._uU(1),e.qZA()),2&r){const c=e.oxw(2);e.xp6(1),e.hij("min ",c.control.errors.minlength.requiredLength," characters are required")}}function p(r,g){if(1&r&&(e.TgZ(0,"p",2),e._uU(1),e.qZA()),2&r){const c=e.oxw(2);e.xp6(1),e.hij("max ",c.control.errors.maxlength.requiredLength," characters are required")}}function f(r,g){if(1&r&&(e.TgZ(0,"p",2),e._uU(1),e.qZA()),2&r){const c=e.oxw(2);e.xp6(1),e.Oqu(c.control.errors.else)}}function A(r,g){if(1&r&&(e.YNc(0,l,2,0,"p",1),e.YNc(1,_,2,0,"p",1),e.YNc(2,M,2,1,"p",1),e.YNc(3,p,2,1,"p",1),e.YNc(4,f,2,1,"p",1)),2&r){const c=e.oxw();e.Q6J("ngIf",c.control.errors.required),e.xp6(1),e.Q6J("ngIf",c.control.errors.email),e.xp6(1),e.Q6J("ngIf",c.control.errors.minlength),e.xp6(1),e.Q6J("ngIf",c.control.errors.maxlength),e.xp6(1),e.Q6J("ngIf",c.control.errors.else)}}let u=(()=>{class r{constructor(){}ngOnInit(){}}return r.\u0275fac=function(c){return new(c||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-input-error"]],inputs:{control:"control"},decls:1,vars:1,consts:[[3,"ngIf"],["class","m-0 text-danger",4,"ngIf"],[1,"m-0","text-danger"]],template:function(c,C){1&c&&e.YNc(0,A,5,5,"ng-template",0),2&c&&e.Q6J("ngIf",C.control&&C.control.invalid&&(C.control.dirty||C.control.touched)&&C.control.errors)},directives:[m.O5],styles:[""]}),r})()},1569:(T,v,i)=>{i.d(v,{L:()=>l});var e=i(5033),m=i(4893);let l=(()=>{class _ extends e.Hq3{constructor(p){super(),this.el=p,this._loadingLabel="",this._loading=!1}get loadingLabel(){return this._loadingLabel}set loadingLabel(p){this._loadingLabel=p}get loading(){return this._loading}set loading(p){this._loading=p,this.content||(this.content=this.el.nativeElement.innerHTML),this.el.nativeElement.innerHTML=this._loading?`<span class="spinner-border spinner-border-sm ng-star-inserted"></span> ${this.loadingLabel}`:this.content}}return _.\u0275fac=function(p){return new(p||_)(m.Y36(m.SBq))},_.\u0275dir=m.lG2({type:_,selectors:[["","xcButton",""]],inputs:{loadingLabel:"loadingLabel",loading:"loading"},exportAs:["xcButton"],features:[m.qOj]}),_})()},1023:(T,v,i)=>{i.d(v,{D:()=>p});var e=i(262),m=i(2340),l=i(4893),_=i(520),M=i(5450);let p=(()=>{class f{constructor(u,r){this.http=u,this.commonService=r,this.BASE_URL=`${m.N.BASE_URL}/address`}countries(){return this.http.get(`${this.BASE_URL}/countries`).pipe((0,e.K)(this.commonService.catchError))}states(u){return this.http.get(`${this.BASE_URL}/states`,{params:{countryShortName:u}}).pipe((0,e.K)(this.commonService.catchError))}cities(u,r){let g={stateId:u};return r&&(g.q=r),this.http.get(`${this.BASE_URL}/cities`,{params:g}).pipe((0,e.K)(this.commonService.catchError))}getCustomerAddress(u){return this.http.get(`${this.BASE_URL}/customer/${u}`).pipe((0,e.K)(this.commonService.catchError))}saveCustomerAddress(u,r){return this.http.post(`${this.BASE_URL}/customer/${u}`,r).pipe((0,e.K)(this.commonService.catchError))}}return f.\u0275fac=function(u){return new(u||f)(l.LFG(_.eN),l.LFG(M.v))},f.\u0275prov=l.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),f})()},8862:(T,v,i)=>{i.d(v,{g:()=>x});var e=i(4893),m=i(5905),l=i(5033);let _=(()=>{class s{constructor(t){var o;this.bsModalRef=t,this.choice=!1,null===(o=this.bsModalRef.onHide)||void 0===o||o.emit(this.choice)}ngOnInit(){}confirm(){this.choice=!0,this.bsModalRef.hide()}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(m.UZ))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-alert-modal"]],decls:11,vars:0,consts:[[1,""],["cCardTitle",""],["cCardText",""],[1,"d-flex","gap-2","justify-content-end"],["cButton","","color","light",3,"click"],["cButton","","color","danger",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body",0),e.TgZ(2,"h4",1),e._uU(3,"Delete"),e.qZA(),e.TgZ(4,"p",2),e._uU(5,"Are you sure? do you want to delete?"),e.qZA(),e.TgZ(6,"span",3),e.TgZ(7,"button",4),e.NdJ("click",function(){return o.bsModalRef.hide()}),e._uU(8,"No"),e.qZA(),e.TgZ(9,"button",5),e.NdJ("click",function(){return o.confirm()}),e._uU(10,"Yes"),e.qZA(),e.qZA(),e.qZA(),e.qZA())},directives:[l.AkF,l.yue,l.qkm,l.PVT,l.Hq3],styles:[""]}),s})(),M=(()=>{class s{constructor(t){this.bsModalRef=t,this.title="Confirm Delete",this.message="Are you sure? Do you want to delete this permenantly?",this.confirm=!1}ngOnInit(){}yes(){this.confirm=!0,this.bsModalRef.hide()}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(m.UZ))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-confirm-delete-modal"]],decls:11,vars:2,consts:[["cCardTitle",""],["cCardText",""],[1,"d-flex","gap-2","justify-content-end"],["cButton","","color","light","variant","outline",3,"click"],["cButton","","color","danger","variant","outline",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body"),e.TgZ(2,"h4",0),e._uU(3),e.qZA(),e.TgZ(4,"p",1),e._uU(5),e.qZA(),e.TgZ(6,"span",2),e.TgZ(7,"button",3),e.NdJ("click",function(){return o.bsModalRef.hide()}),e._uU(8,"No"),e.qZA(),e.TgZ(9,"button",4),e.NdJ("click",function(){return o.yes()}),e._uU(10,"Yes"),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(3),e.Oqu(o.title),e.xp6(2),e.Oqu(o.message))},directives:[l.AkF,l.yue,l.qkm,l.PVT,l.Hq3],styles:[""]}),s})();var p=i(5861),f=i(8306),A=i(3900),u=i(4004),r=i(9646),g=i(262),c=i(2340),C=i(520);let E=(()=>{class s{constructor(t){this.http=t}load(){return this.http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${c.N.GOOGLE_MAP_API_KEY}`,"callback").pipe((0,u.U)(()=>!0),(0,g.K)((t,o)=>(0,r.of)(!1)))}}return s.\u0275fac=function(t){return new(t||s)(e.LFG(C.eN))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();var L=i(3315),q=i(1023),Z=i(2382),N=i(495),S=i(9808);function O(s,d){if(1&s&&e._UZ(0,"map-marker",18),2&s){const t=e.oxw(2);e.Q6J("position",t.marker.position)("options",t.marker.options)("clickable",!0)}}function b(s,d){if(1&s){const t=e.EpF();e.TgZ(0,"span"),e.TgZ(1,"google-map",16),e.NdJ("mapClick",function(n){return e.CHM(t),e.oxw().mapClick(n)}),e.YNc(2,O,1,3,"map-marker",17),e.qZA(),e.qZA()}if(2&s){const t=e.oxw();e.xp6(1),e.Q6J("center",t.mapCenter),e.xp6(1),e.Q6J("ngIf",t.marker&&t.marker.position)}}function U(s,d){if(1&s&&(e.TgZ(0,"option",19),e._uU(1),e.qZA()),2&s){const t=d.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}function J(s,d){if(1&s&&(e.TgZ(0,"option",19),e._uU(1),e.qZA()),2&s){const t=d.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}function k(s,d){if(1&s&&(e.TgZ(0,"option",19),e._uU(1),e.qZA()),2&s){const t=d.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}let I=(()=>{class s{constructor(t,o,n,a){this.bsModalRef=t,this.googleMapService=o,this.geoCoder=n,this.addressService=a,this.formattedAddress="",this.address={formattedAddress:"",latLng:{lat:0,lng:0}},this.apiLoaded=!1,this.search=null,this.countryListLoading=!1,this.stateListLoading=!1,this.cityListLoading=!1,this.isSave=!1}ngOnInit(){var t=this;return(0,p.Z)(function*(){var o;t.addressLine1=null===(o=t.address)||void 0===o?void 0:o.addressLine1,t.loadCountries(),t.results$=new f.y(n=>{n.next(t.search)}).pipe((0,A.w)(n=>n?t.geoCoder.geocode({address:n}).pipe((0,u.U)(a=>a.results)):(0,r.of)([]))),yield t.googleMapService.load().forEach(n=>{t.apiLoaded=n}).catch(n=>{t.apiLoaded=n}),t.address&&t.address.latLng?(t.address.formattedAddress&&(t.formattedAddress=t.address.formattedAddress),t.updateMap(t.address.latLng)):navigator.geolocation.getCurrentPosition(n=>{if(n&&n.coords){let a={lat:n.coords.latitude,lng:n.coords.longitude};t.updateMap(a),t.updateAddress(a)}})})()}loadCountries(){var t=this;return(0,p.Z)(function*(){var o;t.countryListLoading=!0,yield t.addressService.countries().forEach(n=>t.countryList=n),t.address&&t.address.countryName&&t.countryList&&t.countryList.length>0&&!t.country&&(t.country=t.countryList.find(n=>{var a;return n.name==(null===(a=t.address)||void 0===a?void 0:a.countryName)}),t.country&&t.country.shortName&&t.loadStates(null===(o=t.country)||void 0===o?void 0:o.shortName)),t.countryListLoading=!1})()}onSelectCountry(t){var o;t&&this.country&&this.country.shortName&&(this.geoCoder.geocode({componentRestrictions:{country:this.country.name}}).subscribe(n=>{n&&n.results&&n.results.length>0&&this.updateMap(n.results[0].geometry.location.toJSON())}),this.loadStates(null===(o=this.country)||void 0===o?void 0:o.shortName))}onSelectState(t){var o;t&&this.country&&this.country.name&&this.state&&this.state.id&&(this.geoCoder.geocode({componentRestrictions:{administrativeArea:`${this.state.name}, ${this.country.name}`}}).subscribe(n=>{n&&n.results&&n.results.length>0&&this.updateMap(n.results[0].geometry.location.toJSON())}),this.loadCities(null===(o=this.state)||void 0===o?void 0:o.id))}onSelectCity(t){t&&this.country&&this.country.name&&this.state&&this.state.name&&this.city&&this.city.name&&this.geoCoder.geocode({componentRestrictions:{administrativeArea:`${this.state.name}, ${this.country.name}`,locality:this.city.name}}).subscribe(o=>{o&&o.results&&o.results.length>0&&this.updateMap(o.results[0].geometry.location.toJSON())})}loadStates(t){var o=this;return(0,p.Z)(function*(){o.stateListLoading=!0,yield o.addressService.states(t).forEach(n=>o.stateList=n),o.stateListLoading=!1,o.address&&o.address.stateName&&o.stateList&&o.stateList.length>0&&!o.state&&(o.state=o.stateList.find(n=>{var a;return n.name==(null===(a=o.address)||void 0===a?void 0:a.stateName)}),o.state&&o.state.id&&o.loadCities(o.state.id))})()}loadCities(t,o){var n=this;return(0,p.Z)(function*(){n.cityListLoading=!0,yield n.addressService.cities(t,o).forEach(a=>n.cityList=a),n.cityListLoading=!1,n.address&&n.address.cityName&&n.cityList&&n.cityList.length>0&&!n.city&&(n.city=n.cityList.find(a=>{var y;return a.name==(null===(y=n.address)||void 0===y?void 0:y.cityName)}))})()}onSelectGeocodeAddress(t){if(t){let o=t.item.geometry.location.toJSON();this.updateMap(o),this.updateGeoLocation(t.item)}}updateMap(t){this.mapCenter=t,this.marker={position:t,options:{}}}updateAddress(t){t&&this.geoCoder.geocode({location:t}).forEach(o=>{o.results&&this.updateGeoLocation(o.results[0])})}mapClick(t){var o,n;this.marker={position:null===(o=t.latLng)||void 0===o?void 0:o.toJSON(),options:{}},this.updateAddress(null===(n=t.latLng)||void 0===n?void 0:n.toJSON())}getAreaBlock(t){return t.address_components.find(o=>o.types.includes("sublocality_level_2"))}getArea(t){return t.address_components.find(o=>o.types.includes("sublocality_level_1"))}getCity(t){let o=t.address_components.find(n=>n.types.includes("locality"));return o||(o=t.address_components.find(n=>n.types.includes("administrative_area_level_3"))),o}getState(t){return t.address_components.find(o=>o.types.includes("administrative_area_level_1"))}getCountry(t){return t.address_components.find(o=>o.types.includes("country"))}updateGeoLocation(t){this.getAreaBlock(t);let n=this.getCountry(t),a=this.getState(t),y=this.getCity(t);this.address={formattedAddress:t.address_components.filter(h=>!h.types.includes("plus_code")).map(h=>h.long_name).join(", "),latLng:t.geometry.location.toJSON()},this.addressLine1=t.address_components.filter(h=>!(h.types.includes("plus_code")||h.types.includes("postal_code")||h.types.includes("locality")||h.types.includes("administrative_area_level_3")||h.types.includes("administrative_area_level_2")||h.types.includes("administrative_area_level_1")||h.types.includes("country"))).map(h=>h.long_name).join(", "),this.address&&y&&(this.address.cityName=null==y?void 0:y.long_name),this.address&&a&&(this.address.stateName=null==a?void 0:a.long_name),this.address&&n&&(this.address.countryName=null==n?void 0:n.long_name,this.address.countryShortName=null==n?void 0:n.short_name)}cancel(){this.isSave=!1,this.bsModalRef.hide()}save(){this.isSave=!0,this.address&&(this.address.addressLine1=this.addressLine1),this.bsModalRef.hide()}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(m.UZ),e.Y36(E),e.Y36(L.il),e.Y36(q.D))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-map-modal"]],decls:49,vars:17,consts:[[1,"mb-2",3,"xs","gutter"],["cLabel","",1,"label-sm"],["cFormControl","","typeaheadOptionField","formatted_address","placeholder","Search","sizing","sm",3,"ngModel","typeahead","adaptivePosition","typeaheadAsync","ngModelChange","typeaheadOnSelect"],["mapCol",""],[4,"ngIf"],[1,"my-2"],["cFormControl","","placeholder","Address","sizing","sm",3,"ngModel","ngModelChange"],[3,"gutter"],["cSelect","","placeholder","Country","sizing","sm",3,"ngModel","ngModelChange"],["value","undefined"],[3,"ngValue",4,"ngFor","ngForOf"],["cSelect","","placeholder","State","sizing","sm",3,"ngModel","disabled","ngModelChange"],["cSelect","","placeholder","City","sizing","sm",3,"ngModel","disabled","ngModelChange"],[1,"d-grid","gap-2","d-flex","float-end"],["cButton","","color","light",3,"click"],["cButton","","color","primary",3,"click"],["height","360","width","760",3,"center","mapClick"],[3,"position","options","clickable",4,"ngIf"],[3,"position","options","clickable"],[3,"ngValue"]],template:function(t,o){1&t&&(e.TgZ(0,"c-card"),e.TgZ(1,"c-card-body"),e.TgZ(2,"c-row",0),e.TgZ(3,"c-col"),e.TgZ(4,"div"),e.TgZ(5,"label",1),e._uU(6,"Search"),e.qZA(),e.TgZ(7,"input",2),e.NdJ("ngModelChange",function(a){return o.search=a})("typeaheadOnSelect",function(a){return o.onSelectGeocodeAddress(a)}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"c-row"),e.TgZ(9,"c-col",null,3),e.YNc(11,b,3,2,"span",4),e.qZA(),e.qZA(),e.TgZ(12,"c-row",5),e.TgZ(13,"c-col"),e.TgZ(14,"div"),e.TgZ(15,"label",1),e._uU(16,"Address"),e.qZA(),e.TgZ(17,"input",6),e.NdJ("ngModelChange",function(a){return o.addressLine1=a}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(18,"c-row",7),e.TgZ(19,"c-col"),e.TgZ(20,"div"),e.TgZ(21,"label",1),e._uU(22,"Country"),e.qZA(),e.TgZ(23,"select",8),e.NdJ("ngModelChange",function(a){return o.country=a})("ngModelChange",function(a){return o.onSelectCountry(a)}),e.TgZ(24,"option",9),e._uU(25,"Select Country"),e.qZA(),e.YNc(26,U,2,2,"option",10),e.qZA(),e.qZA(),e.qZA(),e.TgZ(27,"c-col"),e.TgZ(28,"div"),e.TgZ(29,"label",1),e._uU(30,"State"),e.qZA(),e.TgZ(31,"select",11),e.NdJ("ngModelChange",function(a){return o.state=a})("ngModelChange",function(a){return o.onSelectState(a)}),e.TgZ(32,"option",9),e._uU(33,"Select State"),e.qZA(),e.YNc(34,J,2,2,"option",10),e.qZA(),e.qZA(),e.qZA(),e.TgZ(35,"c-col"),e.TgZ(36,"div"),e.TgZ(37,"label",1),e._uU(38,"City"),e.qZA(),e.TgZ(39,"select",12),e.NdJ("ngModelChange",function(a){return o.city=a})("ngModelChange",function(a){return o.onSelectCity(a)}),e.TgZ(40,"option",9),e._uU(41,"Select City"),e.qZA(),e.YNc(42,k,2,2,"option",10),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(43,"c-card-footer"),e.TgZ(44,"span",13),e.TgZ(45,"button",14),e.NdJ("click",function(){return o.cancel()}),e._uU(46,"Close"),e.qZA(),e.TgZ(47,"button",15),e.NdJ("click",function(){return o.save()}),e._uU(48,"Save"),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("xs",1)("gutter",3),e.xp6(5),e.Q6J("ngModel",o.search)("typeahead",o.results$)("adaptivePosition",!0)("typeaheadAsync",!0),e.xp6(4),e.Q6J("ngIf",o.apiLoaded),e.xp6(6),e.Q6J("ngModel",o.addressLine1),e.xp6(1),e.Q6J("gutter",3),e.xp6(5),e.Q6J("ngModel",o.country),e.xp6(3),e.Q6J("ngForOf",o.countryList),e.xp6(5),e.Q6J("ngModel",o.state)("disabled",null==o.country),e.xp6(3),e.Q6J("ngForOf",o.stateList),e.xp6(5),e.Q6J("ngModel",o.city)("disabled",null==o.state),e.xp6(3),e.Q6J("ngForOf",o.cityList))},directives:[l.AkF,l.yue,l.iok,l.Aij,l.Yp0,l.eFW,l.oHf,Z.Fj,Z.JJ,Z.On,N.Bp,S.O5,l.nqR,Z.EJ,Z.YN,Z.Kr,S.sg,l.xUh,l.Hq3,L.b6,L.O_],styles:[""]}),s})(),x=(()=>{class s{constructor(t){this.modalService=t}showAlertModal(){return this.modalService.show(_,{backdrop:!0,animated:!0,ignoreBackdropClick:!0,class:"modal-dialog-centered"})}showWConfirmDeleteModalComponent(t){let o=this.modalService.show(M,{backdrop:!0,animated:!0,ignoreBackdropClick:!0,class:"modal-dialog-centered"});return t&&o.content&&(t.title&&(o.content.title=t.title),t.message&&(o.content.message=t.message)),o}showMapModal(t){return this.modalService.show(I,{backdrop:!0,animated:!0,ignoreBackdropClick:!0,class:"modal-lg modal-dialog-centered",initialState:{address:t}})}}return s.\u0275fac=function(t){return new(t||s)(e.LFG(m.tT))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);