import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Error "mo:base/Error";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  type Error = {
    #NotFound;
    #AlreadyExists;
    #InvalidInput;
  };

  stable var taxPayersEntries : [(Text, TaxPayer)] = [];
  var taxPayers = HashMap.HashMap<Text, TaxPayer>(10, Text.equal, Text.hash);

  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 10, Text.equal, Text.hash);
    taxPayersEntries := [];
  };

  public func addTaxPayer(taxpayer: TaxPayer) : async Result.Result<(), Error> {
    switch (taxPayers.get(taxpayer.tid)) {
      case (null) {
        taxPayers.put(taxpayer.tid, taxpayer);
        #ok(())
      };
      case (?_) {
        #err(#AlreadyExists)
      };
    }
  };

  public query func getTaxPayer(tid: Text) : async Result.Result<TaxPayer, Error> {
    switch (taxPayers.get(tid)) {
      case (null) { #err(#NotFound) };
      case (?taxpayer) { #ok(taxpayer) };
    }
  };

  public func updateTaxPayer(taxpayer: TaxPayer) : async Result.Result<(), Error> {
    switch (taxPayers.get(taxpayer.tid)) {
      case (null) { #err(#NotFound) };
      case (?_) {
        taxPayers.put(taxpayer.tid, taxpayer);
        #ok(())
      };
    }
  };

  public func deleteTaxPayer(tid: Text) : async Result.Result<(), Error> {
    switch (taxPayers.remove(tid)) {
      case (null) { #err(#NotFound) };
      case (?_) { #ok(()) };
    }
  };

  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  public query func searchTaxPayers(searchText: Text) : async [TaxPayer] {
    let results = Iter.toArray(Iter.filter(taxPayers.vals(), func (t: TaxPayer) : Bool {
      Text.contains(t.tid, #text(searchText)) or
      Text.contains(t.firstName, #text(searchText)) or
      Text.contains(t.lastName, #text(searchText)) or
      Text.contains(t.address, #text(searchText))
    }));
    results
  };
}
