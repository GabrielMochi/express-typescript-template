import { Provider } from "@interfaces/provider.interface";
import type { Configurator } from "./configurator.interface";
import { ConvictConfigurator } from "./implementations/convict.configurator";

export class ConfiguratorProvider extends Provider<Configurator>(new ConvictConfigurator()) {}
