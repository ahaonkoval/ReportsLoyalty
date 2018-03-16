using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LoyaltyDB;
using LoyaltyDB.Models;

namespace DataTransformer
{
    public class TransformerMovement
    {
        TransformerData Td;

        public delegate void CreatePack(PackDocs e);
        public event CreatePack onCreatePack;

        public delegate void CreateDoc(TDoc e);
        public event CreateDoc onCreateDoc;

        public TransformerMovement() {
            Td = new TransformerData();
            Td.onCreateDoc += Td_onCreateDoc;
            Td.onCreatePack += Td_onCreatePack;
        }

        private void Td_onCreatePack(PackDocs e)
        {
            onCreatePack(e);
        }

        private void Td_onCreateDoc(TDoc e)
        {
            onCreateDoc(e);
        }

        public void Step()
        {
            Td.TransformMovementStep();
        }
    }
}
