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
using System.Threading;

namespace DataTransformer
{
    public partial class Agregator : ServiceBase, IDebuggableService
    {
        TransformerMovement Tm;

        int marker;

        public Agregator()
        {
            InitializeComponent();
            Tm = new DataTransformer.TransformerMovement();
            Tm.onCreateDoc += Tm_onCreateDoc;
            Tm.onCreatePack += Tm_onCreatePack;
        }

        private void Tm_onCreatePack(string e)
        {
            marker = 10000;
            Program.Debugger.BeginInvoke(new Action(delegate () {
                Program.Debugger.SetLog(e);
            }));
        }

        private void Tm_onCreateDoc(string e)
        {
            Program.Debugger.BeginInvoke(new Action(delegate () {
                Program.Debugger.SetLog(e);
            }));
        }

        protected override void OnStart(string[] args)
        {
            this.marker = 0;
            var TimerEpicentrK = new System.Timers.Timer
            {
                //Interval = Convert.ToInt32(ConfigurationManager.AppSettings["ServiceRunIntervalInSeconds"])
                Interval = Convert.ToInt32(1000)
            };
            TimerEpicentrK.Elapsed += TimerEpicentrK_Elapsed;
            TimerEpicentrK.Start();         
        }

        private void TimerEpicentrK_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            if (this.marker == 0)
            {
                Tm.Step();
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
