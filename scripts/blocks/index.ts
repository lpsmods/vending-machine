import { BlockComponentRegistry } from "@minecraft/server";
import { BlockVendingMachineComponent } from "./vending_machine";

export function registerBlockComponents(registry: BlockComponentRegistry): void {
  registry.registerCustomComponent(BlockVendingMachineComponent.componentId, new BlockVendingMachineComponent());
}
