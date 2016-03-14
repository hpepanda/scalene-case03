using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ScaleneWebForms
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                this.DatePickerFrom.Culture = CultureInfo.GetCultureInfo("en-US");
                this.DatePickerFrom.SelectedDate = new DateTime(2016, 1, 1);

                this.DatePickerTo.Culture = CultureInfo.GetCultureInfo("en-US");
                this.DatePickerTo.SelectedDate = DateTime.Now;

                RefreshData();
            }
        }


        private void RefreshData()
        {
            try
            {
                var server = Environment.GetEnvironmentVariable("CaseServer");

                if (server == null)
                {
                    server = WebConfigurationManager.AppSettings["CaseServer"];
                }

                var serverEndpoint = string.Format("{0}?from={1}&to={2}", server, this.DatePickerFrom.SelectedDate.ToString("yyyy-MM-dd"), this.DatePickerTo.SelectedDate.ToString("yyyy-MM-dd"));
                WebRequest request = WebRequest.Create(serverEndpoint);
                request.ContentType = "application/json";
                var response = (HttpWebResponse)request.GetResponse();
                using (var responseStream = response.GetResponseStream())
                {
                    using (var reader = new StreamReader(responseStream))
                    {
                        JArray json = JArray.Parse(reader.ReadToEnd());
                        var responseList = json.ToObject<List<KeyValuePair<string, string>>>();
                        var lastItem = responseList.Last();
                        if (lastItem.Key == "Total amount")
                        {
                            responseList.Remove(lastItem);
                            var currency = "$ 0";
                            if (lastItem.Value != "0$" )
                            {
                                currency = "$ " + lastItem.Value.Split(' ')[0];
                            }

                            responseList.Add(new KeyValuePair<string, string>("Period totals", currency));
                        }


                        repStatistics.DataSource = responseList;
                        repStatistics.DataBind();
                    }
                }
            }
            catch (Exception)
            {
                Debug.WriteLine("Could not load data from remote source");
            }
        }



        protected void timerForRepeater_Tick(object sender, EventArgs e)
        {
            RefreshData();
        }

        protected void DatePickerFrom_OnSelectedDateChanged(object sender, EventArgs e)
        {
            RefreshData();
        }
    }
}