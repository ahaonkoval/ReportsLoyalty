
var showTriggerMessageEditorTemplates = function () {
    var center = Ext.getCmp('pnlCenter');

    var storeReport = Ext.create('Ext.data.JsonStore',
        {
            autoLoad: true,
            autoDestroy: true,
            //model: campaign_customers_model,
            proxy: {
                type: 'ajax',
                url: ('api/messagetemplate'),
                reader: {
                    type: 'json',
                    //method: 'get',
                    root: 'data',
                    idProperty: 'Id',
                    totalProperty: 'total'
                }
            },
            remoteSort: false,
            sorters: [
                {
                    property: 'Id',
                    direction: 'DESC'
                }
            ],
            pageSize: 20,
            fields: [
                { name: 'Id', type: 'int' },
                { name: 'MKey', type: 'string' },
                { name: 'MName', type: 'string' },
                { name: 'MViber', type: 'string' },
                { name: 'MSms', type: 'string' },
                { name: 'ConditionDocAmount', type: 'int' },
                { name: 'LinkImage', type: 'string' },
                { name: 'LinkButton', type: 'string' },
                { name: 'DateStart', type: 'date' },
                { name: 'DateEnd', type: 'date' },
            ]
        });

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'Id',
                text: '№',
                filterable: false,
                width: 35,
                //menuDisabled: true
            },
            {
                text: 'Назва шаблону',
                flex: 1,
                dataIndex: 'MName',
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Умова (сума чеку)',
                dataIndex: 'ConditionDocAmount',
                width: 80,
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Початок',
                xtype: 'datecolumn',
                dataIndex: 'DateStart',
                width: 80,
                format: 'd.m.Y',
                editor: {
                    xtype: 'datefield',
                    allowBlank: false,
                    format: 'd/m/Y'
                }
            }, {
                text: 'Кінець',
                xtype: 'datecolumn',
                dataIndex: 'DateEnd',
                width: 80,
                format: 'd.m.Y',
                editor: {
                    xtype: 'datefield',
                    allowBlank: false,
                    format: 'd/m/Y'
                }
            }
        ];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        //stateId: 'stateful-filter-grid',
        border: false,
        store: storeReport,
        columns: createColumns(5),
        //plugins: 'gridfilters',
        loadMask: true,
        bbar: [{
            xtype: 'pagingtoolbar',
            displayInfo: false,
            dock: 'bottom',
            displayMsg: '',//'Рядок: {0} - {1} of {2}',
            emptyMsg: "Нема записів...",
            store: storeReport
        }, {
            text: 'Додати шаблон',
            handler: function () {
                storeReport.add({
                    MKey: create_UUID()
                });
            }
        }],

        plugins: {
            ptype: 'rowediting',
            clicksToEdit: 2,
            listeners: {
                beforeedit: function (editor, context, eOpts) {
                    editorSms.setReadOnly(false);
                    editorViber.setReadOnly(false);

                    txtButtonLink.setReadOnly(false);
                    txtImageLink.setReadOnly(false);

                    txtButtonLink.setDisabled(false);
                    txtImageLink.setDisabled(false);
                },
                edit: function (editor, context, eOpts) {
                    var rc = context.record;

                    rc.set('MViber', editorViber.getValue());       // .replace(/<\/?[^>]+>/ig, "")
                    rc.set('MSms', editorSms.getValue());           // .replace(/<\/?[^>]+>/ig, "")

                    rc.set('LinkImage', txtImageLink.getValue());
                    rc.set('LinkButton', txtButtonLink.getValue());

                    rc.commit();

                    var template = {
                        Id:                 rc.get('Id'),
                        MKey:               rc.get('MKey'),
                        MName:              rc.get('MName'),
                        MViber:             rc.get('MViber'),
                        MSms:               rc.get('MSms'),
                        ConditionDocAmount: rc.get('ConditionDocAmount'),
                        LinkImage:          rc.get('LinkImage'),
                        LinkButton:         rc.get('LinkButton'),
                        DateStart:          rc.get('DateStart'),
                        DateEnd:            rc.get('DateEnd')
                    };

                    $.ajax({
                        url: 'api/messagetemplate',
                        type: 'post',
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(template),
                        success: function (id) {
                            if (id != "") {
                                rc.set("Id", id);
                                rc.commit();
                            }
                        }
                    });

                    editorSms.setReadOnly(true);
                    editorViber.setReadOnly(true);

                    txtButtonLink.setDisabled(true);
                    txtImageLink.setDisabled(true);
                },
                canceledit: function (editor, context) {
                    var rc = context.record;

                    editorSms.setValue(rc.get('MSms'));
                    editorViber.setValue(rc.get('MViber'));

                    editorSms.setReadOnly(false);
                    editorViber.setReadOnly(false);

                    txtButtonLink.setDisabled(true);
                    txtImageLink.setDisabled(true);
                }
            }
        },

        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                //winCd.Show(record, this.getStore());
            },
            selectionchange(ctrl, selected, eOpts) {
                if (selected[0] == undefined) {
                    editorSms.setValue('');
                    return;
                }
                editorSms.setValue(selected[0].get('MSms'));
                editorViber.setValue(selected[0].get('MViber'));

                txtImageLink.setValue(selected[0].get('LinkImage'));
                txtButtonLink.setValue(selected[0].get('LinkButton'));
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {

                //var status = record.get('is_start_get_status');

                //if (status == 0) {

                //    if (record.get('is_run') == true) {
                //        return 'x-grid-row-run';
                //    }

                //    if (record.get('is_run') == false)
                //        return 'x-grid-row';

                //} else {
                //    if (record.get('is_start_get_status') == 3) {
                //        return 'x-grid-row-block';
                //    }
                //}
            }
        }
    });

    var editorSms = Ext.create('Ext.form.TextArea', {
        readOnly: true,
        height: 100
    });

    var editorViber = Ext.create('Ext.form.TextArea', {
        readOnly: true,
        height: 250
    });

    var txtImageLink = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Посилання на зображення:',
        labelSeparator: '&nbsp',
        allowBlank: false,
        renderTo: Ext.getBody(),
        readOnly: true,
        disabled: true,
    });

    var txtButtonLink = Ext.create('Ext.form.field.Text', {
        labelSeparator: '&nbsp',
        fieldLabel: 'Посилання на кнопку:',
        allowBlank: false,
        renderTo: Ext.getBody(),
        readOnly: true,
        disabled: true,
    });

    var tab = center.add({

        title: 'ШАБЛОНИ ПОВІДОМЛЕНЬ',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'panel',
                    items: [grid],
                    layout: 'fit',
                    width: 450
                },
                {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                editorSms,
                                editorViber,
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 100,
                            margin: 5,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            renderTo: Ext.getBody(),
                            //bodyPadding: 1,
                            defaultType: 'textfield',
                            defaults: {
                                labelWidth: 120
                            },
                            items: [
                                txtImageLink,
                                txtButtonLink
                            ]
                        }, {
                            xtype: 'panel',
                            border: false,
                            flex: 1,
                            buttons: [
                                {
                                    text: 'Тест',
                                    handler: function () {
                                        var select = grid.getSelection();

                                        if (select.length > 0) {
                                            var storeTestPhones = Ext.create('Ext.data.JsonStore',
                                                {
                                                    autoLoad: true,
                                                    autoDestroy: true,
                                                    proxy: {
                                                        type: 'ajax',
                                                        url: ('api/testphones'),
                                                        reader: {
                                                            type: 'json',
                                                            root: 'data',
                                                            idProperty: 'Id',
                                                            totalProperty: 'total'
                                                        }
                                                    },
                                                    remoteSort: false,
                                                    sorters: [
                                                        {
                                                            property: 'Id',
                                                            direction: 'ASC'
                                                        }
                                                    ],
                                                    pageSize: 50,
                                                    fields: [
                                                        { name: 'Id', type: 'int' },
                                                        { name: 'MobilePhone', type: 'string' },
                                                        { name: 'MessageId', type: 'string' },
                                                        { name: 'Who', type: 'string' },
                                                        { name: 'Used', type: 'boolean' }
                                                    ]
                                                });

                                            var templateName = select[0].get('MName');
                                            var winTest = Ext.create('Ext.Window', {
                                                title: 'Шаблон: ' + templateName,
                                                width: 500,
                                                height: 200,
                                                modal: true,
                                                closable: true,
                                                layout: 'fit',
                                                items: [{
                                                    xtype: 'gridpanel',
                                                    store: storeTestPhones,
                                                    columns: [
                                                        {
                                                            dataIndex: 'Id',
                                                            text: '№',
                                                            filterable: false,
                                                            width: 10,
                                                            menuDisabled: true
                                                        }, {
                                                            dataIndex: 'MobilePhone',
                                                            text: 'Мобільний телефон',
                                                            filterable: false,
                                                            width: 200,
                                                            menuDisabled: true
                                                        }, {
                                                            dataIndex: 'Who',
                                                            text: 'Хто Це',
                                                            filterable: false,
                                                            width: 200,
                                                            menuDisabled: true
                                                        }, {
                                                            xtype: 'checkcolumn',
                                                            dataIndex: 'Used',
                                                            text: 'Відсилати',
                                                            filterable: false,
                                                            width: 70,
                                                            menuDisabled: true,
                                                            listeners: {
                                                                checkchange: function (column, rowIdx, checked, eOpts) {
                                                                    //console.log(column);
                                                                    //console.log(rowIdx);
                                                                    //console.log(checked);

                                                                    var store = storeTestPhones;
                                                                    var id = store.getAt(rowIdx).data.Id;

                                                                    var testOps = {
                                                                        Id: id,
                                                                        Checked: checked
                                                                    }
                                                                    $.ajax({
                                                                        url: 'api/TestPhones/SetToTest/1',
                                                                        type: 'post',
                                                                        dataType: "json",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        data: JSON.stringify(testOps),
                                                                        success: function (confirm) {
                                                                            if (confirm == 'true') {
                                                                                var store = storeTestPhones;
                                                                                store.getAt(rowIdx).commit();
                                                                            }

                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }],
                                                    bbar: [{
                                                        xtype: 'button',
                                                        text: 'Відправити',
                                                        handler: function () {
                                                            var select = grid.getSelection();
                                                            var templateId = select[0].get('Id');
                                                            var ms = {
                                                                TemplateId: templateId
                                                            };
                                                            $.ajax({
                                                                url: 'api/testphones/send/0',
                                                                type: 'post',
                                                                dataType: "json",
                                                                contentType: "application/json; charset=utf-8",
                                                                data: JSON.stringify(ms),
                                                                success: function (id) {
                                                                    if (id == "") {
                                                                        //rc.set("Id", id);
                                                                        //rc.commit();
                                                                        winTest.close();
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }]

                                                }],
                                                listeners: {
                                                    'close': function (win) {
                                                        //console.info('close');
                                                        //requestState = false;
                                                    },
                                                    'hide': function (win) {
                                                        //console.info('just hidden');
                                                    }
                                                }
                                            });
                                            winTest.show();
                                        }
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    });
    /* взято з гітхаб ))) */
    function create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    center.setActiveTab(tab);

}


///* Форма управління шаблоними тригерних повідомлень */
//var showTriggerMessageEditorTemplates = function () {
//    var center = Ext.getCmp('pnlCenter');

//    var storeReport = Ext.create('Ext.data.JsonStore',
//        {
//            autoLoad: true,
//            autoDestroy: true,
//            //model: campaign_customers_model,
//            proxy: {
//                type: 'ajax',
//                url: ('api/messagetemplate'),
//                reader: {
//                    type: 'json',
//                    //method: 'get',
//                    root: 'data',
//                    idProperty: 'id',
//                    totalProperty: 'total'
//                }
//            },
//            remoteSort: false,
//            sorters: [
//                {
//                    property: 'Id',
//                    direction: 'ASC'
//                }
//            ],
//            pageSize: 50,
//            fields: [
//                { name: 'Id',       type: 'int' },
//                { name: 'MKey',     type: 'string' },
//                { name: 'MName',    type: 'string' },
//                { name: 'MViber',   type: 'string' },
//                { name: 'MSms', type: 'string' },
//                { name: 'ConditionDocAmount', type: 'int' },
//                { name: 'LinkImage', type: 'string' },
//                { name: 'LinkButton', type: 'string' },
//                { name: 'DateStart', type: 'date' },
//                { name: 'DateEnd', type: 'date' },
//            ]
//        });

//    var createColumns = function (finish, start) {

//        var columns = [
//            {
//                dataIndex: 'Id',
//                text: '№',
//                filterable: false,
//                width: 35,
//                menuDisabled: true
//            },
//            {
//                text: 'Назва шаблону',
//                flex: 1,
//                dataIndex: 'MName',
//                editor: {
//                    allowBlank: false
//                }
//            }, {
//                text: 'Умова (сума 11чеку)',
//                dataIndex: 'ConditionDocAmount',
//                width: 80,
//                editor: {
//                    allowBlank: false
//                }
//            }, {
//                text: 'Початок',
//                dataIndex: 'DateStart',
//                width: 80,
//                editor: {
//                    allowBlank: false
//                }
//            }, {
//                text: 'Кінець',
//                dataIndex: 'DateEnd',
//                width: 80,
//                editor: {
//                    allowBlank: false
//                }
//            }
//        ];

//        return columns.slice(start || 0, finish);
//    };

//    var grid = Ext.create('Ext.grid.Panel', {
//        stateful: true,
//        stateId: 'stateful-filter-grid',
//        border: false,
//        store: storeReport,
//        columns: createColumns(7),
//        //plugins: 'gridfilters',
//        loadMask: true,
//        bbar: [{
//            xtype: 'pagingtoolbar',
//            displayInfo: false,
//            dock: 'bottom',
//            displayMsg: '',//'Рядок: {0} - {1} of {2}',
//            emptyMsg: "Нема записів...",
//            store: storeReport
//        }, {
//            text: 'Додати шаблон',
//            handler: function () {
//                storeReport.add({
//                    MKey: create_UUID()
//                });
//            }
//        }],

//        plugins: {
//            ptype: 'rowediting',
//            clicksToEdit: 2,
//            listeners: {
//                beforeedit: function (editor, context, eOpts) {
//                    editorSms.setReadOnly(false);
//                    editorViber.setReadOnly(false);

//                    txtButtonLink.setReadOnly(false);
//                    txtImageLink.setReadOnly(false);

//                    txtButtonLink.setDisabled(false);
//                    txtImageLink.setDisabled(false);
//                },
//                edit: function (editor, context, eOpts) {
//                    var rc = context.record;

//                    rc.set('MViber', editorViber.getValue());       // .replace(/<\/?[^>]+>/ig, "")
//                    rc.set('MSms', editorSms.getValue());           // .replace(/<\/?[^>]+>/ig, "")

//                    rc.set('LinkImage', txtImageLink.getValue());
//                    rc.set('LinkButton', txtButtonLink.getValue());

//                    rc.commit();

//                    var template = {
//                        Id: rc.get('Id'),
//                        MKey: rc.get('MKey'),
//                        MName: rc.get('MName'),
//                        MViber: rc.get('MViber'),
//                        MSms: rc.get('MSms'),
//                        ConditionDocAmount: rc.get('ConditionDocAmount'),
//                        LinkImage: rc.get('LinkImage'),
//                        LinkButton: rc.get('LinkButton')
//                    };

//                    $.ajax({
//                        url: 'api/messagetemplate',
//                        type: 'post',
//                        dataType: "json",
//                        contentType: "application/json; charset=utf-8",
//                        data: JSON.stringify(template),
//                        success: function (id) {
//                            if (id != "") {
//                                rc.set("Id", id);
//                                rc.commit();
//                            }
//                        }
//                    });

                    
//                    editorSms.setReadOnly(true);
//                    editorViber.setReadOnly(true);


//                    txtButtonLink.setDisabled(true);
//                    txtImageLink.setDisabled(true);
//                },
//                canceledit: function (editor, context) {
//                    var rc = context.record;

//                    editorSms.setValue(rc.get('MSms'));
//                    editorViber.setValue(rc.get('MViber'));

//                    editorSms.setReadOnly(false);
//                    editorViber.setReadOnly(false);

//                    txtButtonLink.setDisabled(true);
//                    txtImageLink.setDisabled(true);
//                }
//            }
//        },

//        emptyText: 'Записів більше нема',
//        listeners: {
//            'rowdblclick': function (grid, record, e) {
//                /* открываєм окно редактирования */
//                //winCd.Show(record, this.getStore());
//            },
//            selectionchange (ctrl, selected, eOpts) {
//                if (selected[0] == undefined) {
//                    editorSms.setValue('');
//                    return;
//                }                
//                editorSms.setValue(selected[0].get('MSms'));
//                editorViber.setValue(selected[0].get('MViber'));

//                txtImageLink.setValue(selected[0].get('LinkImage'));
//                txtButtonLink.setValue(selected[0].get('LinkButton'));
//            }
//        },
//        viewConfig: {
//            stripeRows: false,
//            getRowClass: function (record) {

//                //var status = record.get('is_start_get_status');

//                //if (status == 0) {

//                //    if (record.get('is_run') == true) {
//                //        return 'x-grid-row-run';
//                //    }

//                //    if (record.get('is_run') == false)
//                //        return 'x-grid-row';

//                //} else {
//                //    if (record.get('is_start_get_status') == 3) {
//                //        return 'x-grid-row-block';
//                //    }
//                //}
//            }
//        }
//    });

//    var editorSms = Ext.create('Ext.form.TextArea', {
//        readOnly: true,
//        height: 100
//    });

//    var editorViber = Ext.create('Ext.form.TextArea', {
//        readOnly: true,
//        height: 250
//    });

//    var txtImageLink = Ext.create('Ext.form.field.Text', {
//        fieldLabel: 'Посилання на зображення:',
//        labelSeparator: '&nbsp',
//        allowBlank: false,
//        renderTo: Ext.getBody(),
//        readOnly: true,
//        disabled: true,
//    });

//    var txtButtonLink = Ext.create('Ext.form.field.Text', {
//        labelSeparator: '&nbsp',
//        fieldLabel: 'Посилання на кнопку:',
//        allowBlank: false,
//        renderTo: Ext.getBody(),
//        readOnly: true,
//        disabled: true,
//    });

//    var tab = center.add({

//        title: 'ШАБЛОНИ ПОВІДОМЛЕНЬ',
//        extend: 'Ext.panel.Panel',
//        closable: true,
//        layout: 'fit',
//        items: {
//            layout: {
//                type: 'hbox',
//                align: 'stretch',
//                pack: 'start'
//            },
//            items: [
//                {
//                    xtype: 'panel',
//                    items: [grid],
//                    layout: 'fit',
//                    width: 600
//                },
//                {
//                    xtype: 'panel',
//                    border: false,
//                    flex: 1,
//                    layout: {
//                        type: 'vbox',
//                        align: 'stretch'
//                    },
//                    items: [
//                        {
//                            xtype: 'panel',
//                            border: false,                           
//                            layout: {
//                                type: 'vbox',
//                                align: 'stretch'
//                            },
//                            items: [
//                                editorSms,
//                                editorViber,
//                        ]},
//                        {
//                            xtype: 'panel',
//                            height: 100,
//                            margin: 5,
//                            border: false,
//                            layout: {
//                                type: 'vbox',
//                                align: 'stretch'
//                            },
//                            renderTo: Ext.getBody(),
//                            //bodyPadding: 1,
//                            defaultType: 'textfield',
//                            defaults: {
//                                labelWidth: 120
//                            },
//                            items: [
//                                txtImageLink,
//                                txtButtonLink
//                            ]
//                        },{
//                            xtype: 'panel',
//                            border: false,
//                            flex: 1,
//                            buttons: [
//                                {
//                                    text: 'Тест',
//                                    handler: function () {
//                                        var select = grid.getSelection();

//                                        if (select.length > 0) {
//                                            var storeTestPhones = Ext.create('Ext.data.JsonStore',
//                                                {
//                                                    autoLoad: true,
//                                                    autoDestroy: true,
//                                                    proxy: {
//                                                        type: 'ajax',
//                                                        url: ('api/testphones'),
//                                                        reader: {
//                                                            type: 'json',
//                                                            root: 'data',
//                                                            idProperty: 'Id',
//                                                            totalProperty: 'total'
//                                                        }
//                                                    },
//                                                    remoteSort: false,
//                                                    sorters: [
//                                                        {
//                                                            property: 'Id',
//                                                            direction: 'ASC'
//                                                        }
//                                                    ],
//                                                    pageSize: 50,
//                                                    fields: [
//                                                        { name: 'Id', type: 'int' },
//                                                        { name: 'MobilePhone', type: 'string' },
//                                                        { name: 'MessageId', type: 'string' },
//                                                        { name: 'Who', type: 'string' },
//                                                        { name: 'Used', type: 'boolean' }
//                                                    ]
//                                                });

//                                            var templateName = select[0].get('MName');
//                                            var winTest = Ext.create('Ext.Window', {
//                                                title: 'Шаблон: ' + templateName,
//                                                width: 500,
//                                                height: 200,
//                                                modal: true,
//                                                closable: true,
//                                                layout: 'fit',
//                                                items: [{
//                                                    xtype: 'gridpanel',
//                                                    store: storeTestPhones,
//                                                    columns:[
//                                                        {
//                                                            dataIndex: 'Id',
//                                                            text: '№',
//                                                            filterable: false,
//                                                            width: 10,
//                                                            menuDisabled: true
//                                                        }, {
//                                                            dataIndex: 'MobilePhone',
//                                                            text: 'Мобільний телефон',
//                                                            filterable: false,
//                                                            width: 200,
//                                                            menuDisabled: true
//                                                        }, {
//                                                            dataIndex: 'Who',
//                                                            text: 'Хто Це',
//                                                            filterable: false,
//                                                            width: 200,
//                                                            menuDisabled: true
//                                                        }, {
//                                                            xtype: 'checkcolumn',
//                                                            dataIndex: 'Used',
//                                                            text: 'Відсилати',
//                                                            filterable: false,
//                                                            width: 70,
//                                                            menuDisabled: true,
//                                                            listeners: {
//                                                                checkchange: function (column, rowIdx, checked, eOpts) {
//                                                                    //console.log(column);
//                                                                    //console.log(rowIdx);
//                                                                    //console.log(checked);

//                                                                    var store = storeTestPhones;
//                                                                    var id = store.getAt(rowIdx).data.Id;

//                                                                    var testOps = {
//                                                                        Id: id,
//                                                                        Checked: checked
//                                                                    }
//                                                                    $.ajax({
//                                                                        url: 'api/TestPhones/SetToTest/1',
//                                                                        type: 'post',
//                                                                        dataType: "json",
//                                                                        contentType: "application/json; charset=utf-8",
//                                                                        data: JSON.stringify(testOps),
//                                                                        success: function (confirm) {
//                                                                            if (confirm == 'true') {
//                                                                                var store = storeTestPhones;
//                                                                                store.getAt(rowIdx).commit();
//                                                                            }

//                                                                        }
//                                                                    });
//                                                                }
//                                                            }
//                                                        }],
//                                                    bbar: [{
//                                                        xtype: 'button',
//                                                        text: 'Відправити',
//                                                        handler: function () {
//                                                            var select = grid.getSelection();
//                                                            var templateId = select[0].get('Id');
//                                                            var ms = {
//                                                                TemplateId: templateId
//                                                            };
//                                                            $.ajax({
//                                                                url: 'api/testphones/send/0',
//                                                                type: 'post',
//                                                                dataType: "json",
//                                                                contentType: "application/json; charset=utf-8",
//                                                                data: JSON.stringify(ms),
//                                                                success: function (id) {
//                                                                    if (id == "") {
//                                                                        //rc.set("Id", id);
//                                                                        //rc.commit();
//                                                                        winTest.close();
//                                                                    }
//                                                                }
//                                                            });
//                                                        }
//                                                    }]

//                                                }],
//                                                listeners: {
//                                                    'close': function (win) {
//                                                        //console.info('close');
//                                                        //requestState = false;
//                                                    },
//                                                    'hide': function (win) {
//                                                        //console.info('just hidden');
//                                                    }
//                                                }
//                                            });
//                                            winTest.show();
//                                        }
//                                    }
//                                },
//                            ]
//                        }
//                    ]
//                }
//            ]
//        }
//    });
//    /* взято з гітхаб ))) */
//    function create_UUID() {
//        var dt = new Date().getTime();
//        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//            var r = (dt + Math.random() * 16) % 16 | 0;
//            dt = Math.floor(dt / 16);
//            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//        });
//        return uuid;
//    }

//    center.setActiveTab(tab);

//}
///*
//    ==========================================================================================================
//*/
var showDataSentTriggerMessages = function () {

    var center = Ext.getCmp('pnlCenter');

    var storeReport = Ext.create('Ext.data.JsonStore',
        {
            autoLoad: true,
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: ('api/MessageTemplate/DataGetSentTriggerMessages/0'),
                reader: {
                    type: 'json',
                    root: 'data',
                    idProperty: 'Id',
                    totalProperty: 'total'
                }
            },
            remoteSort: false,
            sorters: [
                {
                    property: 'TemplateId',
                    direction: 'ASC'
                }
            ],
            pageSize: 50,
            fields: [
                { name: 'TemplateId', type: 'int' },
                { name: 'Name', type: 'string' },
                { name: 'Count', type: 'int' }
            ]
        });

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'TemplateId',
                text: '№',
                filterable: false,
                width: 35,
                menuDisabled: true
            },
            {
                text: 'Назва шаблону',
                flex: 1,
                dataIndex: 'Name',
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Надіслано',
                dataIndex: 'Count',
                width: 80,
                editor: {
                    allowBlank: false
                }
            },
        ];

        return columns.slice(start || 0, finish);
    };

    var gridTemplates = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        //border: false,
        store: storeReport,
        padding: '2 2 2 2',
        columns: createColumns(5),
        loadMask: true,
        bbar: [{
            xtype: 'pagingtoolbar',
            displayInfo: false,
            dock: 'bottom',
            displayMsg: '',//'Рядок: {0} - {1} of {2}',
            emptyMsg: "Нема записів...",
            store: storeReport
        }],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                //winCd.Show(record, this.getStore());
            },
            'selectionchange': function (ctrl, selected, eOpts) {

                var storeDataSent = getStoreTemplateDataSent(selected[0].get('TemplateId'))
                dataview.setStore(storeDataSent);
                storeDataSent.load();

                var grid = gridTemplates;
                grid.setStore(null);
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                /* В залежності від  */
            }
        }
    });

    var getStoreRecipients = function (id, date) {

        if (id == null) return null;
        if (date == null) return null;

        var storeRecipients = Ext.create('Ext.data.JsonStore',
            {
                autoLoad: true,
                autoDestroy: true,
                proxy: {
                    type: 'ajax',
                    url: ('api/MessageTemplate/GetRecipientsTriggerMessage/' + id),
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'Id',
                        totalProperty: 'total'
                    },
                    extraParams: {
                        DateSent: date
                    }
                },
                remoteSort: false,
                sorters: [
                    {
                        property: 'RowNumber',
                        direction: 'ASC'
                    }
                ],
                pageSize: 50,
                fields: [
                    { name: 'RowNumber', type: 'int' },
                    { name: 'CrmCustomerId', type: 'int' },
                    { name: 'DateSend', type: 'date' },
                    { name: 'StatusId', type: 'int' },
                    { name: 'CustomerName', type: 'string' },
                    { name: 'MobilePhone', type: 'string' }
                ]
            });
        return storeRecipients;
    };

    var createColumnsRecipients = function (finish, start) {

        var columns = [
            {
                dataIndex: 'RowNumber',
                text: '№',
                filterable: false,
                width: 55,
                menuDisabled: true
            },
            //{
            //    text: 'Дата',
            //    dataIndex: 'DateSend',
            //    width: 80,
            //    xtype: 'datecolumn',
            //    format: 'd.m.Y',//'Y-m-d', // H:i:s
            //    editor: {
            //        allowBlank: false
            //    }
            //},
            //{
            //    text: 'Статус',
            //    dataIndex: 'StatusId',
            //    width: 80,
            //    editor: {
            //        allowBlank: false
            //    }
            //},
            {
                text: 'П.І.Б',
                flex: 1,
                dataIndex: 'CustomerName',
                width: 180,
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Телефон',
                dataIndex: 'MobilePhone',
                width: 110,
                editor: {
                    allowBlank: false
                }
            },
        ];

        return columns.slice(start || 0, finish);
    };

    var bbarRecipients = Ext.create('Ext.PagingToolbar', {
        displayInfo: false,
        dock: 'bottom',
        displayMsg: '',//'Рядок: {0} - {1} of {2}',
        emptyMsg: "Нема записів...",
        store: getStoreRecipients(0)
    })

    var gridRecipients = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
        //border: false,
        store: getStoreRecipients(0),
        columns: createColumnsRecipients(5),
        padding: '2 2 2 2',
        loadMask: true,
        bbar: [
            bbarRecipients,
        {
            xtype: 'button',
            text: 'Вивантажити всіх УПЛ',
            handler: function () {
                var grid = gridTemplates;
                var st = grid.getSelection();
                if (st.length > 0) {
                    var templateId = st[0].data.TemplateId;
                    var url = 'api/MessageTemplate/GetCustomersSendTemplatesById/' + templateId;
                    window.open(url);
                }
            }
        },
        //{
        //    xtype: 'button',
        //    text: 'Вивантажити',
        //    handler: function () {

        //    }
        //}
        ],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {

            },
            'selectionchange': function (ctrl, selected, eOpts) {

            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (record) {
                /* В залежності від  */
            }
        }
    });

    var getStoreTemplateDataSent = function (id) {

        if (id == null) return null;

        var store = Ext.create('Ext.data.JsonStore',
            {
                autoLoad: true,
                autoDestroy: true,
                proxy: {
                    type: 'ajax',
                    url: ('api/MessageTemplate/GetSentTriggerMessageByDate/' + id),
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'DateSend',
                        totalProperty: 'total'
                    }
                },
                remoteSort: false,
                sorters: [
                    {
                        property: 'DateSend',
                        direction: 'ASC'
                    }
                ],
                //pageSize: 50,
                fields: [
                    {
                        name: 'DateSend', type: 'string',
                        convert: function (v, record) {
                            return v.substring(0,10)
                        }
                        //dateFormat: 'Y-m-d',
                        //convert: function (v, record) {
                        //    if (v != null) {
                        //        if (v.toString().indexOf('/') > -1) {
                        //            return new Date(parseInt(v.substr(6)));
                        //        } else {
                        //            return v;
                        //        }

                        //    } else {
                        //        return '';
                        //    }
                        //}
                    }, //, dateFormat: 'Y-m-d'
                    { name: 'CustomersQty', type: 'int' }
                ]
            });
        store.load();
        return store;
    };

    var dataview = Ext.create({
        xtype: 'dataview',
        padding: '2 2 2 2',
        fullscreen: true,
        singleSelect: true,
        store: getStoreTemplateDataSent(null),
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-cell-datetemplate">{DateSend} ({CustomersQty})</div>',
            '</tpl>'
        ],
        itemSelector: 'div',
        overItemCls: 'x-item-over',
        autoScroll: true,
        trackOver: true,
        listeners: {
            selectionchange: function (record, item, index, e) {

                var grid = gridTemplates;
                var st = grid.getSelection();
                if (st.length > 0) {
                    var templateId = st[0].data.TemplateId;
                    if (item.length > 0) {
                        var store = getStoreRecipients(templateId, item[0].data.DateSend);
                        gridRecipients.setStore(store);
                        bbarRecipients.setStore(store);
                        store.load();
                    }
                }

            }
        }
    });


    var tab = center.add({

        title: 'Статистика надісланих повідомлень',
        extend: 'Ext.panel.Panel',
        closable: true,
        border: false,
        layout: 'fit',
        items: {
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    items: [
                        gridTemplates
                    ],
                    layout: 'fit',
                    width: 450
                },
                {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        //pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: true,
                            height: 200,
                            padding: '2 2 2 2',
                            autoScroll: true,
                            items: [dataview]
                        },
                        {
                            xtype: 'panel',
                            layout: 'fit',
                            border: false,
                            flex: 1,
                            items: [
                                gridRecipients
                            ]
                        }                        
                    ]
                }
            ]
        }
    });

    center.setActiveTab(tab);
}
