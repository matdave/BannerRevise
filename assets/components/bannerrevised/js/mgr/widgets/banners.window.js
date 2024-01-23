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
            ,fields: this.getItems(config)
            ,keys: [{key: Ext.EventObject.ENTER,shift: true,fn:  function () {
                    this.submit()},scope: this}]
        }
    );
    bannerrev.window.Ad.superclass.constructor.call(this,config);
};
Ext.extend(bannerrev.window.Ad,MODx.Window, {
    getItems: function (config) {
        const items = [];
        items.push(this.getGeneralFields(config));
        if ((config.record &&
                (config.record.type === '' || config.record.type == null)
        ) || !config.record) {
            items.push(this.getTypes(config));
        }
        items.push(
            {
                items: [{
                    xtype: 'container'
                    ,layout: 'form'
                    ,hidden: !(config.record && config.record.type === 'image')
                    ,id: 'image-container'
                    ,items: this.getImageFields(config)
                }]
            });
        items.push(
            {
                items: [{
                    xtype: 'container'
                    ,layout: 'form'
                    ,hidden: !(config.record && config.record.type === 'html')
                    ,id: 'html-container'
                    ,items: this.getHTMLFields(config)
                }]
            });
        items.push(this.getDisplayFields(config));
        return items;
    }
    ,getTypes: function (config) {
        return [{
            xtype: 'modx-combo'
            ,fieldLabel: _('bannerrevised.ads.type')
            ,name: 'type'
            ,hiddenName: 'type'
            ,displayField: 'type'
            ,valueField: 'type'
            ,anchor: '99%'
            ,mode: 'local'
            ,store: new Ext.data.SimpleStore(
                {
                    fields: ['type']
                    ,data: [
                        ['image']
                        ,['html']
                    ]
                }
            )
            ,listeners: {
                select: {
                    fn: function (data) {
                        const html = Ext.getCmp('html-container');
                        const image = Ext.getCmp('image-container');
                        if (data.value === 'image') {
                            // clear all html fields
                            this.clearNestedItems(this, html);
                            html.hide();
                            image.show();
                        } else {
                            // clear all image fields
                            this.clearNestedItems(this, image);
                            image.hide();
                            html.show();
                        }
                    }
                },
                scope: this
            }
        }]
    }
    ,getHTMLFields: function (config) {
        return [{
            xtype: 'textarea'
            ,fieldLabel: _('bannerrevised.ads.html')
            ,name: 'html'
            ,anchor: '99%'
            ,height: 200
            ,allowBlank: true
            ,resize: true
        }]
    }
    ,getImageFields: function (config) {
        return [{
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
                        xtype: 'modx-combo-source'
                        ,fieldLabel: _('bannerrevised.ads.source')
                        ,id: 'modx-combo-source'
                        ,name: 'source'
                        ,anchor: '100%'
                        ,value: parseInt(config.record ? config.record.source : bannerrev.config['media_source'])
                        ,listeners: {
                            select: {fn:function (data) {
                                    var imgCombo = Ext.getCmp('newimage');
                                    imgCombo.setSrc(data.value)
                                }}
                            ,change: {fn:function (data) {
                                    var imgCombo =Ext.getCmp('newimage');
                                    imgCombo.setSrc(data.value)
                                }}
                        }
                    },{
                        xtype: 'modx-combo-adbrowser'
                        ,fieldLabel: config.update ? _('bannerrevised.ads.image.current') : _('bannerrevised.ads.image.new')
                        ,name: 'newimage'
                        ,id: 'newimage'
                        ,hideFiles: true
                        ,anchor: '99%'
                        ,allowBlank: true
                        ,openTo: config.openTo || '/'
                        ,source: parseInt(config.record ? config.record.source : bannerrev.config['media_source'])
                        ,listeners: {
                            select: {fn:function (data) {
                                    Ext.getCmp('currimg').setSrc(data.fullRelativeUrl, Ext.getCmp('modx-combo-source').getValue());
                                    Ext.getCmp('image').setValue(data.relativeUrl);
                                }}
                            ,change: {fn:function (data) {
                                    var value = this.getValue();
                                    Ext.getCmp('currimg').setSrc(value, Ext.getCmp('modx-combo-source').getValue());
                                    Ext.getCmp('image').setValue(value);
                                }}
                        }
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
        }
        ]
    }
    ,getGeneralFields: function (config) {
        return [{
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
                            xtype: 'bannerrevised-filter-resources'
                            ,fieldLabel: _('bannerrevised.ads.url')
                            ,name: 'url'
                            ,description: _('bannerrevised.ads.url.description')
                            ,anchor: '99%'
                            ,allowBlank: true
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
                        }]
                    }]
                }]
            }]
        }];
    }
    ,getDisplayFields: function (config) {
        return [
            {
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
    }
    ,clearNestedItems: function (t, i) {
        if (i === undefined) {
            return;
        }
        if (i.items) {
            i.items.each(function (item) {
                if (item.setValue) {
                    item.setValue('');
                }
                if (item.items) {
                    t.clearNestedItems(t, item);
                }
            });
        } else if (i.setValue) {
            i.setValue('');
        }
    }
});
Ext.reg('bannerrevised-window-ad',bannerrev.window.Ad);
