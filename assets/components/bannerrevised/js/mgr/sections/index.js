Ext.onReady(
    function () {
        MODx.load({ xtype: 'bannerrevised-page-home'});
    }
);

bannerrev.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            components: [{
                xtype: 'bannerrevised-panel-home'
                ,renderTo: 'bannerrevised-panel-home-div'
            }]
        }
    );
    bannerrev.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(bannerrev.page.Home,MODx.Component);
Ext.reg('bannerrevised-page-home',bannerrev.page.Home);