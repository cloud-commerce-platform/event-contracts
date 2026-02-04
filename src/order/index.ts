import { Domain } from "node:domain";
import { DomainEvent } from "../domain-event";

export interface OrderItems {
  id: string;
  price: number;
  quantity: number;
  totalAmount: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  COMPENSATION_PENDING = "COMPENSATION_PENDING",
  COMPENSATED = "COMPENSATED"
}

export enum CancellationReason {
  PAYMENT_FAILED = "PAYMENT_CUSTOMER_NOT_FOUND",
  PAYMENT_INSUFFICIENT_FUNDS = "PAYMENT_INSUFFICIENT_FUNDS",
  PAYMENT_CUSTOMER_NOT_FOUND = "PAYMENT_CUSTOMER_NOT_FOUND",
  INVENTORY_OUT_OF_STOCK = "OUT_OF_STOCK",
  INVENTORY_UNAVAILABLE = "INVENTORY_UNAVAILABLE",
  INVENTORY_ITEMS_NOT_FOUND = "ITEMS_NOT_FOUND",
  SYSTEM_ERROR = "SYSTEM_ERROR",
}

export interface OrderCreatedPayload {
  orderId: string;
  customerId: string;
  items: OrderItems[];
  totalAmount: number;
  currency: string;
}

export interface OrderConfirmedPayload {
  orderId: string;
  confirmedAt: Date;
  customerId: string;
  totalAmount: number;
}

export interface OrderCancelledPayload {
  orderId: string;
  cancelledAt: Date;
  reason: CancellationReason[];
  cancelledBy: "customer" | "admin" | "system";
  previousStatus: OrderStatus;
  requiresRefund: boolean;
  requiresInventoryRollback: boolean;
}

export interface OrderCompletedPayload {
  orderId: string;
  completedAt: Date;
  deliveryDetails?: Record<string, any>;
}

export interface PaymentVerificationFailedPayload {
  orderId: string;
  reason: CancellationReason;
  failedAt: Date
}

export interface OrderInventoryReservationFailedPayload {
  orderId: string;
  reason: CancellationReason
  failedAt: Date
}

export interface OrderInventoryRollbackPayload {
  orderId: string
}

export interface OrderPaymentRollbackPayload {
  orderId: string
}

export interface OrderInventoryReservationCompletedPayload {
  orderId: string,
  completedAt: Date
}
export interface OrderPaymentDeductionCompletedPayload {
  orderId: string,
  completedAt: Date
}

export interface OrderCompensationPayload {
  orderId: string
}

export type OrderCreatedEvent = DomainEvent<
  OrderCreatedPayload,
  "Order",
  "ORDER_CREATED"
>;

export type OrderConfirmedEvent = DomainEvent<
  OrderConfirmedPayload,
  "Order",
  "ORDER_CONFIRMED"
>;

export type OrderCancelledEvent = DomainEvent<
  OrderCancelledPayload,
  "Order",
  "ORDER_CANCELLED"
>;

export type OrderCompletedEvent = DomainEvent<
  OrderCompletedPayload,
  "Order",
  "ORDER_COMPLETED"
>;

export type PaymentVerificationFailedEvent = DomainEvent<
  PaymentVerificationFailedPayload,
  "Order",
  "ORDER_PAYMENT_VERIFICATION_FAILED"
>;

export type OrderInventoryReservationFailedEvent = DomainEvent<
  OrderInventoryReservationFailedPayload,
  "Order",
  "ORDER_INVENTORY_RESERVATION_FAILED"
>;

export type OrderInventoryRollbackEvent = DomainEvent<
  OrderInventoryRollbackPayload,
  "Order",
  "ORDER_INVENTORY_ROLLBACK_REQUESTED"
>

export type OrderPaymentRollbackEvent = DomainEvent<
  OrderPaymentRollbackPayload,
  "Order",
  "ORDER_PAYMENT_ROLLBACK_REQUESTED"
>

export type OrderPaymentDeductionCompletedEvent = DomainEvent<
  OrderPaymentDeductionCompletedPayload,
  "Order",
  "ORDER_PAYMENT_DEDUCTION_COMPLETED"
>

export type OrderInventoryReservationCompletedEvent = DomainEvent<
  OrderInventoryReservationCompletedPayload,
  "Order",
  "ORDER_INVENTORY_RESERVATION_COMPLETED"
>

export type OrderCompensationEvent = DomainEvent<
  OrderCompensationPayload,
  "Order",
  "ORDER_COMPENSATION_STARTED"
>


export type OrderDomainEvent =
  | OrderCreatedEvent
  | OrderConfirmedEvent
  | OrderCancelledEvent
  | OrderCompletedEvent
  | PaymentVerificationFailedEvent
  | OrderInventoryReservationFailedEvent
  | OrderInventoryRollbackEvent
  | OrderPaymentRollbackEvent
  | OrderPaymentDeductionCompletedEvent
  | OrderInventoryReservationCompletedEvent
  | OrderCompensationEvent

export type OrderServiceEmittedEvents = OrderDomainEvent;
