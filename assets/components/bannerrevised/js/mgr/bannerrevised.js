var BannerRev = function (config) {
    config = config || {};
    BannerRev.superclass.constructor.call(this,config);
};
Ext.extend(
    BannerRev,Ext.Component,{
        page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
    }
);
Ext.reg('BannerRev',BannerRev);

BannerRev = new BannerRev();

