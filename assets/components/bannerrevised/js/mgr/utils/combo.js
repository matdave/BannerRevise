MODx.combo.positions = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            name: 'position'
            ,hiddenName: 'position'
            ,displayField: 'name'
            ,valueField: 'id'
            ,editable: true
            ,fields: ['name','id']
            ,pageSize: 10
            ,emptyText: _('bannerrevised.positions.select')
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: {
                action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Positions\\GetList' :
                    'mgr/positions/getlist'
            }
        }
    );
    MODx.combo.positions.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.positions,MODx.combo.ComboBox);
Ext.reg('bannerrevised-filter-positions',MODx.combo.positions);


MODx.combo.resources = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            name: 'url'
            ,hiddenName: 'url'
            ,displayField: 'pagetitle'
            ,valueField: 'url'
            ,editable: true
            ,fields: ['id','pagetitle','url','parents']
            ,pageSize: 10
            ,emptyText: ''
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: {
                action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\Resource\\GetList' :
                    'mgr/resource/getlist'
            }
            ,forceSelection: false
            ,tpl: new Ext.XTemplate(
                ''
                +'<tpl for="."><div class="x-combo-list-item bannerrevised-resource-list-item">'
                +'<tpl if="parents">'
                +'<span class="parents">'
                +'<tpl for="parents">'
                +'<nobr><small>{pagetitle} / </small></nobr>'
                +'</tpl>'
                +'</span>'
                +'</tpl>'
                +'<span><tpl if="id"><sup><small>({id})</small></sup> </tpl><b>{pagetitle}</b></span>'
                +'</div></tpl>',{
                    compiled: true
                }
            )
            ,itemSelector: 'div.bannerrevised-resource-list-item'
        }
    );
    MODx.combo.resources.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.resources,MODx.combo.ComboBox);
Ext.reg('bannerrevised-filter-resources',MODx.combo.resources);


MODx.combo.AdBrowser = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            width: 300
            ,triggerAction: 'all'
            ,source: config.source || 1
        }
    );
    MODx.combo.AdBrowser.superclass.constructor.call(this,config);
    this.config = config;
    this.browser = [];
};
Ext.extend(
    MODx.combo.AdBrowser,MODx.combo.Browser,{
        browser: null

        ,onTriggerClick : function (btn) {
            if (this.disabled) {
                return false;
            }

            var source = Ext.getCmp('modx-combo-source')
            var source_id = source.getValue() || 1;
            if (!this.browser[source]) {
                this.browser[source] = MODx.load(
                    {
                        xtype: 'modx-browser'
                        ,id: Ext.id()
                        ,multiple: true
                        ,source: source_id
                        ,hideFiles: this.config.hideFiles || false
                        ,rootVisible: this.config.rootVisible || false
                        ,allowedFileTypes: this.config.allowedFileTypes || ''
                        ,wctx: this.config.wctx || 'web'
                        ,openTo: this.config.openTo || ''
                        ,rootId: this.config.rootId || '/'
                        ,hideSourceCombo: this.config.hideSourceCombo || false
                        ,listeners: {
                            'select': {fn: function (data) {
                                    this.setValue(data.relativeUrl);
                                    this.fireEvent('select',data);
                                    var matched = data.thumb.match(/source=([0-9]{1,})$/);
                                    if  (matched && matched[1]) {
                                        source.setValue(matched[1]);
                                    }
                                    else {
                                        source.setValue('');
                                    }
                                },scope:this}
                        }
                    }
                );
            }
            this.browser[source].show(btn);

            return true;
        }

        ,onDestroy: function () {
            MODx.combo.AdBrowser.superclass.onDestroy.call(this);
        }
    }
);
Ext.reg('modx-combo-adbrowser',MODx.combo.AdBrowser);