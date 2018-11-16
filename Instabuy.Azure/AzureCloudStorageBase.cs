using Microsoft.WindowsAzure.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Azure
{
    internal class AzureCloudStorageBase
    {
        public readonly CloudStorageAccount CloudStorageAccount;

        public AzureCloudStorageBase(CloudStorageContext cloudStorageContext)
        {
            CloudStorageAccount = cloudStorageContext.StorageAccount;
        }
    }
}
