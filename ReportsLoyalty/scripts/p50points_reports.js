
var get50PointsGrid = function () {

    var getStore50PointsCampaigns = function () {

        var store = Ext.create('Ext.data.JsonStore', {
            model: Ext.define('50PointsCampaigns', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'id',
                    type: 'int'
                }, {
                    name: 'name',
                    type: 'string'
                }, {
                    name: 'date_start',
                    type: 'date'
                }, {
                    name: 'date_end',
                    type: 'date'
                }],
                changeName: function () {
                    var oldName = this.get('name'),
                        newName = oldName + " The Barbarian";

                    this.set('name', newName);
                }
            }),
            autoDestroy: true,
            autoLoad: true,
            idProperty: 'id',
            proxy: {
                type: 'rest',
                url: 'api/DictCampaign/Get50PointsCampaigns/0', // Router.getHome() + 
                headers: {
                    'Authorization': 'tk 111' //+ btoa(sessionStorage.getItem("token"))
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    idProperty: 'id',
                    totalProperty: 'total'
                }
            },
            remoteSort: false,
            sorters: [{
                property: 'id',
                direction: 'ASC'
            }],
            pageSize: 50
        });

        return store;
    }

    var grid50PointsReports = Ext.create('Ext.grid.Panel', {
        //stateful: true,
        //stateId: 'stateful-filter-grid',
        border: false,
        //header: 'sefrswerf',
        store: getStore50PointsCampaigns(),
        //title: false,
        hideHeaders: true,
        columns: [{
            dataIndex: 'name',
            text: 'Назва кампанії',
            id: 'name',
            tdCls: 'custom-column',
            flex: 1,
            filter: {
                type: 'string'
            },
            renderer: function (value, metadata, record) {
                var d_start = record.get('date_start');
                var d_end = record.get('date_end');
                
                if (record.get('id') != 0) {
                    return value + ' (' + d_start.toLocaleDateString() + '-' + d_end.toLocaleDateString() + ')';
                } else {
                    return value;
                }
                //return value;
            }
        },
        {
            //text: 'DELETE',
            align: 'center',
            xtype: 'actioncolumn',            
            width: 35,
            items: [
                //{
                //    xtype: 'button',
                //    text: 'DELETE ME',
                //    //scale: 'small',
                //    handler: function () {
                //        alert("Hello World!");
                //    }
                //}
                {
                    icon: 'img/Settings_16x16.png',
                    tooltip: 'Перерахунок...',
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.Msg.alert("Button clicked" + rowIndex);
                    }
                }
            ]
        }
        //{
        //    text: 'Button',
        //    width: 55,
        //    xtype: 'widgetcolumn',
        //    //dataIndex: 'progress',
        //    textAlign: 'left',
        //    widget: {
        //        width: 45,
        //        //heigth: 30,
        //        textAlign: 'left',
        //        xtype: 'button',
        //        //iconCls: 'widget-grid-user',
        //        handler: function (btn) {
        //            //var rec = btn.getWidgetRecord();
        //            //Ext.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
        //        }
        //    }
        //}
        ],
        loadMask: true,
        listeners: {
            'rowclick': function (grid, record, e) {
                
                //alert('');
                var hi = Ext.getCmp('h_p50p_campaign_id');
                hi.setValue(record.data.id);

                
            }
        }
    });

    return grid50PointsReports;
}



