bannerrev.panel.Stats = function (config) {
    config = config || {};
    Ext.apply(
        config,{
            border: false
            ,baseCls: 'modx-panel'
            ,items: [{
                xtype: 'modx-tabs'
                ,bodyStyle: 'padding: 10px'
                ,id: 'bannerrevised-stats-tabs'
                ,defaults: {autoHeight: true }
                ,stateful: true
                ,border: true
                ,stateId: 'bannerrevised-stats-tabs'
                ,stateEvents: ['tabchange']
                ,getState:function () {
                    return { activeTab:this.items.indexOf(this.getActiveTab()) };
                }
                ,items: [{
                    title: _('bannerrevised.stats.clicks')
                    ,items: [{
                        xtype: 'bannerrevised-grid-clicks'
                    }
                    ]
                },{
                    title: _('bannerrevised.stats.referrers')
                    ,items: [{
                        xtype: 'bannerrevised-grid-referrers'
                    }
                    ]
                }]
            }]
        }
    );
    bannerrev.panel.Stats.superclass.constructor.call(this,config);
};
Ext.extend(bannerrev.panel.Stats,MODx.Panel);
Ext.reg('bannerrevised-panel-stats',bannerrev.panel.Stats);
