
function winCustomers() {

    this.win = Ext.create('Ext.Window', {
        id: 'win_customers',
        title: 'Учасники кампанії',
        width: 1000,
        height: 800,
        modal: true,
        closable: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        items: [{
            xtype: 'panel',
            height: 1
        }, {
            xtype: 'panel',
            border: false,
            flex: 1,
            layout: 'fit',
            items: [
                //this.Grid
            ]
        }],
        buttons: [{
            xtype: 'button',
            text: 'Зберегти',
            listeners: {
                'click': function () {
                }
            }
        }, {
            xtype: 'button',
            text: 'Закрити',
            scope: this,
            listeners: {
                'click': function () {
                    var wnd = Ext.getCmp('win_customers');
                    wnd.hide();
                }
            }
        }]
    }),

    this.Show = function (record) {
        this.win.show();
    }
};

var winCustomers = new winCustomers();