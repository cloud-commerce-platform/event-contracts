import { DomainEvent } from "@/domain-event"
import { CancellationReason } from "@/order"

export interface PaymentDeductedPayload {
  type: "PAYMENT_DEDUCTION_COMPLETED"
  orderId: string

}
export interface PaymentDeductionFailedPayload {
  type: "PAYMENT_DEDUCTION_FAILED"
  orderId: string
  reason: CancellationReason
}

export type PaymentDeductedCompletedEvent = DomainEvent<
  PaymentDeductedPayload,
  "Payment",
  "PAYMENT_DEDUCTED"
>

export type PaymentDeductedFailedEvent =
  DomainEvent<
    PaymentDeductionFailedPayload,
    "Payment",
    "PAYMENT_DEDUCTED_FAILED"
  >


export type PaymentDomainEvent = PaymentDeductedCompletedEvent | PaymentDeductedFailedEvent
