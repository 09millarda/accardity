using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IAzureQueueRepository
    {
        Task Add(string queueName, string message, bool createQueueIfNotExists = false);
        Task CreateQueue(string queueName);
    }
}
