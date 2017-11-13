<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="daily_personal_offers.aspx.cs" Inherits="ReportsLoyalty.pages.personal_offers.personal_offers" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">

        <div style="margin:0; padding:0; height:100%">
            <div style="margin:0; padding:0; height:100%">
                <rsweb:ReportViewer ID="ReportViewerPersonalOffers" runat="server"
                    Font-Names="Verdana"
                    Font-Size="8pt"
                    WaitMessageFont-Names="Verdana"
                    WaitMessageFont-Size="14pt"
                    Width="100%"                     
                    BorderWidth="0px"
                    ZoomMode="FullPage"
                    ShowPrintButton="False"
                    ShowRefreshButton="False" AsyncRendering="False"  SizeToReportContent="True">
                    <LocalReport ReportPath="reports\personal_offers\rep_daily_personal_offers.rdlc">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_expected_effect" Name="ds_pers_expected_effect" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_expected_effect" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommand="rep.p_get_daily_pers_expected_effect" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:Parameter DefaultValue="" Direction="ReturnValue" Name="RETURN_VALUE" Type="Int32" />
                <asp:Parameter Name="campaign_id" Type="Int32" />
                <asp:Parameter Name="control_group" Type="Boolean" />
                <asp:Parameter DbType="Date" Name="date" />
                <asp:Parameter Name="market_id" Type="Int32" />
                <asp:Parameter Name="market_lst" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="sds_days_allocated" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="">
        </asp:SqlDataSource>        
        <asp:SqlDataSource ID="sds_distance_allocated" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="">
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="sds_group_rating" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="">
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="market_rating" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="">
        </asp:SqlDataSource>

    </form>
</body>
</html>
