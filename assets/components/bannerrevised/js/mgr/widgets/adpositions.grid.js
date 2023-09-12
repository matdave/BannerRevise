bannerrev.grid.AdPositions = function (config) {
    config = config || {};
    Ext.applyIf(
        config,{
            id: 'bannerrevised-grid-adpositions'
            ,url: bannerrev.config.modx3 ?
                MODx.config.connector_url :
                bannerrev.config.connector_url
            ,baseParams: {
                action: bannerrev.config.modx3 ?
                    'BannerRevised\\v3\\Processors\\AdPositions\\GetList' :
                    'mgr/adpositions/getlist'
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
                            return bannerrev.renderGridImage(img)}}, id: 'brevad-thumb2'}
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
                                        url: bannerrev.config.modx3 ?
                                            MODx.config.connector_url :
                                            bannerrev.config.connector_url
                                        ,params: {
                                            action: bannerrev.config.modx3 ?
                                                'BannerRevised\\v3\\Processors\\AdPositions\\Sort' :
                                                'mgr/adpositions/sort'
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
    bannerrev.grid.AdPositions.superclass.constructor.call(this,config)
};
Ext.extend(
    bannerrev.grid.AdPositions,MODx.grid.Grid,{
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
                    url: bannerrev.config.modx3 ?
                        MODx.config.connector_url :
                        bannerrev.config.connector_url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\AdPositions\\Remove' :
                            'mgr/adpositions/remove'
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
                    url: bannerrev.config.modx3 ?
                        MODx.config.connector_url :
                        bannerrev.config.connector_url
                    ,params: {
                        action: bannerrev.config.modx3 ?
                            'BannerRevised\\v3\\Processors\\AdPositions\\Add' :
                            'mgr/adpositions/add'
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
Ext.reg('bannerrevised-grid-adpositions',bannerrev.grid.AdPositions);