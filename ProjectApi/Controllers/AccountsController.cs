using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectApi.Models;

namespace ProjectApi.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public AccountsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            try
            {
                var accounts = _dataContext.Accounts.ToList();
                return Ok(accounts); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); //400
            }
        }

        [HttpGet("{id}", Name = "GetData")]
        public IActionResult GetDataById(int id)
        {
            try
            {
                var data = _dataContext.Accounts.FirstOrDefault(x => x.Id == id);
                return Ok(data); //200
            }
            catch (System.Exception)
            {

                return BadRequest(); //400
            }
        }

        [HttpGet("check/{accountNo}")]
        public IActionResult CheckIsAccountNoExists(string accountNo)
        {
            try
            {
                var isExist = _dataContext.Accounts.Any(x => x.AccountNo.ToLower() == accountNo.ToLower());
                return Ok(new { IsExist = isExist }); //200 core er property kore neoya hoyese.
            }
            catch (System.Exception)
            {

                return BadRequest(); //400
            }
        }

        [HttpGet("check/balance/{accountId}/{amount}")]
        public IActionResult CheckAmount(long accountId, decimal amount)
        {
            try
            {
                var isInsufficient = true;
                var account = _dataContext.Accounts.Find(accountId);
                if (account == null) return NotFound("Account is not found");
                if (account.Balance < amount) isInsufficient = true;
                else isInsufficient = false;

                return Ok(new { IsInsufficient = isInsufficient });
                // var isInsufficient = _dataContext.Accounts.Any(x=> x.Id == accountId && x.Balance < amount);
            }
            catch (System.Exception)
            {
                return BadRequest(); //400
            }
        }

        [HttpPost]
        public IActionResult AddData(Account account)
        {
            using(var transaction = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (account == null) return NotFound(); //404
                    _dataContext.Accounts.Add(account);
                    _dataContext.SaveChanges();

                    var depositTxn = new Transaction
                    {
                        AccountId = account.Id,
                        Amount = account.Balance,
                        CurrentBalance = account.Balance,
                        TransactionMode = "dr",
                        TxnDateTime = DateTime.Now
                    };
                    _dataContext.Transactions.Add(depositTxn);
                    _dataContext.SaveChanges();
                    
                    transaction.Commit();

                    return CreatedAtRoute("GetData", new { id = account.Id }, account); //201
                }
                catch (System.Exception)
                {
                    transaction.Rollback();
                    return BadRequest();
                }
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var data = _dataContext.Accounts.FirstOrDefault(x => x.Id == id);
                if (data == null) return null;
                _dataContext.Accounts.Remove(data);
                _dataContext.SaveChanges();
                return Ok(); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); // 400
            }
        }

    }
}