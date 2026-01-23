export interface DomainEvent<
  TData = unknown,
  TAggregate extends string = string,
  TType extends string = string,
> {
  type: TType;
  timestamp: Date;
  aggregateId: string;
  aggregateType: TAggregate;
  data: TData;
}
