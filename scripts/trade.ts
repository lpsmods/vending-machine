import { Identifier } from "@lpsmods/mc-common";
import { Container, ItemStack, Player } from "@minecraft/server";

export interface TradeInstance {
  wants: ItemStack;
  wantsSlot: number;
  additionalWants?: ItemStack;
  additionalWantsSlot?: number;
  gives: ItemStack;
  givesSlot: number;
}

export interface Trade {
  tags: string[];
  wants: ItemStack;
  additionalWants?: ItemStack;
  gives: ItemStack;
}

const TRADES: Map<string, Trade> = new Map();

export function addTrade(identifier: string, trade: Trade): void {
  const id = Identifier.string(identifier);
  if (TRADES.has(id)) throw new Error(`Duplicate trade ${id} found!`);
  TRADES.set(id, trade);
}

export function removeTrade(identifier: string): void {
  const id = Identifier.string(identifier);
  if (!TRADES.has(id)) throw new Error(`Trade ${id} not found!`);
  TRADES.delete(identifier);
}

// TODO: Filter out trades from tag.
export function getTrades(tags: string[]): Record<string, Trade> {
  const result = {};
  for (const [id, trade] of TRADES.entries()) {
  }
  return result;
}

// TODO: Complete the trade.
export function applyTrade(container: Container, player: Player, trade: TradeInstance): boolean {
  return false;
}

// TODO: Default trades.
addTrade("test", {
  tags: ["vending_machine"],
  wants: new ItemStack("paper"),
  gives: new ItemStack("paper"),
});
