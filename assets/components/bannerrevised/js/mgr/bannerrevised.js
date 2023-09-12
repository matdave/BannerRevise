var BannerRev = function (config) {
    config = config || {};
    BannerRev.superclass.constructor.call(this,config);
};
Ext.extend(
    BannerRev,Ext.Component,{
        page:{},window:{},grid:{},tree:{},panel:{},combo:{},component:{},config:{}
    }
);
Ext.reg('bannerrev',BannerRev);

bannerrev = new BannerRev();

