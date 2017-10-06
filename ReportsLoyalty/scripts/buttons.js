
var btnLogOut = Ext.create('Ext.Button',
   {
       text: 'Вхід',
       //formBind: true,
       listeners: {
           click: function () {
               login();
           }
       }
   });

