
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
                    root: 'data',
                    idProperty: 'id',
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
                { name: 'Id',       type: 'int' },
                { name: 'MKey',     type: 'string' },
                { name: 'MName',    type: 'string' },
                { name: 'MViber',   type: 'string' },
                { name: 'MSms', type: 'string' },
                { name: 'ConditionDocAmount', type: 'int' },
                { name: 'LinkImage', type: 'string' },
                { name: 'LinkButton', type: 'string' },

            ]
        });

    var createColumns = function (finish, start) {

        var columns = [
            {
                dataIndex: 'Id',
                text: '№',
                filterable: false,
                width: 35,
                menuDisabled: true
            },
            //{
            //    text: 'Ключ',
            //    dataIndex: 'MKey',
            //    menuDisabled: true,
            //    width: 100,
            //    editor: {
            //        allowBlank: false
            //    }
            //},
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
            },
            //{
            //    text: 'SMS текст (до 70 символів)',
            //    flex: 2,
            //    dataIndex: 'MSms',
            //    editor: {
            //        allowBlank: false,
            //        /*  */
            //        validator: function (value) {
            //            if (value.length > 70) {
            //                return false;
            //            }
            //            return true;
            //        },
            //    }
            //},
            //{
            //    text: 'VIBER текст (до 1000 символів)',
            //    flex: 3,
            //    dataIndex: 'MViber',
            //    editor: {
            //        allowBlank: false,
            //        validator: function (value) {
            //            if (value.length > 1000) {
            //                return false;
            //            }
            //            return true;
            //        },
            //    }
            //}
        ];

        return columns.slice(start || 0, finish);
    };

    var grid = Ext.create('Ext.grid.Panel', {
        stateful: true,
        stateId: 'stateful-filter-grid',
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
                        Id: rc.get('Id'),
                        MKey: rc.get('MKey'),
                        MName: rc.get('MName'),
                        MViber: rc.get('MViber'),
                        MSms: rc.get('MSms'),
                        ConditionDocAmount: rc.get('ConditionDocAmount'),
                        LinkImage: rc.get('LinkImage'),
                        LinkButton: rc.get('LinkButton')
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

                    //txtImageLink.setReadOnly(true);
                    //txtButtonLink.setReadOnly(true);

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
        //dockedItems: [Ext.create('Ext.toolbar.Paging', {
        //    dock: 'bottom',
        //    store: storeReport,
        //    listeners: {
        //        beforechange(ctrl, page, eOpts) {
        //            // ураааааа!!!!
        //            //store.getProxy().extraParams.isRun = checkboxIsRun.getValue();
        //            //store.getProxy().extraParams.TypeId = comboBox.getValue();
        //            //store.getProxy().extraParams.blogid = 1;
        //        }
        //    }
        //})],
        emptyText: 'Записів більше нема',
        listeners: {
            'rowdblclick': function (grid, record, e) {
                /* открываєм окно редактирования */
                //winCd.Show(record, this.getStore());
            },
            selectionchange (ctrl, selected, eOpts) {
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

    var editorSms = Ext.create('Ext.form.HtmlEditor', {
        enableColors: true,
        enableAlignments: true,
        enableSourceEdit: true,
        enableFont: true,
        enableFontSize: true,
        enableFormat: true,
        //enableLinks: true,
        enableLists: true,
        readOnly: true,
        height: 100
    });

    //var editorViber = Ext.create('Ext.form.HtmlEditor', {
    //    enableColors: true,
    //    enableAlignments: true,
    //    enableSourceEdit: true,
    //    enableFont: true,
    //    enableFontSize: true,
    //    enableFormat: true,
    //    //enableLinks: true,
    //    enableLists: true,
    //    readOnly: true,
    //    height: 350
    //});

    var editorViber = Ext.create('Ext.form.TextArea', {
        readOnly: true,
        height: 350
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
                        ]},
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
                        },{
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
                                                        { name: 'mobile_phone', type: 'string' }
                                                    ]
                                                });

                                            var templateName = select[0].get('MName');
                                            var winTest = Ext.create('Ext.Window', {
                                                title: 'Шаблон: ' + templateName,
                                                width: 300,
                                                height: 200,
                                                modal: true,
                                                closable: true,
                                                layout: 'fit',
                                                items: [{
                                                    xtype: 'gridpanel',
                                                    store: storeTestPhones,
                                                    columns:[
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
                                                                url: 'api/testphones',
                                                                type: 'post',
                                                                dataType: "json",
                                                                contentType: "application/json; charset=utf-8",
                                                                data: JSON.stringify(ms),
                                                                success: function (id) {
                                                                    if (id != "") {
                                                                        rc.set("Id", id);
                                                                        rc.commit();
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