
import { RepositoryRegistry } from "./repository.registry";
import { UsecaseRegistry } from "./usecase.registry";


export class DependencyInjection {
 
    static registerAllDependencies() : void{
        UsecaseRegistry.registerUseCasesAndServices()
        RepositoryRegistry.registerRepositories()
      
    }
}