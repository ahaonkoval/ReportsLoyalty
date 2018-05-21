
function Dict() {
    /// 
    this.getStoreCampaigns = function (type_id) {
        var model = Ext.define('v_campaigns_mk_run', {
            extend: 'Ext.data.Model',
            fields: ['Id', 'Name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetCampaignsRunsListByTypeId/'+type_id,
                reader: {
                    type: 'json',
                    root: 'v_campaigns_mk_run'
                }
            },
            remoteSort: false,
            sorters: [{
                property: 'id',
                direction: 'DESC'
            }],
        });

        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });

    },
    ///
    this.getStoreMarkets = function () {
        var model = Ext.define('DictMarkets', {
            extend: 'Ext.data.Model',
            fields: ['Id', 'ShortName', 'MarketName'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetDictMarkets/1',
                reader: {
                    type: 'json',
                    root: 'DictMarkets'
                }
            }
        });

        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });
    },
    ///
    this.getCmpGrpByLevel = function (level) {
        var model = Ext.define('FGroup', {
            extend: 'Ext.data.Model',
            fields: ['fgroup_id', 'name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetGroups/' + level,
                reader: {
                    type: 'json',
                    root: 'FGroup'
                }
            }
        });
        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });
    },

    // Завантаження переліку груп віддвілу (другий рівень довідника, name 2)
    // завантаження проходить ИД відділа
    this.getGrpNameTwoByOtdId = function (otdId) {
        var model = Ext.define('FGroup', {
            extend: 'Ext.data.Model',
            fields: ['fgroup_id', 'name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetGroupsByOtdId/' + otdId,
                reader: {
                    type: 'json',
                    root: 'FGroup'
                }
            }
        });
        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });
    },
    ///
    this.getDepartmentsListByOtdId = function (otdId) {
        var model = Ext.define('FGroup', {
            extend: 'Ext.data.Model',
            fields: ['fgroup_id', 'name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetDepartmentsByOtdId/' + otdId,
                reader: {
                    type: 'json',
                    root: 'FGroup'
                }
            }
        });
        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });
    },
    ///
    this.getCmpGrpByParentId = function (parentId) {
        var model = Ext.define('FGroup', {
            extend: 'Ext.data.Model',
            fields: ['fgroup_id', 'name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetGroupsByParentId/' + parentId,
                reader: {
                    type: 'json',
                    root: 'FGroup'
                }
            }
        });
        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: false
        });
    },
    ///
    //this.getCmpGrpByParentId = function (parentId, store_id) {
    //    var model = Ext.define('FGroup', {
    //        extend: 'Ext.data.Model',
    //        fields: ['fgroup_id', 'name'],
    //        proxy: {
    //            type: 'rest',
    //            url: 'api/dict/GetGroupsByParentId/' + parentId,
    //            reader: {
    //                type: 'json',
    //                root: 'FGroup'
    //            }
    //        }
    //    });
    //    return Ext.create('Ext.data.Store', {
    //        model: model,
    //        id: store_id,
    //        autoLoad: false
    //    });
    //},
    ///
    this.getStoreTrueFalse = function () {
        var m = Ext.define('ModelTrueFalse', {
            extend: 'Ext.data.Model',
            autoLoad: false,
            fields: ['id', 'name'],
            proxy: {
                url: ''
            }
        });
        return Ext.create('Ext.data.Store', {
            model: m,
            autoLoad: false,
            data: [
                [1, 'Так'],
                [0, 'Ні'],
            ]
        });
    },
    ///
    this.getStoreCampaignTypes = function () {
        var m = Ext.define('CampaignType', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetCampaignTypes/1',
                reader: {
                    type: 'json',
                    root: 'CampaignType'
                }
            }
        });
        return Ext.create('Ext.data.Store', {
            model: m,
            autoLoad: true
        });
    },
    ///
    this.getStoreCampaignTypesFiltered = function () {
        var m = Ext.define('CampaignType', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name'],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetCampaignTypesFilters/1',
                reader: {
                    type: 'json',
                    root: 'CampaignType'
                }
            }
        });
        var store = Ext.create('Ext.data.Store', {
            model: m,
            autoLoad: true
        });

        return store;
    },
    ///
    this.getStoreUPLControlData = function () {
         var m = Ext.define('UPLControl', {
             extend: 'Ext.data.Model',
             fields: ['City', 'Customers_qty', 'Diff_customers_qty', 'is_alert_customers_qty', 'card_issued_qty', 'diff_card_issued_qty',
             'is_alert_card_issued_qty', 'knk_qty', 'diff_knk_qty', 'is_alert_knk_qty', 'qty_doc', 'diff_qty_doc', 'is_alert_qty_doc', 'rrz_qty',
             'diff_rrz_qty', 'is_alert_rrz_qty', 'qty_sell_record_qty', 'diff_qty_sell_record_qty', 'is_alert_qty_sell_record_qty'],
             proxy: {
                 type: 'rest',
                 url: 'api/dict/GetUploadControlData/1',
                 reader: {
                     type: 'json',
                     root: 'UPLControl'
                 }
             }
         });
         return Ext.create('Ext.data.Store', {
             model: m,
             autoLoad: true
         });
     }
}

var dict = new Dict();
