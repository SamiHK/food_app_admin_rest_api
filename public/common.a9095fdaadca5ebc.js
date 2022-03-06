"use strict";(self.webpackChunkfoodapp=self.webpackChunkfoodapp||[]).push([[592],{936:(v,h,r)=>{r.d(h,{I:()=>_});class _{constructor(){this.id="",this.name="",this.code="",this.totalActiveSalespersons=0}}},2205:(v,h,r)=>{r.d(h,{i:()=>s});var s=(()=>{return(a=s||(s={})).IN_CART="IN_CART",a.PENDING="PENDING",a.ACCEPTED="ACCEPTED",a.IN_PROGRESS="IN_PROGRESS",a.DISPATCH="DISPATCH",a.DELIVERED="DELIVERED",a.RETURN="RETURN",a.CANCELED="CANCELED",s;var a})()},9663:(v,h,r)=>{r.d(h,{b:()=>E});var _=r(262),s=r(2340),a=r(4893),t=r(520),m=r(5450);let E=(()=>{class n{constructor(e,p){this.http=e,this.commonService=p,this.BASE_URL=`${s.N.BASE_URL}/admin/branch`}salesperson(e,p){return this.http.get(`${this.BASE_URL}/${e}/salespersons`,{params:p}).pipe((0,_.K)(this.commonService.catchError))}filter(e){return this.http.get(`${this.BASE_URL}`,{params:e}).pipe((0,_.K)(this.commonService.catchError))}available(e){return this.http.get(`${this.BASE_URL}/available`,{params:e}).pipe((0,_.K)(this.commonService.catchError))}save(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,_.K)(this.commonService.catchError))}updateAddress(e,p){return this.http.post(`${this.BASE_URL}/${e}/address`,p).pipe((0,_.K)(this.commonService.catchError))}updateManager(e,p){return this.http.post(`${this.BASE_URL}/${e}/manager`,p).pipe((0,_.K)(this.commonService.catchError))}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,_.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(a.LFG(t.eN),a.LFG(m.v))},n.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},9030:(v,h,r)=>{r.d(h,{b:()=>E});var _=r(262),s=r(2340),a=r(4893),t=r(520),m=r(5450);let E=(()=>{class n{constructor(e,p){this.http=e,this.commonService=p,this.BASE_URL=`${s.N.BASE_URL}/admin/manager`}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,_.K)(this.commonService.catchError))}available(e){return this.http.get(`${this.BASE_URL}/available`,{params:e}).pipe((0,_.K)(this.commonService.catchError))}filter(e){return this.http.get(`${this.BASE_URL}`,{params:e}).pipe((0,_.K)(this.commonService.catchError))}register(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,_.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(a.LFG(t.eN),a.LFG(m.v))},n.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},104:(v,h,r)=>{r.d(h,{p:()=>E});var _=r(262),s=r(2340),a=r(4893),t=r(520),m=r(5450);let E=(()=>{class n{constructor(e,p){this.http=e,this.commonService=p,this.BASE_URL=`${s.N.BASE_URL}/salesperson/order`}create(e){return this.http.post(`${this.BASE_URL}`,e).pipe((0,_.K)(this.commonService.catchError))}get(e){return this.http.get(`${this.BASE_URL}/${e}`).pipe((0,_.K)(this.commonService.catchError))}}return n.\u0275fac=function(e){return new(e||n)(a.LFG(t.eN),a.LFG(m.v))},n.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},4856:(v,h,r)=>{r.d(h,{X:()=>C});var _=r(5861),s=r(2382),a=r(5705),t=r(4893),m=r(3477),E=r(9663),n=r(5033),l=r(9808),e=r(6939),p=r(9553);function A(i,g){1&i&&(t.TgZ(0,"tr"),t.TgZ(1,"td",9),t._UZ(2,"c-spinner",10),t.qZA(),t.qZA())}const f=function(i){return{"table-dark":i}};function L(i,g){if(1&i&&(t.TgZ(0,"tr",13),t.TgZ(1,"td"),t._UZ(2,"app-user-active-switch",14),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.qZA()),2&i){const o=g.$implicit;t.Q6J("ngClass",t.VKq(5,f,!o.enabled)),t.xp6(2),t.Q6J("user",o),t.xp6(2),t.Oqu(o.username),t.xp6(2),t.Oqu(o.email),t.xp6(2),t.Oqu(o.fullName)}}function T(i,g){1&i&&(t.TgZ(0,"tr"),t.TgZ(1,"td",15),t._uU(2," Empty "),t.qZA(),t.qZA())}function M(i,g){if(1&i&&(t.YNc(0,L,9,7,"tr",11),t.YNc(1,T,3,0,"tr",12)),2&i){const o=t.oxw();t.Q6J("ngForOf",o.page.items),t.xp6(1),t.Q6J("ngIf",0==o.page.items.length)}}let C=(()=>{class i{constructor(o,c){this.route=o,this.abService=c,this.form=new s.cw({search:new s.NI(null,s.kI.required)}),this.page=new a.T,this.branchId=null,this.isLoading=!1}ngOnInit(){this.branchId=this.route.snapshot.params.branchId,this.loadManagers()}loadManagers(o){var c=this;return(0,_.Z)(function*(){c.isLoading=!0,c.branchId&&(yield c.abService.salesperson(c.branchId,o).forEach(u=>c.page=u).finally(()=>c.isLoading=!1))})()}filter(){this.form.valid?this.loadManagers(this.form.value):this.loadManagers()}onPageChange(o){this.form.valid?(Object.assign(o,this.form.value),this.loadManagers(o)):this.loadManagers({number:o.page})}}return i.\u0275fac=function(o){return new(o||i)(t.Y36(m.gz),t.Y36(E.b))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-salesperson-list"]],decls:27,vars:5,consts:[[1,"mb-4"],[3,"formGroup","ngSubmit"],["cFormFloating",""],["cFormControl","","formControlName","search","name","search","type","search","placeholder","Search by username, email or name","autofocus",""],["cLabel","","for","search"],["cTable","","hover",""],[4,"ngIf","ngIfElse"],["showResult",""],[3,"totalItems","ngModel","ngModelChange","pageChanged"],["colspan","5",1,"text-center","my-2"],["aria-hidden","true","label","Loading..."],[3,"ngClass",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"ngClass"],[3,"user"],["colspan","5",1,"text-center"]],template:function(o,c){if(1&o&&(t.TgZ(0,"c-card",0),t.TgZ(1,"c-card-body"),t.TgZ(2,"c-row"),t.TgZ(3,"c-col"),t.TgZ(4,"form",1),t.NdJ("ngSubmit",function(){return c.filter()}),t.TgZ(5,"div",2),t._UZ(6,"input",3),t.TgZ(7,"label",4),t._uU(8,"Search by username, email or name"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t._UZ(9,"hr"),t.TgZ(10,"c-row"),t.TgZ(11,"c-col"),t.TgZ(12,"table",5),t.TgZ(13,"thead"),t.TgZ(14,"tr"),t._UZ(15,"th"),t.TgZ(16,"th"),t._uU(17,"Username"),t.qZA(),t.TgZ(18,"th"),t._uU(19,"Email"),t.qZA(),t.TgZ(20,"th"),t._uU(21,"Full name"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(22,"tbody"),t.YNc(23,A,3,0,"tr",6),t.YNc(24,M,2,2,"ng-template",null,7,t.W1O),t.qZA(),t.qZA(),t.TgZ(26,"pagination",8),t.NdJ("ngModelChange",function(d){return c.page.number=d})("pageChanged",function(d){return c.onPageChange(d)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&o){const u=t.MAs(25);t.xp6(4),t.Q6J("formGroup",c.form),t.xp6(19),t.Q6J("ngIf",c.isLoading)("ngIfElse",u),t.xp6(3),t.Q6J("totalItems",c.page.total)("ngModel",c.page.number)}},directives:[n.AkF,n.yue,n.iok,n.Yp0,s._Y,s.JL,s.sg,n.xPZ,n.oHf,s.Fj,s.JJ,s.u,n.eFW,n.auY,l.O5,e.Qt,s.On,n.ORR,l.sg,l.mk,p.H],styles:[""]}),i})()}}]);