<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="daily_personal_offers.aspx.cs" 
    Inherits="ReportsLoyalty.pages.personal_offers.personal_offers" %>
<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server" >
        <div style="margin:0; padding:0;">  <%--height:10000px; Width:100%"--%>
            <div style="margin:0; padding:0;">  <%--height:10000px;--%>
                <rsweb:ReportViewer ID="ReportViewerPersonalOffers" runat="server" AsyncRendering="False" Width="100%" Height="1500">
                    <%--AsyncRendering="False" Width="100%" Height="100%" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt"--%>
                    
                    <LocalReport ReportPath="reports\personal_offers\rep_daily_personal_offers_all_v2.rdlc" EnableHyperlinks="True">
                        <DataSources>
                            <rsweb:ReportDataSource DataSourceId="sds_expected_effect" Name="ds_pers_expected_effect" />
                            <rsweb:ReportDataSource DataSourceId="sds_market_details" Name="ds_market_details" />
                        </DataSources>
                    </LocalReport>
                </rsweb:ReportViewer>
            </div>
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

        <asp:SqlDataSource ID="sds_expected_effect" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>" 
            SelectCommandType="Text">
            <SelectParameters>
                <asp:Parameter DefaultValue="" Direction="ReturnValue" Name="RETURN_VALUE" Type="Int32" />
                <asp:Parameter Name="campaign_id" Type="Int32" />
                <asp:Parameter Name="control_group" Type="Boolean" />
                <asp:Parameter DbType="Date" Name="date" />
                <asp:Parameter Name="market_id" Type="Int32" />
                <asp:Parameter Name="market_lst" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="sds_market_details" runat="server" ConnectionString="<%$ ConnectionStrings:crm_wizard_connect_string %>"
            SelectCommand="
                    SELECT 
                        market_id, Prms, [10] as a10, [20] as a20, [30] as a30, [40] as a40, [50] as a50, 
                        [60] as a60, [70] as a70, [80] as a80, [90] as a90, [100] as a100, [210] as a210, [310] as a310, [800] as a800, [0] as a0 
                    FROM rep.t_get_personal_markmo_market_details_pivot(@campaign_id, @control_group, @date)" 
            SelectCommandType="Text">
            <SelectParameters>
                <asp:Parameter DefaultValue="" Direction="ReturnValue" Name="RETURN_VALUE" Type="Int32" />
                <asp:Parameter Name="campaign_id" Type="Int32" />
                <asp:Parameter Name="control_group" Type="Boolean" />
                <asp:Parameter DbType="Date" Name="date" />
            </SelectParameters>
        </asp:SqlDataSource>        

    </form>
</body>
</html>
