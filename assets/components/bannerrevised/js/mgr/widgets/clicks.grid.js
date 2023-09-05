bannerrev.grid.Clicks = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-clicks'
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: { action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Ads\\GetClicks' :
                    'mgr/ads/getclicks', period: ''}
            ,fields: ['id','name', 'url', 'image', 'current_image', 'active', 'positions', 'clicks', 'start', 'end', 'description', 'clicks']
            ,paging: true
            ,border: false
            ,frame: false
            ,remoteSort: false
            ,anchor: '97%'
            ,autoExpandColumn: 'name'
            ,columns: [{
                header: _('bannerrevised.ads.name')
                ,dataIndex: 'name'
                ,sortable: true
            },{
                header: _('bannerrevised.stats.clicks')
                ,dataIndex: 'clicks'
                ,sortable: false
            }]
            ,tbar: [{
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
                'select': {fn:this.setPeriod,scope:this}
                }
            }]
        }
    );
    bannerrev.grid.Clicks.superclass.constructor.call(this,config)
};
Ext.extend(
    bannerrev.grid.Clicks,MODx.grid.Grid,{
        setPeriod: function (tf,nv,ov) {
            var s = this.getStore();
            s.baseParams.period = tf.getValue();
            this.getBottomToolbar().changePage(1);
            this.refresh();
        }
    }
);
Ext.reg('bannerrevised-grid-clicks',bannerrev.grid.Clicks);