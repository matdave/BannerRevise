BannerRev.panel.Stats = function (config) {
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
                        xtype: 'modx-combo'
                            ,id: 'bannerrevised-clicks-period'
                            ,mode: 'local'
                            ,store: new Ext.data.SimpleStore(
                                {
                                    fields: ['d','v']
                                    ,data: [[_('bannerrevised.stats.overall', '')],[_('bannerrevised.stats.today'),'%Y-%m-%d'],[_('bannerrevised.stats.thismonth'),'%Y-%m'],[_('bannerrevised.stats.lastmonth'),'last month'],[_('bannerrevised.stats.thisyear'),'%Y']]
                                    }
                            )
                            ,displayField: 'd'
                            ,valueField: 'v'
                            ,lazyRender: false
                            ,listeners: {
                                added: {fn:function () {
                                    this.setValue('');}}
                                ,select: {fn:this.setPeriod,scope:this}
                        }
                    },{
                        xtype:'columnchart'
                        ,id: 'clickchart'
                        ,url: BannerRev.config.managerUrl + 'assets/ext3/resources/charts.swf'
                        ,xField: 'name'
                        ,yField: 'clicks'
                        ,height: 200
                        ,store: new Ext.data.JsonStore(
                            {
                                url: BannerRev.config.connectorUrl
                                    ,baseParams: {
                                        action: 'mgr/ads/getclicks'
                                        ,period: ''
                                }
                                    ,fields: ['name', 'clicks']
                                    ,autoLoad: true
                                    ,root: 'results'
                            }
                        )
                    }]

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
    BannerRev.panel.Stats.superclass.constructor.call(this,config);
};
Ext.extend(
    BannerRev.panel.Stats,MODx.Panel,{
        setPeriod: function (tf,nv,ov) {
            var el = Ext.getCmp('clickchart');
            var s = el.store;
            s.baseParams.period = tf.getValue();
            s.reload();
        }
    }
);
Ext.reg('bannerrevised-panel-stats',BannerRev.panel.Stats);
