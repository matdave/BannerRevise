bannerrev.window.Position = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-window-position'
            ,title: _('bannerrevised.positions.new')
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,modal: true
            ,width: 600
            ,autoHeight: true
            ,baseParams: {
                action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Positions\\Update' :
                    'mgr/positions/update'
            }
            ,fields: [{
                xtype: 'hidden'
                ,name: 'id'
            },{
                xtype: 'textfield'
                ,fieldLabel: _('bannerrevised.positions.name')
                ,name: 'name'
                ,anchor: '99%'
                ,allowBlank: false
            },{
                xtype: 'bannerrevised-grid-adpositions'
                ,update: config.update
                ,position: config.position
                ,pageSize: 5
            }
            ]
            ,keys: [{key: Ext.EventObject.ENTER,shift: true,fn:  function () {
                    this.submit()},scope: this}]
        }
    );
    bannerrev.window.Position.superclass.constructor.call(this,config);
};
Ext.extend(bannerrev.window.Position,MODx.Window);
Ext.reg('bannerrevised-window-position',bannerrev.window.Position);