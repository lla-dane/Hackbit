use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("8n8Dudd3hQzax83hDUqrcMLYRbMjs2M5RTqaKqWLJ42f");

#[program]
pub mod counter {
    use super::*;

    pub fn create_counter(_ctx: Context<CreateCounter>) -> ProgramResult {
        
        Ok(())
    }

    pub fn increment_counter(ctx: Context<Increment>) -> ProgramResult {
        ctx.accounts.counter.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCounter<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer=user, space = 100)]
    pub counter: Account<'info, Counter>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[account]
pub struct Counter {
    pub count: u64,
}
