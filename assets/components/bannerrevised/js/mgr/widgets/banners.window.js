bannerrev.window.Ad = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-window-ad'
            ,title: _('bannerrevised.ads.new')
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            //,fileUpload: true
            ,modal: true
            ,resizable: false
            ,maximizable: false
            ,autoHeight: true
            ,width: 600
            ,baseParams: {
                action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Ads\\Update' :
                    'mgr/ads/update'
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
                                ,value: config.record ? config.record.source : bannerrev.config['media_source']
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
                ,items: bannerrev.positionsArray
                ,fieldLabel: _('bannerrevised.positions')
                ,name: 'positions'
            }
            ]
            ,keys: [{key: Ext.EventObject.ENTER,shift: true,fn:  function () {
                    this.submit()},scope: this}]
        }
    );
    bannerrev.window.Ad.superclass.constructor.call(this,config);
};
Ext.extend(bannerrev.window.Ad,MODx.Window);
Ext.reg('bannerrevised-window-ad',bannerrev.window.Ad);