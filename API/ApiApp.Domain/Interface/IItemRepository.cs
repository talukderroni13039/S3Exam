using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIApp.Domain
{
   public interface IItemRepository
   {
        Task<EmissionItem> CreateItem(EmissionItem emissionItem);
        EmissionItem GetItemById(int Id);
        IQueryable<object> GetUnit();
        IQueryable<object> GetItemList();
    }
}
