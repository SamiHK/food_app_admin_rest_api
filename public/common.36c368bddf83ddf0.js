"use strict";(self.webpackChunkfoodapp=self.webpackChunkfoodapp||[]).push([[592],{936:(v,p,r)=>{r.d(p,{I:()=>s});class s{constructor(){this.id="",this.name="",this.code="",this.totalActiveSalespersons=0}}},2205:(v,p,r)=>{r.d(p,{i:()=>a});var a=(()=>{return(o=a||(a={})).IN_CART="IN_CART",o.PENDING="PENDING",o.ACCEPTED="ACCEPTED",o.IN_PROGRESS="IN_PROGRESS",o.DISPATCH="DISPATCH",o.DELIVERED="DELIVERED",o.RETURN="RETURN",o.CANCELED="CANCELED",a;var o})()},9663:(v,p,r)=>{r.d(p,{b:()=>E});var s=r(262),a=r(2340),o=r(4893),t=r(520),l=r(5450);let E=(()=>{class n{constructor(e,h){this.http=e,this.commonService=h,this.BASE_URL=`${a.N.BASE_URL}/admin/branch`}salesperson(e,h){return this.http.get(`${this.BASE_URL}/${e}/salespersons`,{params:h}).pipe((0,s.K)(this.commonService.catchError))}filter(e){return this.http.get(`${this.BASE_URL}`,{params:e}).pipe((0,s.K)(this.commonService.catchError))}available(e){return this.http.get(`${this.BASE_URL}/available`,{params:e}).pipe((0,s.K)(this.commonService.catchError))}save(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,s.K)(this.commonService.catchError))}updateAddress(e,h){return this.http.post(`${this.BASE_URL}/${e}/address`,h).pipe((0,s.K)(this.commonService.catchError))}updateManager(e,h){return this.http.post(`${this.BASE_URL}/${e}/manager`,h).pipe((0,s.K)(this.commonService.catchError))}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,s.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(t.eN),o.LFG(l.v))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},9030:(v,p,r)=>{r.d(p,{b:()=>E});var s=r(262),a=r(2340),o=r(4893),t=r(520),l=r(5450);let E=(()=>{class n{constructor(e,h){this.http=e,this.commonService=h,this.BASE_URL=`${a.N.BASE_URL}/admin/manager`}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,s.K)(this.commonService.catchError))}available(e){return this.http.get(`${this.BASE_URL}/available`,{params:e}).pipe((0,s.K)(this.commonService.catchError))}filter(e){return this.http.get(`${this.BASE_URL}`,{params:e}).pipe((0,s.K)(this.commonService.catchError))}register(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,s.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(t.eN),o.LFG(l.v))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},2398:(v,p,r)=>{r.d(p,{p:()=>E});var s=r(262),a=r(2340),o=r(4893),t=r(520),l=r(5450);let E=(()=>{class n{constructor(e,h){this.http=e,this.commonService=h,this.BASE_URL=`${a.N.BASE_URL}/order`}create(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,s.K)(this.commonService.catchError))}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,s.K)(this.commonService.catchError))}getById(e){return this.http.get(`${this.BASE_URL}/detail/${e}`).pipe((0,s.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(t.eN),o.LFG(l.v))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},104:(v,p,r)=>{r.d(p,{p:()=>E});var s=r(262),a=r(2340),o=r(4893),t=r(520),l=r(5450);let E=(()=>{class n{constructor(e,h){this.http=e,this.commonService=h,this.BASE_URL=`${a.N.BASE_URL}/salesperson/order`}create(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,s.K)(this.commonService.catchError))}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,s.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(t.eN),o.LFG(l.v))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},4856:(v,p,r)=>{r.d(p,{X:()=>S});var s=r(5861),a=r(2382),o=r(5705),t=r(4893),l=r(3477),E=r(9663),n=r(5033),m=r(9808),e=r(6939),h=r(9553);function A(i,g){1&i&&(t.TgZ(0,"tr"),t.TgZ(1,"td",9),t._UZ(2,"c-spinner",10),t.qZA(),t.qZA())}const L=function(i){return{"table-dark":i}};function f(i,g){if(1&i&&(t.TgZ(0,"tr",13),t.TgZ(1,"td"),t._UZ(2,"app-user-active-switch",14),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.qZA()),2&i){const _=g.$implicit;t.Q6J("ngClass",t.VKq(5,L,!_.enabled)),t.xp6(2),t.Q6J("user",_),t.xp6(2),t.Oqu(_.username),t.xp6(2),t.Oqu(_.email),t.xp6(2),t.Oqu(_.fullName)}}function M(i,g){1&i&&(t.TgZ(0,"tr"),t.TgZ(1,"td",15),t._uU(2," Empty "),t.qZA(),t.qZA())}function T(i,g){if(1&i&&(t.YNc(0,f,9,7,"tr",11),t.YNc(1,M,3,0,"tr",12)),2&i){const _=t.oxw();t.Q6J("ngForOf",_.page.items),t.xp6(1),t.Q6J("ngIf",0==_.page.items.length)}}let S=(()=>{class i{constructor(_,c){this.route=_,this.abService=c,this.form=new a.cw({search:new a.NI(null,a.kI.required)}),this.page=new o.T,this.branchId=null,this.isLoading=!1}ngOnInit(){this.branchId=this.route.snapshot.params.branchId,this.loadManagers()}loadManagers(_){var c=this;return(0,s.Z)(function*(){c.isLoading=!0,c.branchId&&(yield c.abService.salesperson(c.branchId,_).forEach(u=>c.page=u).finally(()=>c.isLoading=!1))})()}filter(){this.form.valid?this.loadManagers(this.form.value):this.loadManagers()}onPageChange(_){this.form.valid?(Object.assign(_,this.form.value),this.loadManagers(_)):this.loadManagers({number:_.page})}}return i.\u0275fac=function(_){return new(_||i)(t.Y36(l.gz),t.Y36(E.b))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-salesperson-list"]],decls:27,vars:5,consts:[[1,"mb-4"],[3,"formGroup","ngSubmit"],["cFormFloating",""],["cFormControl","","formControlName","search","name","search","type","search","placeholder","Search by username, email or name","autofocus",""],["cLabel","","for","search"],["cTable","","hover",""],[4,"ngIf","ngIfElse"],["showResult",""],[3,"totalItems","ngModel","ngModelChange","pageChanged"],["colspan","5",1,"text-center","my-2"],["aria-hidden","true","label","Loading..."],[3,"ngClass",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"ngClass"],[3,"user"],["colspan","5",1,"text-center"]],template:function(_,c){if(1&_&&(t.TgZ(0,"c-card",0),t.TgZ(1,"c-card-body"),t.TgZ(2,"c-row"),t.TgZ(3,"c-col"),t.TgZ(4,"form",1),t.NdJ("ngSubmit",function(){return c.filter()}),t.TgZ(5,"div",2),t._UZ(6,"input",3),t.TgZ(7,"label",4),t._uU(8,"Search by username, email or name"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t._UZ(9,"hr"),t.TgZ(10,"c-row"),t.TgZ(11,"c-col"),t.TgZ(12,"table",5),t.TgZ(13,"thead"),t.TgZ(14,"tr"),t._UZ(15,"th"),t.TgZ(16,"th"),t._uU(17,"Username"),t.qZA(),t.TgZ(18,"th"),t._uU(19,"Email"),t.qZA(),t.TgZ(20,"th"),t._uU(21,"Full name"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(22,"tbody"),t.YNc(23,A,3,0,"tr",6),t.YNc(24,T,2,2,"ng-template",null,7,t.W1O),t.qZA(),t.qZA(),t.TgZ(26,"pagination",8),t.NdJ("ngModelChange",function(d){return c.page.number=d})("pageChanged",function(d){return c.onPageChange(d)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&_){const u=t.MAs(25);t.xp6(4),t.Q6J("formGroup",c.form),t.xp6(19),t.Q6J("ngIf",c.isLoading)("ngIfElse",u),t.xp6(3),t.Q6J("totalItems",c.page.total)("ngModel",c.page.number)}},directives:[n.AkF,n.yue,n.iok,n.Yp0,a._Y,a.JL,a.sg,n.xPZ,n.oHf,a.Fj,a.JJ,a.u,n.eFW,n.auY,m.O5,e.Qt,a.On,n.ORR,m.sg,m.mk,h.H],styles:[""]}),i})()}}]);