
var login = function () {
    var user = Ext.getCmp('txtusername').getValue();
    var pass = Ext.getCmp('txtpassword').getValue();
    $.ajax({
        url: 'api/login/auth/1',
        type: 'get',
        //dataType :'text',
        data: {
            username: user,
            password: pass
        },
        success: function (a) {
            if (a == 'true') {
                window.location.href = "reportmap.aspx";
            } else {
                window.location.href = "login.aspx"
            }
        }
    });
};

var getDisabledDatesById = function (id, datefield) {
    var disabledDates = [];
    $.ajax({
        url: 'api/dict/GetDisabledDates/' + id,
        type: 'get',
        success: function (dates) {
            $.each(dates, function (key, item) {
                disabledDates.push(item);
            });

            datefield.setDisabledDates(disabledDates);
        }
    });
};

var getCampaignsDatesById = function (id, ctrl) {
    var disabledDates = [];
    $.ajax({
        url: 'api/dict/GetDisabledDates/' + id,
        type: 'get',
        success: function (dates) {
            $.each(dates, function (key, item) {
                disabledDates.push(item);
            });
        }
    });
};
