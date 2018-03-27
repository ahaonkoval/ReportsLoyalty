using ServiceDebuggerHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GetSiftLineStatus
{
    static class Program
    {
        /// <summary>
        /// Главная точка входа для приложения.
        /// </summary>
        static void Main()
        {
#if DEBUG
            Application.Run(new ServiceRunner(new GetSoftLineStatus()));
#else
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[]
            {
                new GetSoftLineStatus()
            };
            ServiceBase.Run(ServicesToRun);
#endif

            //ServiceBase[] ServicesToRun;
            //ServicesToRun = new ServiceBase[]
            //{
            //    new GetSoftLineStatus()
            //};
            //ServiceBase.Run(ServicesToRun);
        }
    }
}
