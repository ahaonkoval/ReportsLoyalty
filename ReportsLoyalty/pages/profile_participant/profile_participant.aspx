﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="profile_participant.aspx.cs" Inherits="ReportsLoyalty.pages.profile_participant.profile_participant" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="margin: 0; padding: 0; height: 100%">
            <div style="margin: 0; padding: 0; height: 100%">
                <rsweb:ReportViewer ID="ReportViewerExtraPoints" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False" SizeToReportContent="True">
                    <LocalReport ReportPath="reports\profile_participant\profile_participant.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_gender" Name="ds_gender" />
                            <rsweb:ReportDataSource DataSourceId="sds_age_particiapnt" Name="ds_age_participant" />
                            <rsweb:ReportDataSource DataSourceId="sds_kids_age" Name="ds_kids_age" />
                            <rsweb:ReportDataSource DataSourceId="sds_animals" Name="ds_animals" />
                            <rsweb:ReportDataSource DataSourceId="sds_hobby" Name="ds_hobby" />
                            <rsweb:ReportDataSource DataSourceId="sds_car" Name="ds_car" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_gender" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="SELECT * FROM rep.t_get_count_customers_by_gender_is_profile(@date_start, @date_end, @market_id) a
                                ORDER BY a.market_name, a.gender">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_age_particiapnt" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="SELECT * FROM rep.t_get_allocation_customers_for_age(@date_start, @date_end, @market_id) a
                            ORDER BY a.market_name, a.name">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_kids_age" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="SELECT * FROM rep.t_get_allocation_kids_for_age(@date_start, @date_end, @market_id) a
                            ORDER BY a.market_name, a.id">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_animals" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="select * from rep.t_get_allacation_customers_by_animals(@date_start, @date_end, @market_id) order by market_name">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_hobby" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="select * from rep.t_get_allocation_customers_by_hobby(@date_start, @date_end, @market_id) order by market_name">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_car" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="select * from rep.t_get_allocation_customers_by_have_car(@date_start, @date_end, @market_id) order by market_name">
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="sds_is_not_sms_sent" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="select * from rep.t_get_is_not_sms_sent(@date_start, @date_end, @market_id) order by market_name">
        </asp:SqlDataSource>

    </form>
</body>
</html>
