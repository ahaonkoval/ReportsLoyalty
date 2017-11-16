//var showParticipantBySex = function () {
//    var center = Ext.getCmp('pnlCenter');

//    tab = center.add({
//        title: 'ЕКСТРА БАЛИ',
//        extend: 'Ext.panel.Panel',
//        closable: true,
//        layout: 'fit',
//        items: [{
//            xtype: 'box',
//            autoEl: {
//                tag: 'iframe',
//                src: 'pages/sale_with_extra_point.aspx',
//            },
//        }]
//    });

//    center.setActiveTab(tab);
//}
/* Основні показники ПЛ */
var showBasicIndicators = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_basic_indicators');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_basic_indicators',
        title: 'Загальні показники',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_basic_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_basic_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_basic_indicators',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/basic_indicators.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_basic_indicators');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_basic_indicators');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_basic_indicators');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_basic_indicators');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_basic_indicators').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_basic_indicators',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_basic_indicators').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_basic_indicators',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* статистка по профілю УПЛ */
var showProfileParticipant = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_profile_participant');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_profile_participant',
        title: 'Профіль учасників',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_profile_participant',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_profile_participant',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_profile_participant',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/profile_participant.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_profile_participant');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_profile_participant');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_profile_participant');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_profile_participant');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_profile_participant').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_profile_participant',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_profile_participant').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_profile_participant',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* Розподіл УПЛ по кількості днів з покупками */
var showUplByDay = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_upl_byday');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_upl_byday',
        title: 'Розподіл УПЛ по кількості днів з покупками',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_upl_byday',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_upl_byday',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_upl_byday',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/upl_trade_byday.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_upl_byday');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_upl_byday');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_upl_byday');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_upl_byday');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_upl_byday').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_upl_byday',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_upl_byday').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_upl_byday',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* Розподіл карт по візитам */
var showUplVisit = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_upl_visit');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_upl_visit',
        title: 'Розподіл УПЛ по кількості днів з покупками',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_upl_visit',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_upl_visit',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_upl_visit',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/upl_visits.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_upl_visit');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_upl_visit');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_upl_visit');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_upl_visit');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_upl_visit').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_upl_visit',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_upl_visit').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_upl_visit',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* Розподіл карт по сумі */
var showUplSUM = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_upl_sum');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_upl_sum',
        title: 'Розподіл УПЛ по кількості днів з покупками',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_upl_sum',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_upl_sum',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_upl_sum',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/upl_sum.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_upl_sum');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_upl_sum');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_upl_sum');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_upl_sum');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_upl_sum').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_upl_sum',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_upl_sum').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_upl_sum',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* Середні показники програми */
var showProgramIndicators = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_program_indicators');
    if (p_personal_offers != null) return;

    tab = center.add({
        id: 'p_program_indicators',
        title: 'Середні показники програми',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 35,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_program_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_program_indicators',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    }, {
                        xtype: 'label',
                        text: 'Магазин:'
                    }, {
                        id: 'cmb_markets_program_indicators',
                        xtype: 'combobox',
                        width: 250,
                        store: dict.getStoreMarkets(),
                        queryMode: 'local',
                        displayField: 'market_name',
                        valueField: 'id',
                        renderTo: Ext.getBody()
                    }, {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/page_program_indicators.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_program_indicators');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_program_indicators');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            var cmbMarkets = Ext.getCmp('cmb_markets_program_indicators');
                            var market_id = cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_program_indicators');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_program_indicators').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_program_indicators',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_program_indicators').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_program_indicators',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}
/* Прохідність */
var showCountersDocsAndSell = function () {
    var center = Ext.getCmp('pnlCenter');

    var p_personal_offers = Ext.getCmp('p_counters_docs_and_sell');
    if (p_personal_offers != null) return;


    var comboBox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Магазин',
        store: dict.getStoreMarkets(),
        multiSelect: true,
        queryMode: 'local',
        valueField: 'short_name',
        displayField: 'market_name',
        width: 300,
        labelWidth: 50,
        emptyText: 'Всі',
        itemCls: 'make-bold',
        renderTo: Ext.getBody(),
        tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="x-boundlist-item">{market_name}</div>',
            '</tpl>'
        ),
        displayTpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{short_name};',
            '</tpl>'
        ),
        listeners: {
            change: function (ctrl, newValue, oldValue, eOpts) {
                if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') == -1) {
                    ctrl.setValue(['all'])
                } else {
                    if (oldValue != null) {
                        if (newValue.indexOf('all') > -1 && oldValue.indexOf('all') > -1)
                            ctrl.setValue([]);
                    }
                }
            }
        }

    });

    tab = center.add({
        id: 'p_counters_docs_and_sell',
        title: 'Прохідність',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'panel',
                height: 36,
                items: {
                    xtype: 'toolbar',
                    height: 36,
                    items: [{
                        xtype: 'label',
                        text: 'Дата початку:'
                    }, {
                        id: 'dtDST_start_counters_docs',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        minDate: new Date(),
                        value: "23/07/2016",
                        width: 110
                    }, {
                        xtype: 'label',
                        text: 'Дата кінця:'
                    }, {
                        id: 'dtDST_end_counters_docs',
                        xtype: 'datefield',
                        format: "d/m/Y",
                        //minDate: new Date(),
                        value: new Date(),
                        width: 110
                    }, {
                        xtype: 'tbseparator'
                    },
                    comboBox,
                    //{
                    //    xtype: 'label',
                    //    text: 'Магазин:'
                    //}, {
                    //    id: 'cmb_markets_counters_docs',
                    //    //xtype: 'tagfield',//'combobox',
                    //    xtype: 'tagfield',
                    //    multiSelect: true,
                    //    editabe: true,
                    //    width: 250,

                    //    store: dict.getStoreMarkets(),
                    //    queryMode: 'local',
                    //    displayField: 'market_name',
                    //    valueField: 'id',
                    //    renderTo: Ext.getBody()
                    //},
                    {
                        xtype: 'button',
                        width: 100,
                        text: 'Показати',
                        handler: function () {

                            var url = 'pages/counter_docs.aspx?'

                            var dtStart = Ext.getCmp('dtDST_start_counters_docs');
                            var date_start = dtStart.getValue();
                            if (date_start == null) {
                                url = url + '&date_start=' + date_start
                            } else {
                                date_start = date_start.toLocaleDateString();
                                url = url + '&date_start=' + date_start
                            }

                            var dtEnd = Ext.getCmp('dtDST_end_counters_docs');
                            var date_end = dtEnd.getValue();
                            if (date_end == null) {
                                url = url + '&date_end=' + date_end
                            } else {
                                date_end = date_end.toLocaleDateString();
                                url = url + '&date_end=' + date_end
                            }

                            //var cmbMarkets = Ext.getCmp('cmb_markets_counters_docs');
                            var market_id = comboBox.getValue(); // cmbMarkets.getValue();
                            if (market_id == null) market_id = 0;
                            url = url + '&market_id=' + market_id;

                            var report_box = Ext.getCmp('rep_box_counters_docs');
                            if (report_box != null) {
                                Ext.getCmp('p_rep_conteiner_counters_docs').remove(report_box);
                            }

                            //url = url + '&height=' + (center.getWidth() - 30)

                            dynamicPanel = new Ext.Component({
                                id: 'rep_box_counters_docs',
                                xtype: 'box',
                                layout: 'fit',
                                showMask: true,
                                autoEl: {
                                    tag: 'iframe',
                                    src: url
                                }
                            });
                            Ext.getCmp('p_rep_conteiner_counters_docs').add(dynamicPanel);
                        }
                    }]
                }
            }, {
                xtype: 'panel',
                layout: 'fit',
                id: 'p_rep_conteiner_counters_docs',
                flex: 1
            }]
        }
    });

    center.setActiveTab(tab);
}