import { StartupEvent, system } from "@minecraft/server";
import { registerItemComponents } from "./item";
import { registerBlockComponents } from "./block";

import { initializeDev } from "@lpsmods/mc-dev";
import { ENVIRONMENT } from "./constants";
initializeDev(ENVIRONMENT);

function startup(event: StartupEvent): void {
  registerBlockComponents(event.blockComponentRegistry);
  registerItemComponents(event.itemComponentRegistry);
}

system.beforeEvents.startup.subscribe(startup);
