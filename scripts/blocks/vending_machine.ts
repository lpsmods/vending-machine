import { ActionForm, ActionFormHandler, Identifier, ModalFormHandler } from "@lpsmods/mc-common";
import {
  Block,
  BlockComponentPlayerInteractEvent,
  BlockCustomComponent,
  Container,
  CustomComponentParameters,
  ItemStack,
  Player,
  RawMessage,
} from "@minecraft/server";
import { PROJECT_ID } from "scripts/constants";
import { makeId } from "scripts/utils";

export interface BlockVendingMachineOptions {
  tags: string[]; // Like crafting tags but for vending machines.
}

interface Trade {
  wants: ItemStack;
  wantsSlot: number;
  additionalWants?: ItemStack;
  additionalWantsSlot?: number;
  gives: ItemStack;
  givesSlot: number;
}

export class BlockVendingMachineComponent implements BlockCustomComponent {
  static readonly componentId: string = makeId("vending_machine");

  constructor() {
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  getTrades(container: Container): Trade[] {
    const trades: Trade[] = [];
    for (let wantsSlot = 0; wantsSlot < 8; wantsSlot++) {
      const wants = container.getItem(wantsSlot);
      if (!wants) continue;
      const additionalWantsSlot = wantsSlot + 9;
      const additionalWants = container.getItem(additionalWantsSlot);
      const givesSlot = additionalWantsSlot + 9;
      const gives = container.getItem(givesSlot);
      if (!gives) continue;
      trades.push({
        wants,
        additionalWants,
        gives,
        wantsSlot,
        additionalWantsSlot,
        givesSlot,
      });
    }
    return trades;
  }

  openScreen(player: Player, barrel: Block): void {
    const container = barrel.getComponent("inventory")?.container;
    if (!container) return;
    const form: ActionForm = {
      title: `menu.${PROJECT_ID}:vending_machine`,
      buttons: [],
    };
    if (container.emptySlotsCount === container.size) form.body = `menu.${PROJECT_ID}:vending_machine.empty`;

    // Build trades
    const trades = this.getTrades(container);
    for (const trade of trades) {
      const icon = Identifier.parse(trade.gives.typeId).path;

      // TODO: Make item name red if the player does not have the item.
      const label: RawMessage = { rawtext: [{ translate: trade.wants.localizationKey }] };
      if (trade.additionalWants) {
        label.rawtext?.push({ text: " + " });
        label.rawtext?.push({ translate: trade.additionalWants.localizationKey });
      }
      form.buttons?.push({ label: label, icon: `textures/items/${icon}.png` });
    }

    const ui = new ActionFormHandler(form);
    ui.show(player);
  }

  getBarrel(block: Block): Block | undefined {
    const part = block.permutation.getState("minecraft:multi_block_part") ?? 0;
    if (part == 1) return block.below()?.below();
    return block.below();
  }

  onPlayerInteract(event: BlockComponentPlayerInteractEvent, args: CustomComponentParameters) {
    const options = args.params as BlockVendingMachineOptions; // TODO: readonly trades
    if (!event.player) return;
    const barrel = this.getBarrel(event.block);
    if (!barrel || !barrel.matches("barrel"))
      return event.player.onScreenDisplay.setActionBar({ translate: `action.interact.${PROJECT_ID}:no_barrel` });
    this.openScreen(event.player, barrel);
  }
}
