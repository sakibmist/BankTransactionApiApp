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

        [HttpGet("account/id/{accountId}")]
        public IActionResult GetAllData(long accountId)
        {
            try
            {
                var listofTrn = _dataContext.Transactions.Where(x => x.AccountId == accountId).ToList();
                return Ok(listofTrn); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); //400
            }
        }

        [HttpGet("account/number/{accountNo}")]
        public IActionResult GetAllData(string accountNo)
        {
            try
            {
                var listofData = _dataContext.Transactions
                    .Where(x => x.Account.AccountNo.ToLower() == accountNo.ToLower())
                    .Select(s => new TransactionReturnDto
                    {
                        AccountNo = s.Account.AccountNo,
                        Amount = s.Amount,
                        CurrentBalance = s.CurrentBalance,
                        TransactionMode = s.TransactionMode,
                        Id = s.Id,
                        TxnDateTime = s.TxnDateTime
                    }).ToList();
                return Ok(listofData); //200
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