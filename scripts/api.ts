import { Bridge } from "@lpsmods/mcaddon-bridge";
import { addTrade, removeTrade } from "./trade";

const api = new Bridge("lpsm_vm");

api.defineProperty("addTrade", {
  value: addTrade,
  description: "Register a trade.",
});

api.defineProperty("removeTrade", {
  value: removeTrade,
  description: "Unregister a trade.",
});
