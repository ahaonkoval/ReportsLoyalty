var gridDownloadStatus = Ext.create('Ext.grid.Panel', {
    stateful: true,
    stateId: 'stateful-filter-grid',
    border: false,
    store: dict.getStoreDownloadStatusTables(),
    columns: [
        {
            dataIndex: 'Number',
            text: '№',
            width: 40
        }, {
            dataIndex: 'title',
            text: 'Назва таблиці',
            width: 150
        },
        {
            dataIndex: 'DownloadStatus',
            text: 'Завантажено',
            width: 80
        },
        {
            dataIndex: 'Created',
            text: 'Дата завантаження',
            xtype: 'datecolumn',
            //format: 'd.m.Y'
            format: 'Y-m-d H:i:s.u',
            width: 150
        }
    ],
    loadMask: true,
    //dockedItems: [Ext.create('Ext.toolbar.Paging', {
    //    dock: 'bottom',
    //    store: dict.getStoreDownloadStatusTables()
    //})],
    emptyText: 'Записів більше нема',
    listeners: {
        'rowdblclick': function (grid, record, e) {
            /* открываєм окно редактирования */
            //Ext.Msg.confirm("Увага!", "Завантажити УПЛ з таблиці '" + record.get('name') + "'", function (btnText) {
            //    if (btnText === "no") {

            //    }
            //    else if (btnText === "yes") {
            //        StartFillCampaign(record, cmpId);
            //        win.hide();
            //    }
            //}, this);
        }
    },
    viewConfig: {
        stripeRows: false,
        getRowClass: function (record) {

            var status = record.get('DownloadStatus');

            if (status == 'ні') {

                //if (record.get('is_run') == true) {
                return 'x-grid-row-alert';
                //}

                //if (record.get('is_run') == false)
                //    return 'x-grid-row';
                //return record.get('is_run') == true ? 'x-grid-row-run' : 'x-grid-row';

                //if (record.get('is_start_get_status') == 1) {
                //    return 'x-grid-row-getting-status';
                //} else {
                //    return css;
                //}

            }
            //else {
            //    if (record.get('is_start_get_status') == 3) {
            //        return 'x-grid-row-block';
            //    }
            //}
        }
    }
});

var getWinDownloadStatus = function () {

    var win = Ext.create('Ext.Window', {
        //id: 'win_customers',
        title: 'статус завантаження таблиць...',
        width: 400,
        height: 500,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                border: false,
                //flex: 1,
                //layout: 'fit',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start',
                },
                items: [
                    {
                        height: 30, items: [
                            //checkbox
                        ]
                    },
                    {
                        html: 'panel 3', flex: 1, layout: 'fit',
                        items: [gridDownloadStatus()]
                    }
                ]
            }],
        buttons: [
            // {
            //     xtype: 'button',
            //     text: 'Завантажити',
            //     //scope: cmp_id,
            //     listeners: {
            //         'click': function (ctrl) {
            //             var selection = grid.selModel.getSelection();
            //             if (selection.length > 0) {
            //                 StartFillCampaign(selection[0], cmpId, checkbox.getValue())
            //                 win.hide();
            //             } else {
            //                 Ext.Msg.alert("Увага!", "Не вибрана таблиця для заванатження УПЛ!");
            //             }
            //         }
            //     }
            // },
            {
                xtype: 'button',
                text: 'Закрити',
                //scope: cmp_id,
                listeners: {
                    'click': function (ctrl) {
                        win.hide();
                    }
                }
            },]
    })

    return win;
};