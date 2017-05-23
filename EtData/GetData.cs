using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Win32.SafeHandles;

namespace EtData
{
    public class GetData: IDisposable
    {
        bool disposed = false;
        SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);

        private LoyaltyEntities Le;

        public Campaigns Campaigns;

        public Dict Dict;

        public Customers Customers;

        public GetData()
        {
            Le = new EtData.LoyaltyEntities();
            Campaigns = new EtData.Campaigns(Le);
            Dict = new EtData.Dict(Le);
            Customers = new EtData.Customers(Le);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            //
            disposed = true;
        }
    }
}
