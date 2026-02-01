import { CancellationReason } from "@/order";
import { DomainEvent } from "../domain-event";

export enum ReservationStatus {
  PENDING = "PENDING",
  RESERVED = "RESERVED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export interface InventoryReservedPayload {
  orderId: string;
  type: "INVENTORY_RESERVATION_COMPLETED";
  reservationId: string;
  status: ReservationStatus;
}

export interface InventoryUnavailablePayload {
  orderId: string;
  type: "INVENTORY_RESERVATION_FAILED";
  reason: CancellationReason;
  unavailableItems?: {
    itemId: string;
  }[];
}

export type InventoryReservedEvent = DomainEvent<
  InventoryReservedPayload,
  "Inventory",
  "INVENTORY_RESERVATION_COMPLETED"
>;

export type InventoryUnavailableEvent = DomainEvent<
  InventoryUnavailablePayload,
  "Inventory",
  "INVENTORY_RESERVATION_FAILED"
>;

export type InventoryDomainEvent = InventoryReservedEvent | InventoryUnavailableEvent;
