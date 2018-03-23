﻿using ServiceDebuggerHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DataTransformer
{
    static class Program
    {
        public static ServiceRunner Debugger;

        /// <summary>
        /// Главная точка входа для приложения.
        /// </summary>
        /// 
        static void Main()
        {
#if DEBUG
            Debugger = new ServiceRunner(new Agregator());
            Application.Run(Debugger);
            //Application.Run(new ServiceRunner(new Agregator()));
#else
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[]
            {
                new Agregator()
            };
            ServiceBase.Run(ServicesToRun);
#endif
            //ServiceBase[] ServicesToRun;
            //ServicesToRun = new ServiceBase[]
            //{
            //    new Agregator()
            //};
            //ServiceBase.Run(ServicesToRun);
        }
    }
}