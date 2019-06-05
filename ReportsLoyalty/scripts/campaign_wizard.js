
var getWinCmpSettWizard = function (campaign_id, Controls) {
    var controls = Controls;
    /* 
        перелік ИД обраних груп третього рівня                                             
    */
    var selectedIdsGroup3 = '';
    /* 
        перелік ИД обраних департаментів                                             
    */
    var selectedIds = '';
    /* 
        калькулятор сторінок             
    */
    var active = 0;
    /* 
        ИД обраного Відділу                                                          
    */
    var section_id = 0;
    /* 
        Назва обраного відділу                                                       
    */
    var SectionName = '';
    /* 
        Збираємо список обраних ИД відділів
    */
    function setSelectedIds(data) {

        var itemsProcessed = 0;
        function pcItemEnd(selectedIds) {
        }
        function pcItem(item, index, array) {
            if (selectedIds.length == 0) {
                selectedIds = item.data.fgroup_id;
            } else {
                selectedIds = selectedIds + ',' + item.data.fgroup_id;
            }
            itemsProcessed++;
            if (itemsProcessed === array.length) {
                pcItemEnd(selectedIds);
            }
            //console.log(selectedIds);
        }
        data.items.forEach(pcItem);
    };
    /*

    */
    function setSelectedIdsGroupLavel3(data) {
        var itemsProcessed = 0;
        function pcItemEnd(selectedIdsGroup3) {
            //alert(selectedIdsGroup3);          
        }
        function pcItem(item, index, array) {
            if (selectedIdsGroup3.length == 0) {
                selectedIdsGroup3 = item.data.lf3_id;
            } else {
                selectedIdsGroup3 = selectedIdsGroup3 + ',' + item.data.lf3_id;
            }
            itemsProcessed++;
            if (itemsProcessed === array.length) {
                pcItemEnd(selectedIdsGroup3);
            }
            //console.log(selectedIds);
        }
        data.items.forEach(pcItem);
    };
    /*
        Департаменти обраного відділу
    */
    var dataviewDepartments = Ext.create({
        xtype: 'dataview',
        fullscreen: true,
        singleSelect: true,
        store: {
            fields: ['name', 'fgroup_id'],
        },
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-cell">{name}</div>',
            '</tpl>'
        ],
        itemSelector: 'div',
        overItemCls: 'x-item-over',
        autoScroll: true,
        trackOver: true,
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /*  */
                    var selected = dataviewDepartments.getSelection();
                    if (selected.length > 0) {
                        var record = selected[0];
                        var store = dataviewDepartments.getStore();                        
                        var data = record.data;
                        var storeSelected = dataviewDepartmentsSelected.getStore();
                        storeSelected.add(
                            {
                                name: data.name,
                                fgroup_id: data.fgroup_id
                            });

                        store.remove(record);
                        dataviewDepartmentsSelected.setStore(storeSelected);
                        selectedIds = '';
                        var dataSelected = storeSelected.getData();
                        setSelectedIds(dataSelected);

                    }
                }
            },
        }
    });
    /*
        Список обраних департаментів
    */
    var dataviewDepartmentsSelected = Ext.create({
        xtype: 'dataview',
        fullscreen: true,
        singleSelect: true,
        store: {
            fields: [
                { name: 'name', type: 'string' },
                { name: 'fgroup_id', type: 'string' }],
        },
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-cell">{name}</div>',
            '</tpl>'
        ],
        itemSelector: 'div',
        overItemCls: 'x-item-over',
        autoScroll: true,
        trackOver: true,
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /*  */
                    var selected = dataviewDepartmentsSelected.getSelection();
                    if (selected.length > 0) {

                        var record = selected[0];
                        var store = dataviewDepartmentsSelected.getStore();
                        var data = record.data;
                        var storeSource = dataviewDepartments.getStore();

                        storeSource.add(
                            {
                                name: data.name,
                                fgroup_id: data.fgroup_id
                            });
                        store.remove(record);
                        selectedIds = '';
                        dataviewDepartments.setStore(storeSource);
                        /* Заповнюються список вибраних ИД */
                        selectedIds = '';
                        var dataSelected = store.getData();
                        setSelectedIds(dataSelected);
                    }
                }
            },
        }
    });
    /*

    */
    var dataviewGroupsLavel3 = Ext.create({
        xtype: 'dataview',
        fullscreen: true,
        singleSelect: true,
        store: {
            fields: [
                'name_3',
                'lf3_id',
                'lf2_id',
                'lf1_id',
                'name_1',
                'name_full'
            ],
        },
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-cell">{name_full}</div>',
            '</tpl>'
        ],
        itemSelector: 'div',
        overItemCls: 'x-item-over',
        autoScroll: true,
        trackOver: true,
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /*  */
                    var selected = dataviewGroupsLavel3.getSelection();
                    if (selected.length > 0) {

                        var record = selected[0];
                        
                        var data = record.data;

                        var storeSelected = dataviewGroupsLavel3Selected.getStore();

                        storeSelected.add(
                            {
                                name_3: data.name_3,
                                lf3_id: data.lf3_id,
                                lf2_id: data.lf2_id,
                                lf1_id: data.lf1_id,
                                name_1: data.name_1,
                                name_full: data.name_full
                            });
                        var store = dataviewGroupsLavel3.getStore();     
                        store.remove(record);

                        dataviewGroupsLavel3Selected.setStore(storeSelected);
                        selectedIdsGroup3 = '';
                        var dataSelected = storeSelected.getData();
                        setSelectedIdsGroupLavel3(dataSelected);

                    }
                }
            },
        }
    });
    /*     

    */
    var dataviewGroupsLavel3Selected = Ext.create({
        xtype: 'dataview',
        fullscreen: true,
        singleSelect: true,
        store: {
            fields: [
                'name_3',
                'lf3_id',
                'lf2_id',
                'lf1_id',
                'name_1',
                'name_full'
            ],
        },
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-cell">{name_full}</div>',
            '</tpl>'
        ],
        itemSelector: 'div',
        overItemCls: 'x-item-over',
        autoScroll: true,
        trackOver: true,
        listeners: {
            selectionchange: function (record, item, index, e) {

            },
            dblclick:
            {
                element: 'el',
                fn: function (event, b, c) {
                    /*  */
                    var selected = dataviewGroupsLavel3Selected.getSelection();
                    if (selected.length > 0) {

                        var record = selected[0];
                        var store = dataviewGroupsLavel3Selected.getStore();
                        var data = record.data;
                        var storeSource = dataviewGroupsLavel3.getStore();

                        storeSource.add(
                            {
                                name_3: data.name_3,
                                lf3_id: data.lf3_id,
                                lf2_id: data.lf2_id,
                                lf1_id: data.lf1_id,
                                name_1: data.name_1,
                                name_full: data.name_full
                            });
                        store.remove(record);
                        selectedIds = '';
                        dataviewGroupsLavel3.setStore(storeSource);

                        selectedIdsGroup3 = '';
                        var dataSelected = store.getData();
                        setSelectedIdsGroupLavel3(dataSelected);
                    }
                }
            },
        }
    });
    /*
        Сторінка (Панель) для обрання відділу
    */
    var Section = Ext.create('Ext.panel.Panel', {
        title: 'Оберіть відділ',
        border: false,
        layout: 'center',
        items: [
            {
                xtype: 'panel',
                width: 300,
                layout: 'fit',
                items: [
                    {
                        xtype: 'combobox',
                        store: dict.getCmpGrpByLevel(0),
                        forceSelection: true,
                        allowBlank: false,
                        displayField: 'name',
                        valueField: 'fgroup_id',
                        editable: false,
                        listeners: {
                            change: function (ctrl, newValue, oldValue, eOpts) {
                                section_id = newValue;

                                var data = ctrl.selection.getData()

                                Section.setTitle('Обрано відділ: ' + data.name);
                                SectionName = data.name;
                            }
                        }
                    }
                ]
            },
        ]
    });

    /* ------------------------------------------------------------------------------------ */
    this.btnSelectAll = Ext.create('Ext.Button', {
        text: 'ВСІ',
        tooltip: '',
        scope: this,
        handler: function (event, toolEl, panel) {

            var data = dataviewDepartments.dataSource.getData();
            var itemsProcessed = 0;
            data.items.forEach(pcItem);
            /* Закінчуємо цикл  */
            function pcItemEnd(selectedIds, storeSource) {

                dataviewDepartmentsSelected.setStore(storeSource);

                var store = dataviewDepartments.getStore();
                store.removeAll();

                /* Заповнюються список вибраних ИД */
                selectedIds = '';
                var data = storeSource.getData();
                setSelectedIds(data);
            }
            /* ---------------- */
            function pcItem(item, index, array) {

                var storeSource = dataviewDepartmentsSelected.getStore();                

                storeSource.add(
                {
                    name: item.data.name,
                    fgroup_id: item.data.fgroup_id
                });
                

                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    pcItemEnd(selectedIds, storeSource);
                }                
            }         
        }
    });
    /* ------------------------------------------------------------------------------------ */
    this.btnDeSelect = Ext.create('Ext.Button', {
        text: 'ПРИБРАТИ',
        tooltip: '',
        scope: this,
        handler: function (event, toolEl, panel) {
            var data = dataviewDepartmentsSelected.dataSource.getData();
            var itemsProcessed = 0;
            data.items.forEach(pcItem);

            function pcItemEnd(selectedIds, storeSource) {
                dataviewDepartments.setStore(storeSource);
                var store = dataviewDepartmentsSelected.getStore();
                store.removeAll();
                selectedIds = '';
            }
            /* Проходим цикл --------------------------- */
            function pcItem(item, index, array) {
                var storeSource = dataviewDepartments.getStore();
                storeSource.add(
                {
                    name: item.data.name,
                    fgroup_id: item.data.fgroup_id
                });


                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    pcItemEnd(selectedIds, storeSource);
                }
            }

            // var data = dataviewDepartments.getStore();
            //var store = dataviewDepartmentsSelected.getStore();
            //store.removeAll();
            //selectedIds = '';

        }
    });
    /*
        Сторінка вибору департаменту
    */
    var Department = Ext.create('Ext.panel.Panel', {
        title: 'Оберіть департаменти',
        border: false,
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [
            {
                width: '50%',
                layout: 'fit',
                title: 'Перелік департаментыв на вибір',
                items: [dataviewDepartments],
                tools: [
                    this.btnSelectAll
                ]
            },
            {

                width: '50%',
                layout: 'fit',
                title: 'Обрані департаменти на перерахунок',
                items: [
                    dataviewDepartmentsSelected
                ],
                tools: [
                    this.btnDeSelect
                ]
            },
        ]
    });

    /* 
        Вибрати всі групи третього рівня 
    */
    this.btnSelectAllGrouз3Label = Ext.create('Ext.Button', {
        text: 'ВСІ Групи',
        tooltip: '',
        scope: this,
        handler: function (event, toolEl, panel) {

            var data = dataviewGroupsLavel3.dataSource.getData();
            var itemsProcessed = 0;
            data.items.forEach(pcItem);
            /* Закінчуємо цикл  */
            function pcItemEnd(selectedIds, storeSource) {

                dataviewGroupsLavel3Selected.setStore(storeSource);

                var store = dataviewGroupsLavel3.getStore();
                store.removeAll();

                /* Заповнюються список вибраних ИД */
                selectedIdsGroup3 = '';
                var data = storeSource.getData();
                setSelectedIdsGroupLavel3(data);;
            }
            /* ---------------- */
            function pcItem(item, index, array) {

                var storeSource = dataviewGroupsLavel3Selected.getStore();

                storeSource.add(
                {
                    name_3: item.data.name_3,
                    lf3_id: item.data.lf3_id,
                    lf2_id: item.data.lf2_id,
                    lf1_id: item.data.lf1_id,
                    name_1: item.data.name_1,
                    name_full: item.data.name_full

                    //name: item.data.name,
                    //fgroup_id: item.data.fgroup_id
                });


                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    pcItemEnd(selectedIds, storeSource);
                }
            }
        }
    });
    /* ------------------------------------------------------------------------------------ */
    this.btnDeSelectGrouз3Label = Ext.create('Ext.Button', {
        text: 'ПРИБРАТИ',
        tooltip: '',
        scope: this,
        handler: function (event, toolEl, panel) {
            var data = dataviewGroupsLavel3Selected.dataSource.getData();
            var itemsProcessed = 0;
            data.items.forEach(pcItem);

            function pcItemEnd(selectedIds, storeSource) {
                dataviewGroupsLavel3.setStore(storeSource);
                var store = dataviewGroupsLavel3Selected.getStore();
                store.removeAll();
                selectedIdsGroup3 = '';
            }
            /* Проходим цикл --------------------------- */
            function pcItem(item, index, array) {
                var storeSource = dataviewGroupsLavel3.getStore();
                storeSource.add(
                {
                    name_3: item.data.name_3,
                    lf3_id: item.data.lf3_id,
                    lf2_id: item.data.lf2_id,
                    lf1_id: item.data.lf1_id,
                    name_1: item.data.name_1,
                    name_full: item.data.name_full
                });


                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    pcItemEnd(selectedIds, storeSource);
                }
            }

            // var data = dataviewDepartments.getStore();
            //var store = dataviewDepartmentsSelected.getStore();
            //store.removeAll();
            //selectedIds = '';

        }
    });


    var GroupLavel3 = Ext.create('Ext.panel.Panel', {
        title: 'Оберіть департаменти',
        border: false,
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [
            {
                width: '50%',
                layout: 'fit',
                title: 'Групи третього рівня, на вибір',
                items: [
                    dataviewGroupsLavel3
                ],
                tools: [
                    this.btnSelectAllGrouз3Label
                ]
            },
            {
                width: '50%',
                layout: 'fit',
                title: 'Обрані групи третього рівня',
                items: [
                    dataviewGroupsLavel3Selected
                ], tools: [
                    this.btnDeSelectGrouз3Label
                ]
            },
        ]
    });
    /*
        Контейнер сторінок майстра
    */
    var main = Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        width: 200,
        height: 200,
        layout: 'card',

        items: [
            /* ------------------------------------------------ */
            Section,
            /* ------------------------------------------------ */
            Department,
            /* ------------------------------------------------ */
            GroupLavel3
            /* ------------------------------------------------ */
        ]
    });

    this.win = Ext.create('Ext.Window', {
        title: 'Налаштування структури перерахунку для кампанії: ' + campaign_id,
        width: 800,
        height: 410,
        modal: true,
        closable: true,
        layout: 'fit',
        items: [{
            xtype: 'panel',
            layout: 'card',
            border: false,
            activeItem: 0, //--<---
            items: [
                main
            ],
            bbar: ['->', {
                //id: 'card-prev',
                text: '&laquo; Повернутись',
                handler: function () {
                    var layout = main.getLayout();
                    --active;
                    layout.setActiveItem(active);
                    active = main.items.indexOf(layout.getActiveItem());

                    if (active == 0) {
                        selectedIds = '';
                        var store = dataviewDepartmentsSelected.getStore();
                        store.loadData([],false);
                        dataviewDepartmentsSelected.setStore(store);
                    }
                    if (active == 1) {
                        selectedIdsGroup3 = '';
                        var store = dataviewGroupsLavel3Selected.getStore();
                        store.loadData([],false);
                        dataviewGroupsLavel3Selected.setStore(store);
                    }
                }
            }, {
                //id: 'card-next',
                text: 'Далі &raquo;',
                scope: this,
                handler: function () {

                    if (active == 2) {
                        if (selectedIdsGroup3 == '') {
                            Ext.Msg.alert('Увага', 'Не вказано жодної групи третього рівня!',
                                function () {
                                    win.hide();
                                });                            
                            return;
                        } else {                            
                            Ext.Ajax.request({
                                url: 'api/Campaign/SetCampainStructureData/' + campaign_id,
                                method: 'POST',
                                params: { 
                                    SectionId: section_id
                                    //DepartmentIds: selectedIds,
                                    //GroupLavel3Ids: selectedIdsGroup3
                                },
                                jsonData: { DepartmentIds: selectedIds, GroupLavel3Ids: selectedIdsGroup3 },
                                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                success: function (respons) {

                                    Ext.Msg.alert('Увага', 'Налаштування збережено!',
                                    function () {
                                        controls.Fill(campaign_id);
                                        win.hide();
                                    });

                                },
                                failure: function (error) {
                                    Ext.Msg.alert('Увага', 'Налаштування не збережено! Виникла помилка: '+ error,
                                    function () {

                                        win.hide();
                                    });  
                                }
                            });                      
                            return;
                        }                            
                    }
                    var layout = main.getLayout();
                    ++active;
                    layout.setActiveItem(active);
                    //active = main.items.indexOf(layout.getActiveItem());

                    if (active == 1) {
                        Department.setTitle('Відділ: ' + SectionName);

                        var store = dict.getDepartmentsListByOtdId(section_id);
                        dataviewDepartments.setStore(store);
                    }
                    if (active == 2) {
                        dataviewGroupsLavel3.setStore(dict.getGroupsForDepartsIds(selectedIds));
                    }
                }
            }],
        }]
    })

    return this.win;
}