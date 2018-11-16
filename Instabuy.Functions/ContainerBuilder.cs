using Instabuy.Data;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Functions
{
    internal class ContainerBuilder : IContainerBuilder
    {
        private readonly IServiceCollection _services;

        public ContainerBuilder()
        {
            _services = new ServiceCollection();
        }

        public IServiceProvider Build()
        {
            var provider = _services.BuildServiceProvider();

            return provider;
        }

        public IContainerBuilder RegisterModule<TModule>() where TModule : IModule, new()
        {
            var module = new TModule();

            module.Load(_services);

            return this;
        }
    }
}
