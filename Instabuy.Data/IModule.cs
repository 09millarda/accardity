using Microsoft.Extensions.DependencyInjection;

namespace Instabuy.Data
{
    public interface IModule
    {
        void Load(IServiceCollection services);
    }
}