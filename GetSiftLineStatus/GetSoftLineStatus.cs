using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using ServiceDebuggerHelper;
using System.Configuration;
using LoyaltyDB;

namespace GetSiftLineStatus
{
    public partial class GetSoftLineStatus : ServiceBase, IDebuggableService
    {
        System.Timers.Timer timer;

        public GetSoftLineStatus()
        {
            InitializeComponent();

            timer = new System.Timers.Timer
            {
                Interval = Convert.ToInt32(ConfigurationManager.AppSettings["ServiceRunIntervalInSeconds"])
            };

            timer.Elapsed += TimerEpicentrK_Elapsed;
        }

        protected override void OnStart(string[] args)
        {
            this.timer.Start();

            //if (Convert.ToBoolean(ConfigurationManager.AppSettings["IsEpicentrKStart"]))
            //{
            //    var TimerEpicentrK = new System.Timers.Timer
            //    {
            //        Interval = Convert.ToInt32(ConfigurationManager.AppSettings["ServiceRunIntervalInSeconds"])
            //    };
            //    TimerEpicentrK.Elapsed += TimerEpicentrK_Elapsed;
            //    TimerEpicentrK.Start();
            //}
        }

        private void TimerEpicentrK_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            using (GetData data = new GetData())
            {
                var campaigns = data.Campaigns.GetCampaignsGetStatusMailing();
                if (campaigns.Where(w => w.IsStartGetStatus == 1).Count() > 0)
                {

                }
            }
        }

        protected override void OnStop()
        {
        }

        public void Start(string[] args)
        {
            OnStart(args);
        }

        public void StopService()
        {
            OnStop();
        }

        public void Pause()
        {
            OnPause();
        }

        public void Continue()
        {
            OnContinue();
        }

    }
}
