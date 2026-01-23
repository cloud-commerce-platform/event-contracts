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
}

export enum CancellationReason {
	PAYMENT_FAILED = "PAYMENT_FAILED",
	OUT_OF_STOCK = "OUT_OF_STOCK",
	INVENTORY_UNAVAILABLE = "INVENTORY_UNAVAILABLE",
	SYSTEM_ERROR = "SYSTEM_ERROR",
	ITEMS_NOT_FOUND = "ITEMS_NOT_FOUND",
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
	reason: string;
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
	reason: CancellationReason.PAYMENT_FAILED;
	details: string;
}

export interface OrderInventoryReservationFailedPayload {
	orderId: string;
	reason:
		| CancellationReason.INVENTORY_UNAVAILABLE
		| CancellationReason.INVENTORY_UNAVAILABLE;
	unavailableItems: { itemId: string }[];
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

export type OrderDomainEvent =
	| OrderCreatedEvent
	| OrderConfirmedEvent
	| OrderCancelledEvent
	| OrderCompletedEvent
	| PaymentVerificationFailedEvent
	| OrderInventoryReservationFailedEvent;

export type OrderServiceEmittedEvents = OrderDomainEvent;
