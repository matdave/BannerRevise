bannerrev.grid.Positions = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-positions'
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: { action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Positions\\GetList' :
                    'mgr/positions/getlist' }
            ,fields: ['id','name','clicks']
            ,border: false
            ,remoteSort: true
            ,paging: true
            ,columns: [{
                header: _('id')
                ,dataIndex: 'id'
                ,sortable: true
                ,width: 10
            },{
                header: _('bannerrevised.positions.name')
                ,dataIndex: 'name'
                ,sortable: true
            },{
                header: _('bannerrevised.positions.clicks')
                ,dataIndex: 'clicks'
                ,sortable: false
            }]
            ,tbar: [{
                text: _('bannerrevised.positions.new')
                ,handler: this.createPosition
            },'->',{
                xtype: 'bannerrevised-filter-byquery'
                ,id: 'bannerrevised-positions-filter-byquery'
                ,listeners: {
                    render: {fn: function (tf) {
                        tf.getEl().addKeyListener(
                            Ext.EventObject.ENTER, function () {
                                     this.FilterByQuery(tf);}, this
                        );},scope: this}
                }
            },{
                xtype: 'bannerrevised-filter-clear'
                ,text: '<i class="icon icon-times"></i>'
                ,listeners: {click: {fn: this.FilterClear, scope: this}}
            }]
            ,listeners: {
                rowDblClick: function (grid, rowIndex, e) {
                    var row = grid.store.getAt(rowIndex);
                    this.updatePosition(grid, e, row);
                }
            }
        }
    );
    bannerrev.grid.Positions.superclass.constructor.call(this,config)
};
Ext.extend(
    bannerrev.grid.Positions,MODx.grid.Grid,{
        getMenu: function () {
            var icon = 'x-menu-item-icon icon icon-';
            var m = [{
                text: '<i class="' + icon + 'edit"></i>' + _('bannerrevised.positions.update')
                ,handler: this.updatePosition
            },'-',{
                text: '<i class="' + icon + 'times"></i>' + _('bannerrevised.positions.remove')
                ,handler: this.removePosition
            }];
            this.addContextMenuItem(m);
            return true;
        }
        ,FilterClear: function () {
            var s = this.getStore();
            s.baseParams.query = '';
            Ext.getCmp('bannerrevised-positions-filter-byquery').reset();
            this.getBottomToolbar().changePage(1);
            this.refresh();
        }
        ,FilterByQuery: function (tf, nv, ov) {
            var s = this.getStore();
            s.baseParams.query = tf.getValue();
            this.getBottomToolbar().changePage(1);
            this.refresh();
        }
        ,createPosition: function (btn,e) {
            var w = MODx.load(
                {
                    xtype: 'bannerrevised-window-position'
                    ,update: 0
                    ,position: 0
                    ,closeAction: 'close'
                    ,listeners: {
                        success:{fn:function () {
                            Ext.getCmp('bannerrevised-grid-positions').store.reload();
                            bannerrev.posStore.reload();
                        },scope:this}
                    }
                    ,baseParams: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Positions\\Create' :
                            'mgr/positions/create'
                    }
                }
            );
            w.setTitle(_('bannerrevised.positions.new')).show(
                e.target,function () {
                    w.setPosition(null,50)},this
            );
            Ext.getCmp('bannerrevised-window-position').reset();
        }
        ,updatePosition: function (btn,e, row) {
            if (typeof(row) != 'undefined') {this.menu.record = row.data;}
            var w = MODx.load(
                {
                    xtype: 'bannerrevised-window-position'
                    ,update: 1
                    ,position: this.menu.record.id
                    ,closeAction: 'close'
                    ,listeners: {
                        'success':{fn:function () {
                            Ext.getCmp('bannerrevised-grid-positions').store.reload();
                            bannerrev.posStore.reload();
                        },scope:this}
                    }
                }
            );
            w.setTitle(_('bannerrevised.positions.update')).show(
                e.target,function () {
                    w.setPosition(null,50)},this
            );
            Ext.getCmp('bannerrevised-window-position').reset();
            Ext.getCmp('bannerrevised-window-position').setValues(this.menu.record);
        }
        ,removePosition: function () {
            MODx.msg.confirm(
                {
                    title: _('bannerrevised.positions.remove')
                    ,text: _('bannerrevised.positions.remove.confirm')
                    ,url: this.config.url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Positions\\Remove' :
                            'mgr/positions/remove'
                        ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success':{fn:function () {
                            Ext.getCmp('bannerrevised-grid-positions').store.reload();
                            bannerrev.posStore.reload();
                        },scope:this}
                    }
                }
            );
        }
    }
);
Ext.reg('bannerrevised-grid-positions',bannerrev.grid.Positions);
