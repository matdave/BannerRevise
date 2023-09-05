bannerrev.panel.Home = function (config) {
    config = config || {};
    Ext.apply(
        config,{
            baseCls: 'modx-formpanel'
            ,cls: 'container'
            ,items: [{
                html: '<h2>'+_('bannerrevised.desc')+'</h2>'
                ,border: false
                ,cls: 'modx-page-header container'
            },{
                xtype: 'modx-tabs'
                ,id: 'bannerrevised-tabs'
                ,bodyStyle: 'padding: 10px'
                ,defaults: {autoHeight: true }
                ,stateful: true
                ,border: true
                ,stateId: 'bannerrevised-tabs'
                ,stateEvents: ['tabchange']
                ,getState:function () {
                    return { activeTab:this.items.indexOf(this.getActiveTab()) };
                }
                ,items: [{
                    title: _('bannerrevised.ads')
                    ,id: 'bannerrevised-ads'
                    ,border: false
                    ,defaults: { autoHeight: true, border: false }
                    ,items: [{
                        xtype: 'bannerrevised-grid-ads'
                          ,preventRender: true
                    }]
                },{
                    title: _('bannerrevised.positions')
                    ,id: 'bannerrevised-positions'
                    ,border: false
                    ,defaults: { autoHeight: true, border: false }
                    ,items: [{
                        xtype: 'bannerrevised-grid-positions'
                        ,preventRender: true
                    }]
                },{
                    title: _('bannerrevised.stats')
                    ,id: 'bannerrevised-stats'
                    ,border: false
                    ,defaults: { autoHeight: true, border: false }
                    ,items: [{
                        xtype: 'bannerrevised-panel-stats'
                        ,preventRender: true
                    }]
                }]
            }]
        }
    );
    bannerrev.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(bannerrev.panel.Home,MODx.Panel);
Ext.reg('bannerrevised-panel-home',bannerrev.panel.Home);

// Search and combos
MODx.combo.ads = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            name: 'ad'
            ,hiddenName: 'ad'
            ,displayField: 'name'
            ,valueField: 'id'
            ,editable: true
            ,fields: ['name','id']
            ,pageSize: 10
            //,value: ''
            ,emptyText: _('bannerrevised.ads.add')
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: {
                action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Ads\\GetList' :
                    'mgr/ads/getlist'
                ,position: config.position || 0
                ,mode: config.mode || 0
            }
        }
    );
    MODx.combo.ads.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.ads,MODx.combo.ComboBox);
Ext.reg('bannerrevised-filter-ads',MODx.combo.ads);
