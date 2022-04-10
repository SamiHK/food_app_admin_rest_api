"use strict";(self.webpackChunkfoodapp=self.webpackChunkfoodapp||[]).push([[844],{4844:(C,r,g)=>{g.r(r),g.d(r,{SettingModule:()=>v});var p=g(9808),l=g(3477),u=g(8089),m=g(7651),t=g(4893),Z=g(6395),c=g(1728),o=g(5033),h=g(7157);const f=[{path:"",component:(()=>{class n{constructor(e,i){this.settingService=e,i.icons=Object.assign(Object.assign({},m.y),u.z)}ngOnInit(){this.loadSettings()}loadSettings(){this.darkLogo=this.settingService.getDarkLogo(),this.lightLogo=this.settingService.getLightLogo()}updateSettings(){this.settingService.updateAppSettingCache(),this.loadSettings()}updateLightLogo(e){e&&e.files&&e.files.length>0&&this.settingService.updateLightLogo(e.files[0]).forEach(i=>this.updateSettings())}updateDarkLogo(e){e&&e.files&&e.files.length>0&&this.settingService.updateDarkLogo(e.files[0]).forEach(i=>this.updateSettings())}addBanner(e){e&&e.files&&e.files.length>0&&this.settingService.addBanner(e.files[0]).forEach(i=>console.log(i))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(Z.Q),t.Y36(c.uk))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-setting"]],decls:35,vars:5,consts:[[3,"md","sm","gutter"],[1,"p-0"],["cCardImg","top","fluid","",1,"bg-dark",3,"src"],[1,"d-flex","justify-content-between","align-items-center"],["cCardTitle","",1,"my-0"],["size","sm","label","Add banner","color","primary",3,"variant","imageChange"],["cCardImg","top","fluid","",3,"src"],[1,"mt-4"],[1,"d-flex","gap-2"],["md","6","sm","12"],[1,""],[1,"d-flex","justify-content-end"],[1,"mt-2"],[1,"p-2","d-flex","gap-2"],[1,"d-flex","flex-grow-1","gap-2","align-items-center"],["cImg","","rounded","2","src","http://localhost:3000/uploads/1d58ae2a178d373852a53240c061d809.jpg",1,"img-xs"],[1,"flex-grow-1","fw-semibold"],["cButton","","color","danger","variant","ghost","size","sm"],["cIcon","","name","cilX","size","sm"]],template:function(e,i){1&e&&(t.TgZ(0,"h4"),t._uU(1,"Logo"),t.qZA(),t.TgZ(2,"c-row",0),t.TgZ(3,"c-col"),t.TgZ(4,"c-card",1),t._UZ(5,"img",2),t.TgZ(6,"c-card-body",3),t.TgZ(7,"h6",4),t._uU(8,"Light"),t.qZA(),t.TgZ(9,"app-upload-button",5),t.NdJ("imageChange",function(a){return i.updateLightLogo(a)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(10,"c-col"),t.TgZ(11,"c-card",1),t._UZ(12,"img",6),t.TgZ(13,"c-card-body",3),t.TgZ(14,"h6",4),t._uU(15,"Dark"),t.qZA(),t.TgZ(16,"app-upload-button",5),t.NdJ("imageChange",function(a){return i.updateDarkLogo(a)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(17,"c-row",7),t.TgZ(18,"c-col",8),t.TgZ(19,"h4"),t._uU(20,"Website Banners"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(21,"c-row"),t.TgZ(22,"c-col",9),t.TgZ(23,"c-card"),t.TgZ(24,"c-card-body",10),t.TgZ(25,"span",11),t.TgZ(26,"app-upload-button",5),t.NdJ("imageChange",function(a){return i.addBanner(a)}),t.qZA(),t.qZA(),t.TgZ(27,"c-card",12),t.TgZ(28,"c-card-body",13),t.TgZ(29,"span",14),t._UZ(30,"img",15),t.TgZ(31,"span",16),t._uU(32,"deal 1"),t.qZA(),t.qZA(),t.TgZ(33,"button",17),t.O4$(),t._UZ(34,"svg",18),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(2),t.Q6J("md",4)("sm",1)("gutter",2),t.xp6(3),t.Q6J("src",i.lightLogo,t.LSH),t.xp6(7),t.Q6J("src",i.darkLogo,t.LSH))},directives:[o.iok,o.Aij,o.Yp0,o.AkF,o.pce,o.yue,o.qkm,h.l,o.XLq,o.Hq3,c.ar],styles:[""]}),n})()}];let S=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(f)],l.Bz]}),n})();var T=g(4466);const A=[o.zE6,o.Fme,o.dTQ,o.oTD,o.hJ1,c.QX,c.Eb,o.z8t];let v=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[p.ez,S,...A,T.m]]}),n})()}}]);