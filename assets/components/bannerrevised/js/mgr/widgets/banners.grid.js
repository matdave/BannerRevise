BannerRev.grid.Ads = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-ads'
            ,url: BannerRev.config.connectorUrl
            ,baseParams: { action: 'mgr/ads/getlist' }
            ,fields: ['id','name', 'url', 'image', 'current_image', 'active', 'positions', 'clicks', 'start', 'end', 'description']
            ,border: false
            ,remoteSort: true
            ,paging: true
            ,columns: [
            {header: _('id'),dataIndex: 'id',sortable: true,width: 10}
            ,{header: _('bannerrevised.ads.name'),dataIndex: 'name',sortable: true, width: 75}
            ,{header: _('bannerrevised.ads.url'),dataIndex: 'url',sortable: true, width: 100}
            ,{header: _('bannerrevised.ads.clicks'),dataIndex: 'clicks',sortable: false, width: 50}
            ,{header: _('bannerrevised.ads.active'),dataIndex: 'active',sortable: true, renderer: this.renderBoolean, width: 50}
            ,{header: _('bannerrevised.ads.image'),dataIndex: 'current_image',sortable: false,renderer: {fn:function (img) {
                return BannerRev.renderGridImage(img)}}, id: "byad-thumb", width: 100}
            ,{header: _('bannerrevised.ads.start'),dataIndex: 'start',sortable: true, width: 75}
            ,{header: _('bannerrevised.ads.end'),dataIndex: 'end',sortable: true, width: 75}
            //,{header: _('bannerrevised.ads.description'),dataIndex: 'description',sortable: false, hidden: true}
            ]
            ,tbar: [{
                text: _('bannerrevised.ads.new')
                ,handler: this.createAd
            },{
                xtype: 'tbfill'
            },{
                xtype: 'bannerrevised-filter-positions'
                ,id: 'bannerrevised-grid-ads-positionsfilter'
                ,width: 200
                ,listeners: {'select': {fn: this.FilterByPosition, scope:this}}
            },{
                xtype: 'tbspacer'
                ,width: 10
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
    BannerRev.positionsArray = [];
    BannerRev.posStore = new Ext.data.JsonStore(
        {
            url: BannerRev.config.connectorUrl
            ,root: 'results'
            ,baseParams: { action: 'mgr/positions/getlist', limit : 0 }
            ,fields: ["id", "name"]
            ,autoLoad: true
            ,listeners: {
                load: function (t, records, options) {
                    BannerRev.positionsArray = [];
                    for (var i=0; i<records.length; i++) {
                        BannerRev.positionsArray.push({name: "positions[]", inputValue: records[i].data.id, boxLabel: records[i].data.name});
                    }
                }
            }
        }
    );

    BannerRev.grid.Ads.superclass.constructor.call(this,config);
};
Ext.extend(
    BannerRev.grid.Ads,MODx.grid.Grid,{
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
            if (BannerRev.positionsArray.length == 0) {
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
                        action: 'mgr/ads/create'
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
            Ext.getCmp('currimg').setSrc('');
        }
        ,updateAd: function (btn,e, row) {
            if (typeof(row) != 'undefined') {this.menu.record = row.data;}
            if (BannerRev.positionsArray.length == 0) {
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
                    url: BannerRev.config.connectorUrl
                    ,params: {
                        action: 'mgr/ads/get'
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
                            Ext.getCmp('currimg').setSrc(record.current_image);
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
                        action: 'mgr/ads/remove'
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
                    url: BannerRev.config.connectorUrl
                    ,params: {
                        action: 'mgr/ads/enable'
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
                    url: BannerRev.config.connectorUrl
                    ,params: {
                        action: 'mgr/ads/disable'
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
Ext.reg('bannerrevised-grid-ads',BannerRev.grid.Ads);

BannerRev.window.Ad = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-window-ad'
            ,title: _('bannerrevised.ads.new')
            ,url: BannerRev.config.connectorUrl
            //,fileUpload: true
            ,modal: true
            ,resizable: false
            ,maximizable: false
            ,autoHeight: true
            ,width: 600
            ,baseParams: {
                action: 'mgr/ads/update'
            }
            ,fields: [{
                xtype: 'hidden'
                ,name: 'id'
            },{
                xtype: 'hidden'
                ,name: 'image'
                ,anchor: '99%'
                ,id: 'image'
            },{
                xtype: 'textfield'
                ,fieldLabel: _('bannerrevised.ads.name')
                ,name: 'name'
                ,anchor: '99%'
                ,allowBlank: false
            },{
                items: [{
                    layout: 'form'
                    ,items: [{
                        layout: 'column'
                        ,border: false
                        ,items: [{
                            columnWidth: .8
                                 ,border: false
                                 ,layout: 'form'
                                 ,items: [{
                                        xtype: 'modx-combo-source'
                                        ,fieldLabel: _('bannerrevised.ads.source')
                                        ,id: 'modx-combo-source'
                                        ,name: 'source'
                                        ,anchor: '100%'
                                        ,value: config.record ? config.record.source : BannerRev.config['media_source']
                            }]
                        },{
                            columnWidth: .2
                                 ,border: false
                                 ,layout: 'form'
                                 ,items: [{
                                        xtype: 'xcheckbox'
                                        ,fieldLabel: _('bannerrevised.ads.active')
                                        ,name: 'active'
                                        ,inputValue: 1
                                        ,checked: !config.update
                            }]
                        }]
                    }]
                }]
            },{
                items: [{
                    layout: 'column'
                    ,border: false
                    ,items: [{
                        columnWidth: .3
                        ,border: false
                        ,layout: 'form'
                        ,items: [{
                            id: 'currimg'
                                 //,hideLabel: true
                                 ,style: 'margin-top: 20px;'
                                 ,xtype: 'image'
                                 ,cls: 'bannerrevised-thumb-window'
                        }]
                    },{
                        columnWidth: .7
                        ,border: false
                        ,layout: 'form'
                        ,style: 'margin-right: 5px;'
                        ,items: [{
                            xtype: 'modx-combo-adbrowser'
                                 ,fieldLabel: config.update ? _('bannerrevised.ads.image.current') : _('bannerrevised.ads.image.new')
                                 ,name: 'newimage'
                                 ,hideFiles: true
                                 ,anchor: '99%'
                                 ,allowBlank: true
                                 ,openTo: config.openTo || '/'
                                 ,listeners: {
                                        select: {fn:function (data) {
                                                 Ext.getCmp('currimg').setSrc(data.url, Ext.getCmp('modx-combo-source').getValue());
                                                  Ext.getCmp('image').setValue(data.relativeUrl);
                                        }}
                                        ,change: {fn:function (data) {
                                                  var value = this.getValue();
                                                  Ext.getCmp('currimg').setSrc(value, Ext.getCmp('modx-combo-source').getValue());
                                                  Ext.getCmp('image').setValue(value);
                                        }}
                            }
                        },{
                            xtype: 'bannerrevised-filter-resources'
                                 ,fieldLabel: _('bannerrevised.ads.url')
                                 ,name: 'url'
                                 ,description: _('bannerrevised.ads.url.description')
                                 ,anchor: '99%'
                                 ,allowBlank: true
                        },{
                            xtype: 'textarea'
                                 ,fieldLabel: _('bannerrevised.ads.description')
                                 ,name: 'description'
                                 ,anchor: '99%'
                                 ,height: 75
                                 ,allowBlank: true
                                 ,resize: true
                        }]
                    }]
                }]
            },{
                items: [{
                    layout: 'form'
                    ,items: [{
                        layout: 'column'
                        ,border: false
                        ,items: [{
                            columnWidth: .5
                                 ,border: false
                                 ,layout: 'form'
                                 ,items: [{
                                        xtype : 'xdatetime'
                                        ,fieldLabel: _('bannerrevised.ads.start')
                                        ,name: 'start'
                                        ,dateFormat: 'Y-m-d'
                                        ,allowBlank: true
                                        ,timeFormat: 'H:i'
                                        ,emptyText: null
                                        ,anchor: '99%'
                            }]
                        },{
                            columnWidth: .5
                                 ,border: false
                                 ,layout: 'form'
                                 ,style: 'margin-right: 5px;'
                                 ,items: [{
                                        xtype : 'xdatetime'
                                        ,fieldLabel: _('bannerrevised.ads.end')
                                        ,name: 'end'
                                        ,allowBlank: true
                                        ,dateFormat: 'Y-m-d'
                                        ,timeFormat: 'H:i'
                                        ,emptyText: null
                                        ,anchor: '99%'
                            }]
                        }]
                    }]
                }]
            },{
                xtype: 'checkboxgroup'
                ,id: 'positions'
                ,columns: 3
                ,items: BannerRev.positionsArray
                ,fieldLabel: _('bannerrevised.positions')
                ,name: 'positions'
            }
            ]
            ,keys: [{key: Ext.EventObject.ENTER,shift: true,fn:  function () {
                this.submit()},scope: this}]
        }
    );
    BannerRev.window.Ad.superclass.constructor.call(this,config);
};
Ext.extend(BannerRev.window.Ad,MODx.Window);
Ext.reg('bannerrevised-window-ad',BannerRev.window.Ad);
