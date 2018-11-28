using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectApi.Models
{
    public class Transaction
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string TransactionMode { get; set; }

        [Required]
        public decimal CurrentBalance { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime TxnDateTime { get; set; } = DateTime.Now;

        [Required]
        public long AccountId { get; set; }

        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
    }
}