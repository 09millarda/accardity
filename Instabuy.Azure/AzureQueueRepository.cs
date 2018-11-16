using Instabuy.Data;
using Microsoft.WindowsAzure.Storage.Queue;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Azure
{
    internal class AzureQueueRepository : AzureCloudStorageBase, IAzureQueueRepository
    {
        private readonly CloudQueueClient _queueClient;

        public AzureQueueRepository(CloudStorageContext cloudStorageContext) : base(cloudStorageContext)
        {
            _queueClient = CloudStorageAccount.CreateCloudQueueClient();
        }

        public async Task Add(string queueName, string message, bool createQueueIfNotExists = false)
        {
            if (createQueueIfNotExists)
            {
                await CreateQueue(queueName).ConfigureAwait(false);
            }

            try
            {
                var queue = _queueClient.GetQueueReference(queueName);
                var queueMessage = new CloudQueueMessage(message);
                await queue.AddMessageAsync(queueMessage).ConfigureAwait(false);
            } catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task CreateQueue(string queueName)
        {
            var queue = _queueClient.GetQueueReference(queueName);
            await queue.CreateIfNotExistsAsync().ConfigureAwait(false);
        }
    }
}
