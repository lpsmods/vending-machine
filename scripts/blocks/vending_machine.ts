import { BlockComponentOnPlaceEvent, BlockCustomComponent, CustomComponentParameters } from "@minecraft/server";
import { makeId } from "scripts/utils";

export class BlockVendingMachineComponent implements BlockCustomComponent {
  static readonly componentId: string = makeId("vending_machine");

  constructor() {
    this.onPlace = this.onPlace.bind(this);
  }

  onPlace(event: BlockComponentOnPlaceEvent, args: CustomComponentParameters) {
    const options = args.params;
    console.log("placed!");
  }
}
