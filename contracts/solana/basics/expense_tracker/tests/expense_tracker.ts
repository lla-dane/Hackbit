import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ExpenseTracker } from "../target/types/expense_tracker";
import { BN } from "bn.js";
import { assert } from "chai";

describe("expense_tracker", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const _user = anchor.AnchorProvider.env().wallet.publicKey;
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ExpenseTracker as Program<ExpenseTracker>;

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("expense"),
      provider.wallet.publicKey.toBuffer(),
      new BN(1).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const _ = await program.methods
      .initializeExpense(new anchor.BN(1), "lla_dane", new anchor.BN(100))
      .accounts({
        expenseAccount: expense_account,
        auth: _user,
      })
      .rpc();

    const acc = await program.account.expenseAccount.fetch(expense_account);

    assert.ok(acc, "Account should exist");
    assert.equal(acc.name, "lla_dane");
    assert.equal(acc.amount.toNumber(), 100);
  });

  it("Modify account expense", async () => {
    const _ = await program.methods
      .modifyExpense(new anchor.BN(1), "tom-shelby", new anchor.BN(67))
      .accounts({
        expenseAccount: expense_account,
        auth: _user,
      })
      .rpc();

    const acc = await program.account.expenseAccount.fetch(expense_account);

    assert.equal(acc.name, "tom-shelby");
    assert.equal(acc.amount.toNumber(), 67);
  });

  it("Delete account", async () => {
    const _ = await program.methods
      .deleteExpense(new anchor.BN(1))
      .accounts({
        expenseAccount: expense_account,
        auth: _user,
      })
      .rpc();

    // const acc = await program.account.expenseAccount.fetch(expense_account);
    // assert.notOk(acc, "Account should not exist");
  });
});
