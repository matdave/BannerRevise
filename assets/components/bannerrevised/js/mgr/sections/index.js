Ext.onReady(
    function () {
        MODx.load({ xtype: 'bannerrevised-page-home'});
    }
);

BannerRev.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            components: [{
                xtype: 'bannerrevised-panel-home'
                ,renderTo: 'bannerrevised-panel-home-div'
            }]
        }
    );
    BannerRev.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(BannerRev.page.Home,MODx.Component);
Ext.reg('bannerrevised-page-home',BannerRev.page.Home);