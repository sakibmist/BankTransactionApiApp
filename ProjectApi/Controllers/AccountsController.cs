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

        // [HttpGet("check/{accountNo}")]
        // public IActionResult CheckIsAccountNoExists(string accountNo)
        // {
        //     try
        //     {
        //         var isExist = _dataContext.Accounts.Any(x => x.AccountNo.ToLower() == accountNo.ToLower());
        //         return Ok(new { IsExist = isExist }); //200
        //     }
        //     catch (System.Exception)
        //     {

        //         return BadRequest(); //400
        //     }
        // }

        [HttpPost]
        public IActionResult AddData(Account account)
        {
            try
            {
                if (account == null) return NotFound(); //404
                _dataContext.Accounts.Add(account);
                _dataContext.SaveChanges();
                return CreatedAtRoute("GetData", new { id = account.Id }, account); //201
            }
            catch (System.Exception)
            {
                return BadRequest();
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