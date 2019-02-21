
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
                { name: 'MSms',     type: 'string' },

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
            }, {
                text: 'Ключ',
                dataIndex: 'MKey',
                menuDisabled: true,
                width: 100,
                editor: {
                    allowBlank: false
                }
            },
            {
                text: 'Назва шаблону',
                flex: 1,
                dataIndex: 'MName',
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
            displayInfo: true,
            dock: 'bottom',
            displayMsg: 'Displaying topics {0} - {1} of {2}',
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
                },
                edit: function (editor, context, eOpts) {
                    var rc = context.record;

                    rc.set('MViber', editorViber.getValue());
                    rc.set('MSms', editorSms.getValue());
                    rc.commit();

                    var template = {
                        Id: rc.get('Id'),
                        MKey: rc.get('MKey'),
                        MName: rc.get('MName'),
                        MViber: rc.get('MViber'),
                        MSms: rc.get('MSms')
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
                },
                canceledit: function (editor, context) {
                    var rc = context.record;

                    editorSms.setValue(rc.get('MSms'));
                    editorViber.setValue(rc.get('MViber'));

                    editorSms.setReadOnly(true);
                    editorViber.setReadOnly(true);
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

                /**
                 * 
                 */
                // if (selected[0].get('mailing_id') == "")
                // {
                //     btnStartGettingMailingStatus.setHidden(true);
                // } else {
                //     btnStartGettingMailingStatus.setHidden(false);
                // }


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
        enableLinks: true,
        enableLists: true,
        readOnly: true,
        height: 150
    });

    var editorViber = Ext.create('Ext.form.HtmlEditor', {
        enableColors: true,
        enableAlignments: true,
        enableSourceEdit: true,
        enableFont: true,
        enableFontSize: true,
        enableFormat: true,
        enableLinks: true,
        enableLists: true,
        readOnly: true,
        height: 350
    });

    var tab = center.add({

        title: 'ШАБЛОНИ ПОВІДОМЛЕНЬ',
        extend: 'Ext.panel.Panel',
        closable: true,
        layout: 'fit',
        items: {
            //layout: {
            //    type: 'vbox',
            //    align: 'stretch',
            //    pack: 'start'
            //},
            //layout: 'fit',
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
                    width: 400
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        editorSms,
                        editorViber
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