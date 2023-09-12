bannerrev.grid.Ads = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-ads'
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: { action: bannerrev.config.modx3 ? 'BannerRevised\\v3\\Processors\\Ads\\GetList' : 'mgr/ads/getlist' }
            ,fields: ['id','name', 'url', 'type', 'image', 'current_image', 'active', 'positions', 'clicks', 'start', 'end', 'description', 'html']
            ,border: false
            ,remoteSort: true
            ,paging: true
            ,columns: [
            {header: _('id'),dataIndex: 'id',sortable: true,width: 10}
            ,{header: _('bannerrevised.ads.name'),dataIndex: 'name',sortable: true, width: 75}
            ,{header: _('bannerrevised.ads.url'),dataIndex: 'url',sortable: true, width: 100}
            ,{header: _('bannerrevised.ads.clicks'),dataIndex: 'clicks',sortable: false, width: 50}
            ,{header: _('bannerrevised.ads.active'),dataIndex: 'active',sortable: true, renderer: this.renderBoolean, width: 50}
            ,{header: _('bannerrevised.ads.type'),dataIndex: 'type',sortable: true, width: 75}
            ,{header: _('bannerrevised.ads.image'),dataIndex: 'current_image',sortable: false,renderer: {fn:function (img) {
                return bannerrev.renderGridImage(img)}}, id: "brevad-thumb", width: 100}
            ,{header: _('bannerrevised.ads.start'),dataIndex: 'start',sortable: true, width: 75}
            ,{header: _('bannerrevised.ads.end'),dataIndex: 'end',sortable: true, width: 75}
            //,{header: _('bannerrevised.ads.description'),dataIndex: 'description',sortable: false, hidden: true}
            ]
            ,tbar: [{
                text: _('bannerrevised.ads.new')
                ,handler: this.createAd
            },'->',{
                xtype: 'bannerrevised-filter-positions'
                ,id: 'bannerrevised-grid-ads-positionsfilter'
                ,width: 200
                ,listeners: {'select': {fn: this.FilterByPosition, scope:this}}
            }, {
                xtype: 'bannerrevised-filter-byquery'
                ,id: 'bannerrevised-ads-filter-byquery'
                ,listeners: {
                    render: {fn: function (tf) {
                        tf.getEl().addKeyListener(
                            Ext.EventObject.ENTER, function () {
                                     this.FilterByQuery(tf);}, this
                        );},scope: this}
                }
            },{
                xtype: 'bannerrevised-filter-clear'
                ,text: '<i class="'+ (MODx.modx23 ? 'icon icon-times' : 'fa fa-times') + '"></i>'
                ,listeners: {click: {fn: this.FilterClear, scope: this}}
            }]
            ,viewConfig: {
                forceFit: true
                ,enableRowBody: true
                ,autoFill: true
                ,showPreview: true
                ,scrollOffset: 0
                ,getRowClass : function (rec, ri, p) {
                    if (!rec.data.active) {
                        return 'bannerrevised-row-disabled';
                    }
                    return '';
                }
            }
            ,listeners: {
                rowDblClick: function (grid, rowIndex, e) {
                    var row = grid.store.getAt(rowIndex);
                    this.updateAd(grid, e, row);
                }
            }
        }
    );

    //positions store/array for checkboxes in add/update window
    bannerrev.positionsArray = [];
    bannerrev.posStore = new Ext.data.JsonStore(
        {
            url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,root: 'results'
            ,baseParams: { action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Positions\\GetList' :
                    'mgr/positions/getlist', limit : 0 }
            ,fields: ["id", "name"]
            ,autoLoad: true
            ,listeners: {
                load: function (t, records, options) {
                    bannerrev.positionsArray = [];
                    for (var i=0; i<records.length; i++) {
                        bannerrev.positionsArray.push({name: "positions[]", inputValue: records[i].data.id, boxLabel: records[i].data.name});
                    }
                }
            }
        }
    );

    bannerrev.grid.Ads.superclass.constructor.call(this,config);
};
Ext.extend(
    bannerrev.grid.Ads,MODx.grid.Grid,{
        getMenu: function (grid,idx) {
            var icon = 'x-menu-item-icon icon icon-';
            var row = grid.store.data.items[idx]
            var m = [{
                text: '<i class="' + icon + 'edit"></i> ' + _('bannerrevised.ads.update')
                ,handler: this.updateAd
            }];
            if (row.data.active == 0) {
                m.push(
                    {
                        text: '<i class="' + icon + 'check"></i> ' +  _('bannerrevised.ads.enable')
                        ,handler: this.enableAd}
                );
            }
            else {
                m.push(
                    {
                        text: '<i class="' + icon + 'power-off"></i> ' + _('bannerrevised.ads.disable')
                        ,handler: this.disableAd
                    }
                );
            }
            m.push(
                '-', {
                    text: '<i class="' + icon + 'times"></i> ' + _('bannerrevised.ads.remove')
                    ,handler: this.removeAd
                }
            );
            this.addContextMenuItem(m);
            return true;
        }
        ,FilterClear: function () {
            var s = this.getStore();
            s.baseParams.query = '';
            s.baseParams.position = '';
            Ext.getCmp('bannerrevised-ads-filter-byquery').reset();
            Ext.getCmp('bannerrevised-grid-ads-positionsfilter').reset();
            this.getBottomToolbar().changePage(1);
            this.refresh();
        }
        ,FilterByQuery: function (tf, nv, ov) {
            var s = this.getStore();
            s.baseParams.query = tf.getValue();
            this.getBottomToolbar().changePage(1);
            this.refresh();
        }
        ,FilterByPosition: function (combo, row, idx) {
            var s = this.getStore();
            s.baseParams.position = row.id;
            this.getBottomToolbar().changePage(1);
            this.refresh();
        }
        ,createAd: function (btn,e) {
            if (bannerrev.positionsArray.length == 0) {
                MODx.msg.alert(_('error'),_('bannerrevised.error.no_positions'));
                Ext.getCmp('bannerrevised-tabs').setActiveTab('bannerrevised-positions');
                return;
            }
            var w = MODx.load(
                {
                    xtype: 'bannerrevised-window-ad'
                    ,update: 0
                    ,openTo: '/'
                    ,closeAction: 'close'
                    ,baseParams: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Ads\\Create' :
                            'mgr/ads/create'
                    }
                    ,listeners: {
                        success: {fn:this.refresh,scope:this}
                        //,hide: {fn:function() {this.getEl().remove()}}
                    }
                }
            );
            w.setTitle(_('bannerrevised.ads.new')).show(
                e.target,function () {
                    w.setPosition(null,50)},this
            );
            Ext.getCmp('bannerrevised-window-ad').reset();
            // Ext.getCmp('currimg').setSrc('');
        }
        ,updateAd: function (btn,e, row) {
            if (typeof(row) != 'undefined') {this.menu.record = row.data;}
            if (bannerrev.positionsArray.length == 0) {
                MODx.msg.alert(_('error'),_('bannerrevised.error.no_positions'));
                Ext.getCmp('bannerrevised-tabs').setActiveTab('bannerrevised-positions');
                return;
            }
            var openTo = this.menu.record.image;
            if (openTo != '' && typeof openTo !== "undefined") {
                if (!/^\//.test(openTo)) {
                    openTo = '/' + openTo;
                }
                if (!/$\//.test(openTo)) {
                    var tmp = openTo.split('/')
                    delete tmp[tmp.length - 1];
                    tmp = tmp.join('/');
                    openTo = tmp.substr(1)
                }
            }

            MODx.Ajax.request(
                {
                    url: bannerrev.config.modx3 ?
                        MODx.config.connector_url :
                        bannerrev.config.connector_url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Ads\\Get' :
                            'mgr/ads/get'
                        ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success': {fn:function (r) {
                            var record = r.object;

                            var w = MODx.load(
                                {
                                    xtype: 'bannerrevised-window-ad'
                                    ,update: 1
                                    ,openTo: openTo
                                    ,record: record
                                    ,closeAction: 'close'
                                    ,listeners: {
                                        success: {fn:this.refresh,scope:this}
                                           //,hide: {fn:function() {this.getEl().remove()}}
                                    }
                                }
                            );

                            record.newimage = record.image;
                            w.reset();
                            w.setValues(record);
                            w.setTitle(_('bannerrevised.ads.update')).show(
                                e.target,function () {
                                    w.setPosition(null,50)},this
                            );
                            if (record.type == 'image') {
                                Ext.getCmp('currimg').setSrc(record.current_image);
                            }
                            this.enablePositions(record.positions);
                        },scope:this}
                    }
                }
            );
        }
        ,removeAd: function () {
            MODx.msg.confirm(
                {
                    title: _('bannerrevised.ads.remove')
                    ,text: _('bannerrevised.ads.remove.confirm')
                    ,url: this.config.url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Ads\\Remove' :
                            'mgr/ads/remove'
                        ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success': {fn:this.refresh,scope:this}
                    }
                }
            );
        }
        ,enableAd: function () {
            MODx.Ajax.request(
                {
                    url: bannerrev.config.modx3 ?
                        MODx.config.connector_url :
                        bannerrev.config.connector_url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Ads\\Enable' :
                            'mgr/ads/enable'
                          ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success': {fn:this.refresh,scope:this}
                    }
                }
            )
        }
        ,disableAd: function () {
            MODx.Ajax.request(
                {
                    url: bannerrev.config.modx3 ?
                        MODx.config.connector_url :
                        bannerrev.config.connector_url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\Ads\\Disable' :
                            'mgr/ads/disable'
                        ,id: this.menu.record.id
                    }
                    ,listeners: {
                        'success': {fn:this.refresh,scope:this}
                    }
                }
            )
        }
        ,enablePositions: function (positions) {
            var checkboxgroup = Ext.getCmp('positions');
            Ext.each(
                checkboxgroup.items.items, function (item) {
                    if(positions.indexOf(item.inputValue) !== -1) {
                          item.setValue(true);
                    }
                    else {
                         item.setValue(false);
                    }
                }
            );
        }
        ,renderBoolean: function (value) {
            if (value == 1) {return '<span style="color:green;">'+_('yes')+'</span>';}
            else {return '<span style="color:red;">'+_('no')+'</span>';}
        }
    }
);
Ext.reg('bannerrevised-grid-ads',bannerrev.grid.Ads);
