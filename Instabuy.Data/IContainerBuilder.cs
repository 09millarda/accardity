using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public interface IContainerBuilder
    {
        IContainerBuilder RegisterModule<TModule>() where TModule : IModule, new();
        IServiceProvider Build();
    }
}
