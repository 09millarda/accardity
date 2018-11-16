using Microsoft.WindowsAzure.Storage;
using System;

namespace Instabuy.Azure
{
    public class CloudStorageContext
    {
        public readonly CloudStorageAccount StorageAccount;

        public CloudStorageContext(string connectionString)
        {
            StorageAccount = CloudStorageAccount.Parse(connectionString);
        }
    }
}
