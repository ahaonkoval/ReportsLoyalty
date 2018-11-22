
function Dict() {

    this.CurrentGroupsForDepartsIds = null,

    //this.Sections = this.getCmpGrpByLevel(0),

    /* 
        Довідник статусів (типів) УПЛ 
        використовується в формі вибору УПЛ під акцію (створення списку УПЛ кампанії)
    */
    this.getCrmCustomerStatus = function (type_id) {
        var model = Ext.define('v_campaigns_mk_run', {
            extend: 'Ext.data.Model',
            fields: [
                'CrmCustomerStatusId',
                'NameUa'
            ],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetCrmCustomerStatus/1',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            remoteSort: false,
            sorters: [{
                property: 'CrmCustomerStatusId',
                direction: 'ASC'
            }],
        });

        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });

    },
    /*
        Використовуюється в формах виводу звітів при виборі активностей  
    */
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
    /*
        Довідник торгових центрів ...         
    */
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
    /*
        Перелік груп підгруп
    */
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
    // -----------------------------------------------------------------------
    // Завантаження переліку груп віддвілу (другий рівень довідника, name 2)
    // завантаження проходить ИД відділа
    //this.getGrpNameTwoByOtdId = function (otdId) {
    //    var model = Ext.define('FGroup', {
    //        extend: 'Ext.data.Model',
    //        fields: ['fgroup_id', 'name'],
    //        proxy: {
    //            type: 'rest',
    //            url: 'api/dict/GetGroupsByOtdId/' + otdId,
    //            reader: {
    //                type: 'json',
    //                root: 'FGroup'
    //            }
    //        }
    //    });
    //    return Ext.create('Ext.data.Store', {
    //        model: model,
    //        autoLoad: true
    //    });
    //},
    /*
        Перелік департаментів у відділі
    */
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
    /*
        Завантажує перелік груп третього рівня по ИД департаментів
    */
    this.getGroupsForDepartsIds = function (departIds) {
        var model = Ext.define('GroupsForDeparts', {
            extend: 'Ext.data.Model',
            fields: [
                'name_3',
                'lf3_id',
                'lf2_id',
                'lf1_id',
                'name_1',
                'name_full'
            ],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetGroupsForDeparts/0',
                reader: {
                    type: 'json',
                    root: 'data'
                },
                extraParams: {
                    Ids: departIds                   
                }
            }
        });
        return Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true
        });
    },
    /*
        Для статусу кампанії
    */
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
    /* 
        Довіднитк типів кампаній
    */
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
    /*
        Фільтрований довідник кампаній
    */
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
    // -----------------------------------------------------------------------
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
    },
     
    this.getStoreDownloadStatusTables = function () {
        var m = Ext.define('CampaignType', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Number', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'DownloadStatus', type: 'string' },
                {
                    name: 'Created', type: 'date',
                    convert: function (v, record) {
                        if (v != null) {
                            if (v.toString().indexOf('/') > -1) {
                                return new Date(parseInt(v.substr(6)));
                            } else {
                                return v;
                            }

                        } else {
                            return '';
                        }
                    }
                }
            ],
            proxy: {
                type: 'rest',
                url: 'api/dict/GetDownloadStatus/1',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        var store = Ext.create('Ext.data.Store', {
            model: m,
            autoLoad: true
        });

        return store;
    }
}

var dict = new Dict();
