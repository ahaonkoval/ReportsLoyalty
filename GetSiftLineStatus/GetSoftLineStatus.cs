using LoyaltyDB;
using ServiceDebuggerHelper;
using System;
using System.Configuration;
using System.ServiceProcess;

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
                long campaignId = data.Campaigns.GetCampaignsGettingStatusMailing();
            }
        }

        protected override void OnStop()
        {
            this.timer.Stop();
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
