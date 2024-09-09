export const idlFactory = ({ IDL }) => {
  const TaxPayer = IDL.Record({
    'tid' : IDL.Text,
    'address' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Error = IDL.Variant({
    'InvalidInput' : IDL.Null,
    'NotFound' : IDL.Null,
    'AlreadyExists' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Result_1 = IDL.Variant({ 'ok' : TaxPayer, 'err' : Error });
  return IDL.Service({
    'addTaxPayer' : IDL.Func([TaxPayer], [Result], []),
    'deleteTaxPayer' : IDL.Func([IDL.Text], [Result], []),
    'getAllTaxPayers' : IDL.Func([], [IDL.Vec(TaxPayer)], ['query']),
    'getTaxPayer' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'searchTaxPayers' : IDL.Func([IDL.Text], [IDL.Vec(TaxPayer)], ['query']),
    'updateTaxPayer' : IDL.Func([TaxPayer], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
