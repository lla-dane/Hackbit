import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";

describe("counter", () => {
  // Configure the client to use the local cluster.
  const _user = anchor.AnchorProvider.env().wallet.publicKey;
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const counter = anchor.web3.Keypair.generate();

  it("Create counter", async () => {
    // Add your test here.
    const _ = await program.methods
      .createCounter()
      .accounts({
        counter: counter.publicKey,
        user: _user,
      })
      .signers([counter])
      .rpc();

    const __ = await program.methods
      .incrementCounter()
      .accounts({
        counter: counter.publicKey,
      })
      .rpc();

    const count = await program.account.counter.fetch(counter.publicKey);

    console.log(count.count);
  });

  it("Batch multiple instructions", async () => {
    let transaction = new anchor.web3.Transaction();

    const incrementCounterIx_1 = await program.methods
      .incrementCounter()
      .accounts({
        counter: counter.publicKey,
      })
      .instruction();

    const incrementCounterIx_2 = await program.methods
      .incrementCounter()
      .accounts({
        counter: counter.publicKey,
      })
      .instruction();

    transaction.add(incrementCounterIx_1);
    transaction.add(incrementCounterIx_2);

    await anchor.AnchorProvider.env().sendAndConfirm(transaction);

    const result = await program.account.counter.fetch(counter.publicKey);
    console.log(result.count);
  });
});
