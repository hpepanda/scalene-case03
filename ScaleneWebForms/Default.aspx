<%@ Page Title="Scalene - Expense Management" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ScaleneWebForms._Default" %>

<%@ Register TagPrefix="cc1" Namespace="SlimeeLibrary" Assembly="SlimeeLibrary" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="scalene-subtitle-container">
            <div class="content-wrapper">
                <h1 class="scalene-subtitle">Monthly expense summary</h1>
            </div>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <p class="regular-text">
        Select time period
    </p>
    <div>
        <table>
            <tr style="font-family: OpenSansLight;">
                <td class="date-table">From:</td>
                <td class="date-table" >
                    <cc1:DatePicker ID="DatePickerFrom" runat="server" AutoPostBack="true" OnSelectedDateChanged="DatePickerFrom_OnSelectedDateChanged"
                        Width="100px" PaneWidth="150px">
                        <PaneTableStyle BorderColor="#707070" BorderWidth="1px" BorderStyle="Solid" />
                        <PaneHeaderStyle BackColor="#8bc34a" />
                        <TitleStyle ForeColor="White" Font-Bold="true" />
                        <NextPrevMonthStyle ForeColor="White" Font-Bold="true" />
                        <NextPrevYearStyle ForeColor="#E0E0E0" Font-Bold="true" />
                        <DayHeaderStyle BackColor="#E8E8E8" />
                        <TodayStyle BackColor="#FFFFCC" ForeColor="#000000"
                            Font-Underline="false" BorderColor="#FFCC99" />
                        <AlternateMonthStyle BackColor="#F0F0F0"
                            ForeColor="#707070" Font-Underline="false" />
                        <MonthStyle BackColor="" ForeColor="#000000" Font-Underline="false" />
                    </cc1:DatePicker>
                </td>
                
                <td class="date-table" style="padding-left: 20px">To:</td>
                <td class="date-table">
                    <cc1:DatePicker ID="DatePickerTo" runat="server" AutoPostBack="true"
                        Width="100px" PaneWidth="150px">
                        <PaneTableStyle BorderColor="#707070" BorderWidth="1px" BorderStyle="Solid" />
                        <PaneHeaderStyle BackColor="#8bc34a" />
                        <TitleStyle ForeColor="White" Font-Bold="true" />
                        <NextPrevMonthStyle ForeColor="White" Font-Bold="true" />
                        <NextPrevYearStyle ForeColor="#E0E0E0" Font-Bold="true" />
                        <DayHeaderStyle BackColor="#E8E8E8" />
                        <TodayStyle BackColor="#FFFFCC" ForeColor="#000000"
                            Font-Underline="false" BorderColor="#FFCC99" />
                        <AlternateMonthStyle BackColor="#F0F0F0"
                            ForeColor="#707070" Font-Underline="false" />
                        <MonthStyle BackColor="" ForeColor="#000000" Font-Underline="false" />
                    </cc1:DatePicker>
                </td>
            </tr>
        </table>
    </div>

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <asp:Timer ID="timerForRepeater" runat="server" OnTick="timerForRepeater_Tick" Interval="1000" Enabled="true"></asp:Timer>

            <div class="stat-repeater">
                <asp:Repeater ID="repStatistics" runat="server">
                    <ItemTemplate>
                        <table class="stat-table">
                            <tr>
                                <td <%# Container.ItemIndex == ((IList)((Repeater)Container.Parent).DataSource).Count-1 ? " class='stat-td-last'" : "class='stat-td'"%>><%# Eval("Key") %>:</td>
                                <td <%# Container.ItemIndex == ((IList)((Repeater)Container.Parent).DataSource).Count-1 ? " class='stat-td-last'" : "class='stat-td'"%>><%# Eval("Value") %></td>
                            </tr>
                        </table>
                    </ItemTemplate>
                </asp:Repeater>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
