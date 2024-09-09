import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Error = { 'InvalidInput' : null } |
  { 'NotFound' : null } |
  { 'AlreadyExists' : null };
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : TaxPayer } |
  { 'err' : Error };
export interface TaxPayer {
  'tid' : string,
  'address' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'addTaxPayer' : ActorMethod<[TaxPayer], Result>,
  'deleteTaxPayer' : ActorMethod<[string], Result>,
  'getAllTaxPayers' : ActorMethod<[], Array<TaxPayer>>,
  'getTaxPayer' : ActorMethod<[string], Result_1>,
  'searchTaxPayers' : ActorMethod<[string], Array<TaxPayer>>,
  'updateTaxPayer' : ActorMethod<[TaxPayer], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
