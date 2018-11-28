using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectApi.Models;

namespace ProjectApi.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public TransactionsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            try
            {
                var transactionsData = _dataContext.Transactions.ToList();
                return Ok(transactionsData); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); //400
            }
        }

        [HttpPost]
        public IActionResult AddTransaction(TransactionDto transactionDto)
        {
            using(var transaction = _dataContext.Database.BeginTransaction()) // 
            {
                try
                {
                    var account = _dataContext.Accounts.FirstOrDefault(x => x.Id == transactionDto.AccountId);
                    if (account == null) return BadRequest("Account number is invalid");
                    switch (transactionDto.TransactionMode.ToLower())
                    {
                        case "dr":
                            if (transactionDto.Amount <= 0) return BadRequest("Invalid amount");
                            if (account.Balance < transactionDto.Amount) return BadRequest("Insufficient Balance");
                            account.Balance -= transactionDto.Amount;
                            break;
                        case "cr":
                            if (transactionDto.Amount <= 0) return BadRequest("Invalid amount");
                            account.Balance += transactionDto.Amount;
                            break;
                    }
                    _dataContext.Accounts.Update(account);
                    _dataContext.SaveChanges();

                    var txn = new Transaction
                    {
                        AccountId = transactionDto.AccountId,
                        Amount = transactionDto.Amount,
                        CurrentBalance = account.Balance,
                        TransactionMode = transactionDto.TransactionMode
                    };
                    _dataContext.Transactions.Add(txn);
                    _dataContext.SaveChanges();

                    transaction.Commit();
                    return Ok();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(ex.Message);                    
                }
            }
        }
    }
}