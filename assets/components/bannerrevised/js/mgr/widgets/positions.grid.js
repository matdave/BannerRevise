BannerRev.grid.Positions = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-positions'
            ,url: BannerRev.config.connectorUrl
            ,baseParams: { action: 'mgr/positions/getlist' }
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
            },{
                xtype: 'tbfill'
            },{
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
    BannerRev.grid.Positions.superclass.constructor.call(this,config)
};
Ext.extend(
    BannerRev.grid.Positions,MODx.grid.Grid,{
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
                            BannerRev.posStore.reload();
                        },scope:this}
                    }
                    ,baseParams: {
                        action: 'mgr/positions/create'
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
                            BannerRev.posStore.reload();
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
                        action: 'mgr/positions/remove'
                        ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success':{fn:function () {
                            Ext.getCmp('bannerrevised-grid-positions').store.reload();
                            BannerRev.posStore.reload();
                        },scope:this}
                    }
                }
            );
        }
    }
);
Ext.reg('bannerrevised-grid-positions',BannerRev.grid.Positions);

BannerRev.window.Position = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-window-position'
            ,title: _('bannerrevised.positions.new')
            ,url: BannerRev.config.connectorUrl
            ,modal: true
            ,width: 600
            ,autoHeight: true
            ,baseParams: {
                action: 'mgr/positions/update'
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
    BannerRev.window.Position.superclass.constructor.call(this,config);
};
Ext.extend(BannerRev.window.Position,MODx.Window);
Ext.reg('bannerrevised-window-position',BannerRev.window.Position);



BannerRev.grid.AdPositions = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-adpositions'
            ,url: BannerRev.config.connectorUrl
            ,baseParams: {
                action: 'mgr/adpositions/getlist'
                ,position: config.position || 0
            }
            ,fields: ['id','name','idx','image']
            ,autoHeight: true
            ,paging: true
            ,disabled: config.update == 0 ? 1 : 0
            ,hidden: config.update == 0 ? 1 : 0
            ,pageSize: config.pageSize || 5
            ,columns: [
            {header: _('bannerrevised.adposition.idx'),dataIndex: 'idx',sortable: false, width: 25}
            ,{header: _('bannerrevised.ads.name'),dataIndex: 'name',sortable: false}
            ,{header: _('bannerrevised.ads.image'),dataIndex: 'image',sortable: false, width: 50, renderer: {fn:function (img) {
                return BannerRev.renderGridImage(img)}}, id: 'byad-thumb2'}
            ]
            ,plugins: [new Ext.ux.dd.GridDragDropRowOrder(
                {
                    listeners: {
                        'afterrowmove': {
                            fn: function (drag, old_order, new_order, row) {
                                   row = row[0];
                                   var grid = drag.grid;
                                   var el = Ext.get('bannerrevised-grid-adpositions');
                                   el.mask(_('loading'),'x-mask-loading')
                                MODx.Ajax.request(
                                    {
                                        url: BannerRev.config.connectorUrl
                                        ,params: {
                                            action: 'mgr/adpositions/sort'
                                                   ,id: row.data.id
                                                   ,new_order: new_order
                                                   ,old_order: old_order
                                        }
                                        ,listeners: {
                                            'success': {fn:function (r) {
                                                el.unmask();
                                                grid.refresh();
                                            },scope:grid}
                                                   ,'failure': {fn:function (r) {
                                                       el.unmask();
                                                   },scope:grid}
                                        }
                                            }
                                )
                            }
                            ,scope: this
                        }
                    }
                }
            )]
        ,tbar: [{
            xtype: 'bannerrevised-filter-ads'
            ,id: 'bannerrevised-grid-adpositions-adsfilter'
            ,position: config.position
            ,mode: 'exclude'
            ,width: 250
            ,listeners: {
                'select': {fn:function (combo,row,idx) {
                    this.addAdPosition(row.id, config.position, combo)
                    combo.clearValue();
                }, scope:this}
            }
            }]
        }
    );
    BannerRev.grid.AdPositions.superclass.constructor.call(this,config)
};
Ext.extend(
    BannerRev.grid.AdPositions,MODx.grid.Grid,{
        getMenu: function () {
            var icon = 'x-menu-item-icon icon icon-';
            var m = [{
                text: '<i class="' + icon + 'times"></i> ' + _('bannerrevised.adposition.remove')
                ,handler: this.removeAdPosition
            }];
            this.addContextMenuItem(m);
            return true;
        }
        ,removeAdPosition: function () {
            MODx.Ajax.request(
                {
                    url: BannerRev.config.connectorUrl
                    ,params: {
                        action: 'mgr/adpositions/remove'
                        ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success': {fn:function () {
                            this.refresh();
                            Ext.getCmp('bannerrevised-grid-adpositions-adsfilter').store.reload();
                        },scope:this}
                    }
                }
            );
        }
        ,addAdPosition: function (ad, position, combo) {
            MODx.Ajax.request(
                {
                    url: BannerRev.config.connectorUrl
                    ,params: {
                        action: 'mgr/adpositions/add'
                        ,ad: ad
                        ,position: position
                    }
                    ,listeners: {
                        'success': {fn:function () {
                            this.refresh();
                            combo.store.reload();
                        },scope:this}
                    }
                }
            )
        }
    }
);
Ext.reg('bannerrevised-grid-adpositions',BannerRev.grid.AdPositions);