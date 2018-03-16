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
using LoyaltyDB.Models;

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

        private void Tm_onCreatePack(PackDocs pd)
        {
            marker = 1000;
            Program.Debugger.BeginInvoke(new Action(delegate () {
            Program.Debugger.SetLog(
                string.Format("На обробці {0} документів, завантажено {1}", pd.Count.ToString(), pd.Created.ToString("s") )
                    );
            }));
        }

        private void Tm_onCreateDoc(TDoc e)
        {
            Program.Debugger.BeginInvoke(new Action(delegate () {
                Program.Debugger.SetLog(
                    string.Format("Документ {0}({1}) завантажено {2}", e.Name, e.DocId.ToString(), e.Transformered.ToString("s"))
                    );
            }));
            marker--;
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
