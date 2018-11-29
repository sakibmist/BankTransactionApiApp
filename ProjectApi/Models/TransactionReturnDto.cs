using System;

namespace ProjectApi.Models
{
    public class TransactionReturnDto
    {
        public long Id { get; set; }
        public string TransactionMode { get; set; }
        public decimal CurrentBalance { get; set; }
        public decimal Amount { get; set; }
        public DateTime TxnDateTime { get; set; }
        public string AccountNo { get; set; }
    }
}