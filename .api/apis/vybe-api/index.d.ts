import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Retrieve a categorized list of labeled Solana accounts, including CEX wallets, project
     * treasuries, AMM liquidity pools, market makers, and influencers.
     *
     * @summary Known Accounts
     * @throws FetchError<400, types.GetKnownAccountsResponse400> Invalid request
     * @throws FetchError<404, types.GetKnownAccountsResponse404> No data could be found
     * @throws FetchError<500, types.GetKnownAccountsResponse500> Internal server error
     */
    get_known_accounts(metadata?: types.GetKnownAccountsMetadataParam): Promise<FetchResponse<200, types.GetKnownAccountsResponse200>>;
    /**
     * Obtain the NFT balances for a provided account address. This endpoint consolidates NFT
     * holdings and offers portfolio values in USD and SOL, facilitating a comprehensive view
     * of the account's NFT assets.
     *
     * @summary NFT Balances
     * @throws FetchError<400, types.GetWalletNftsResponse400> Invalid request
     * @throws FetchError<500, types.GetWalletNftsResponse500> Internal server error
     */
    get_wallet_nfts(metadata: types.GetWalletNftsMetadataParam): Promise<FetchResponse<200, types.GetWalletNftsResponse200>>;
    /**
     * Obtain the NFT balances for a list of provided account addresses.
     * This endpoint consolidates NFT holdings and offers portfolio values in USD and SOL,
     * facilitating a comprehensive view of the serveral account's NFT assets, aggregated
     * together.
     *
     * @summary NFT Multi-wallet Balances
     * @throws FetchError<400, types.PostWalletNftsManyResponse400> Invalid request
     * @throws FetchError<500, types.PostWalletNftsManyResponse500> Internal server error
     */
    post_wallet_nfts_many(body: types.PostWalletNftsManyBodyParam): Promise<FetchResponse<200, types.PostWalletNftsManyResponse200>>;
    /**
     * Comprehensive analysis of a wallet's trading performance and position details over
     * specified time periods (1-day, 7-day, or 30-day).
     *
     * @summary Wallet PnL
     * @throws FetchError<400, types.GetWalletPnlResponse400> Invalid request
     * @throws FetchError<403, types.GetWalletPnlResponse403> Forbidden
     * @throws FetchError<500, types.GetWalletPnlResponse500> Internal server error
     */
    get_wallet_pnl(metadata: types.GetWalletPnlMetadataParam): Promise<FetchResponse<200, types.GetWalletPnlResponse200>>;
    /**
     * Retrieve daily SPL token balances for a given account address in a time-series format.
     * This endpoint aggregates native SOL, staked SOL, and SPL token holdings, and provides
     * the value in both USD —offering a complete overview of the account’s token balances.
     *
     * @summary Token Balances Time-series
     * @throws FetchError<400, types.GetWalletTokensTsResponse400> Invalid request
     * @throws FetchError<500, types.GetWalletTokensTsResponse500> Internal server error
     */
    get_wallet_tokens_ts(metadata: types.GetWalletTokensTsMetadataParam): Promise<FetchResponse<200, types.GetWalletTokensTsResponse200>>;
    /**
     * Get the SPL token balances for a provided account address.
     * This endpoint consolidates SPL token holdings and offers portfolio values in USD and
     * SOL, facilitating a comprehensive view of the account's token balances.
     *
     * @summary Token Balances
     * @throws FetchError<400, types.GetWalletTokensResponse400> Invalid request
     * @throws FetchError<500, types.GetWalletTokensResponse500> Internal server error
     */
    get_wallet_tokens(metadata: types.GetWalletTokensMetadataParam): Promise<FetchResponse<200, types.GetWalletTokensResponse200>>;
    /**
     * Get the SPL token balances for a list of     account addresses at the current time.
     * This endpoint consolidates SPL token holdings and offers portfolio values in USD and
     * SOL, facilitating a comprehensive view of serveral account's token balances, aggregated
     * together.
     *
     * @summary Token Multi-wallet Balances
     * @throws FetchError<400, types.PostWalletTokensManyResponse400> Invalid request
     * @throws FetchError<500, types.PostWalletTokensManyResponse500> Internal server error
     */
    post_wallet_tokens_many(body: types.PostWalletTokensManyBodyParam): Promise<FetchResponse<200, types.PostWalletTokensManyResponse200>>;
    /**
     * Retrieve daily SPL token balances for multiple account addresses in a time-series
     * format.
     * This endpoint aggregates native SOL, staked SOL, and SPL token holdings, and presents a
     * combined portfolio value in USD—offering a comprehensive overview of all specified
     * accounts.
     *
     * @summary Token Multi-wallet Balances Time-series
     * @throws FetchError<400, types.PostWalletTokensTsManyResponse400> Invalid request
     * @throws FetchError<500, types.PostWalletTokensTsManyResponse500> Internal server error
     */
    post_wallet_tokens_ts_many(body: types.PostWalletTokensTsManyBodyParam): Promise<FetchResponse<200, types.PostWalletTokensTsManyResponse200>>;
    /**
     * This WebSocket streams real-time data for token trades, transfers, prices, and Pyth
     * Oracle prices.
     * To access each data type, send a configuration message in the following format:
     * ```rust,ignore
     * "type": "configure",
     * "filters": { ... }
     * ```
     *
     * @summary Real-Time Data WebSocket
     */
    websocket_route(metadata?: types.WebsocketRouteMetadataParam): Promise<FetchResponse<201, types.WebsocketRouteResponse201> | FetchResponse<202, types.WebsocketRouteResponse202> | FetchResponse<203, types.WebsocketRouteResponse203>>;
    /**
     * Get the addresses of wallets that own NFT in specified collection. The amount of owners
     * returned is limited to 1000 items.
     *
     * @summary NFT Collection Owners
     * @throws FetchError<400, types.GetCollectionOwnersResponse400> Invalid request
     * @throws FetchError<500, types.GetCollectionOwnersResponse500> Internal server error
     */
    get_collection_owners(metadata: types.GetCollectionOwnersMetadataParam): Promise<FetchResponse<200, types.GetCollectionOwnersResponse200>>;
    /**
     * Get all available market IDs that are queryable via the Vybe API.
     *
     * @summary Get Markets
     * @throws FetchError<400, types.GetMarketsResponse400> Invalid request
     * @throws FetchError<404, types.GetMarketsResponse404> Market not found
     */
    get_markets(metadata: types.GetMarketsMetadataParam): Promise<FetchResponse<200, types.GetMarketsResponse200>>;
    /**
     * Get all available DEXs' and AMMs' programs used for trades and prices.
     *
     * @summary DEX-AMM
     */
    get_programs(): Promise<FetchResponse<200, types.GetProgramsResponse200>>;
    /**
     * Retrieve a comprehensive list of all Pyth oracle price accounts along with their
     * corresponding product accounts and symbols.
     *
     * @summary Pyth Accounts
     */
    get_pyth_price_product_pairs(metadata?: types.GetPythPriceProductPairsMetadataParam): Promise<FetchResponse<200, types.GetPythPriceProductPairsResponse200>>;
    /**
     * Retrieve the trade price for a base/quote pair, based on the trades and swaps of our
     * supported DEXs and AMMs.
     * Trade price refers to the specific price at which a trade (buy or sell) is executed
     * between two parties.
     *
     * @summary Pair-OHLCV
     * @throws FetchError<400, types.GetPairTradeOhlcvProgramResponse400> Invalid request
     * @throws FetchError<500, types.GetPairTradeOhlcvProgramResponse500> Internal server error
     */
    get_pair_trade_ohlcv_program(metadata: types.GetPairTradeOhlcvProgramMetadataParam): Promise<FetchResponse<200, types.GetPairTradeOhlcvProgramResponse200>>;
    /**
     * Get the OHLCV price for a unique trading pair or liquidity pool using the market ID.
     * Trade price refers to the specific price at which a trade (buy or sell) is executed
     * between two parties.
     *
     * @summary Market-OHLCV
     * @throws FetchError<400, types.GetMarketFilteredOhlcvResponse400> Invalid request
     * @throws FetchError<500, types.GetMarketFilteredOhlcvResponse500> Internal server error
     */
    get_market_filtered_ohlcv(metadata: types.GetMarketFilteredOhlcvMetadataParam): Promise<FetchResponse<200, types.GetMarketFilteredOhlcvResponse200>>;
    /**
     * Retrieve Open, High, Low, and Close (OHLC) for a token’s USD price based on aggregated
     * trades for all USDC/USDT/PYUSD/WSOL markets.
     *
     * @summary Token-OHLCV
     * @throws FetchError<400, types.GetTokenTradeOhlcResponse400> Invalid request
     * @throws FetchError<500, types.GetTokenTradeOhlcResponse500> Internal server error
     */
    get_token_trade_ohlc(metadata: types.GetTokenTradeOhlcMetadataParam): Promise<FetchResponse<200, types.GetTokenTradeOhlcResponse200>>;
    /**
     * Access up-to-date pricing information through a Pyth Price feed on the Solana
     * blockchain.
     *
     * @summary Pyth Price
     * @throws FetchError<400, types.GetPythPriceResponse400> Invalid request
     * @throws FetchError<404, types.GetPythPriceResponse404> Product not found
     * @throws FetchError<500, types.GetPythPriceResponse500> Internal server error
     */
    get_pyth_price(metadata: types.GetPythPriceMetadataParam): Promise<FetchResponse<200, types.GetPythPriceResponse200>>;
    /**
     * Retrieve the Open, High, Low, and Close (OHLC) data from a Pyth Oracle price feed.
     *
     * @summary Pyth Price OHLC
     * @throws FetchError<400, types.GetPythPriceOhlcResponse400> Invalid request
     * @throws FetchError<404, types.GetPythPriceOhlcResponse404> Product not found
     * @throws FetchError<500, types.GetPythPriceOhlcResponse500> Internal server error
     */
    get_pyth_price_ohlc(metadata: types.GetPythPriceOhlcMetadataParam): Promise<FetchResponse<200, types.GetPythPriceOhlcResponse200>>;
    /**
     * Access real-time pricing data and historical oracle prices of a Pyth Price feed.
     *
     * @summary Pyth Price: Time Series
     * @throws FetchError<400, types.GetPythPriceTsResponse400> Invalid request
     * @throws FetchError<404, types.GetPythPriceTsResponse404> Product not found
     * @throws FetchError<500, types.GetPythPriceTsResponse500> Internal server error
     */
    get_pyth_price_ts(metadata: types.GetPythPriceTsMetadataParam): Promise<FetchResponse<200, types.GetPythPriceTsResponse200>>;
    /**
     * Retrieve the metadata for a specific product using its Product ID from the Pyth network.
     *
     * @summary Pyth Product
     * @throws FetchError<400, types.GetPythProductResponse400> Invalid request
     * @throws FetchError<404, types.GetPythProductResponse404> Product not found
     * @throws FetchError<500, types.GetPythProductResponse500> Internal server error
     */
    get_pyth_product(metadata: types.GetPythProductMetadataParam): Promise<FetchResponse<200, types.GetPythProductResponse200>>;
    /**
     * Retrieve a categorized list of labeled programs.
     * Labeled programs are categorized by their product sector (NFT, perps etc.).
     * Entity names refer to the business or organization that owns one more programs.
     *
     * @summary Known Program Accounts
     * @throws FetchError<400, types.GetKnownProgramAccountsResponse400> Invalid request
     * @throws FetchError<404, types.GetKnownProgramAccountsResponse404> No data could be found
     * @throws FetchError<500, types.GetKnownProgramAccountsResponse500> Internal server error
     */
    get_known_program_accounts(metadata?: types.GetKnownProgramAccountsMetadataParam): Promise<FetchResponse<200, types.GetKnownProgramAccountsResponse200>>;
    /**
     * Retrieve the program IDs with ranks.
     *
     * @summary Ranking
     * @throws FetchError<400, types.RankingResponse400> Invalid request
     * @throws FetchError<404, types.RankingResponse404> No data found
     * @throws FetchError<500, types.RankingResponse500> Internal server error
     */
    ranking(metadata?: types.RankingMetadataParam): Promise<FetchResponse<200, types.RankingResponse200>>;
    /**
     * Get details for a Solana program, including its name, entity, label category,
     * instruction/transaction counts, and daily active users
     *
     * @summary Programs Details
     * @throws FetchError<400, types.GetProgramResponse400> Invalid request
     * @throws FetchError<500, types.GetProgramResponse500> Internal server error
     */
    get_program(metadata: types.GetProgramMetadataParam): Promise<FetchResponse<200, types.GetProgramResponse200>>;
    /**
     * Get active users with instruction and transaction count for particular program
     *
     * @summary Program Active Users
     * @throws FetchError<400, types.GetProgramActiveUsersResponse400> Invalid request
     * @throws FetchError<500, types.GetProgramActiveUsersResponse500> Internal server error
     */
    get_program_active_users(metadata: types.GetProgramActiveUsersMetadataParam): Promise<FetchResponse<200, types.GetProgramActiveUsersResponse200>>;
    /**
     * Retrieve time series data tracking the number of active users for a specified program.
     * This endpoint provides insights into the program's user engagement over time.
     *
     * @summary Active Users: Time Series
     */
    get_program_active_users_count(metadata: types.GetProgramActiveUsersCountMetadataParam): Promise<FetchResponse<200, types.GetProgramActiveUsersCountResponse200>>;
    /**
     * Access time series data tracking the instruction count for a specific program.
     * This endpoint provides a historical overview of the number of instructions executed
     * within the program, enabling analysis of program activity and complexity over time.
     *
     * @summary Instruction Count: Time Series
     * @throws FetchError<400, types.GetProgramInstructionsCountResponse400> Invalid request
     * @throws FetchError<500, types.GetProgramInstructionsCountResponse500> Internal server error
     */
    get_program_instructions_count(metadata: types.GetProgramInstructionsCountMetadataParam): Promise<FetchResponse<200, types.GetProgramInstructionsCountResponse200>>;
    /**
     * Access time series data tracking the transaction count for a specific program.
     * This endpoint provides a historical overview of transaction activity within the program,
     * enabling analysis of transaction trends and patterns over time.
     *
     * @summary Transaction Count: Time Series
     * @throws FetchError<400, types.GetProgramTransactionsCountResponse400> Invalid request
     * @throws FetchError<500, types.GetProgramTransactionsCountResponse500> Internal server error
     */
    get_program_transactions_count(metadata: types.GetProgramTransactionsCountMetadataParam): Promise<FetchResponse<200, types.GetProgramTransactionsCountResponse200>>;
    /**
     * Get tvl time series for particular program
     *
     * @summary Program TVL
     * @throws FetchError<400, types.GetProgramTvlResponse400> Invalid request
     * @throws FetchError<500, types.GetProgramTvlResponse500> Internal server error
     */
    get_program_tvl(metadata: types.GetProgramTvlMetadataParam): Promise<FetchResponse<200, types.GetProgramTvlResponse200>>;
    /**
     * Get a list of all Solana programs that have their IDLs on-chain. Sort programs by our
     * labeled categories or by daily active users.
     *
     * @summary Programs List
     * @throws FetchError<400, types.GetProgramsListResponse400> Invalid request
     * @throws FetchError<500, types.GetProgramsListResponse500> Internal server error
     */
    get_programs_list(metadata?: types.GetProgramsListMetadataParam): Promise<FetchResponse<200, types.GetProgramsListResponse200>>;
    /**
     * This endpoint retrieves a comprehensive list of instruction names derived from our
     * discriminants. It provides a convenient method to find and understand the various token
     * transfer instructions available across Solana programs.
     *
     * @summary Instruction Names
     * @throws FetchError<400, types.GetTokenInstructionNamesResponse400> Invalid request
     * @throws FetchError<404, types.GetTokenInstructionNamesResponse404> No data matches provided query
     * @throws FetchError<500, types.GetTokenInstructionNamesResponse500> Internal server error
     */
    get_token_instruction_names(metadata?: types.GetTokenInstructionNamesMetadataParam): Promise<FetchResponse<200, types.GetTokenInstructionNamesResponse200>>;
    /**
     * Access data for trades executed within a program. By default, this is from all
     * aggregated programs and markets within the last 14 days.
     *
     * @summary Token Trades
     * @throws FetchError<400, types.GetTradeDataProgramResponse400> Invalid request
     * @throws FetchError<500, types.GetTradeDataProgramResponse500> Internal server error
     */
    get_trade_data_program(metadata?: types.GetTradeDataProgramMetadataParam): Promise<FetchResponse<200, types.GetTradeDataProgramResponse200>>;
    /**
     * Retrieve a comprehensive list of token transfer transactions, offering versatile
     * filtering options based on
     * transaction signature, calling program, source and destination owners, mintAddress
     * address, time range,
     * and amount range.
     *
     * @summary Token Transfers
     * @throws FetchError<400, types.GetTokenTransfersResponse400> Invalid request
     * @throws FetchError<500, types.GetTokenTransfersResponse500> Internal server error
     */
    get_token_transfers(metadata?: types.GetTokenTransfersMetadataParam): Promise<FetchResponse<200, types.GetTokenTransfersResponse200>>;
    /**
     * Retrieves details of the specified token.
     *
     * Useful for overview of a token's past 24 hours' activity.
     *
     * @summary Token Details
     * @throws FetchError<400, types.GetTokenDetailsResponse400> Invalid request
     * @throws FetchError<404, types.GetTokenDetailsResponse404> No data matches provided query
     * @throws FetchError<500, types.GetTokenDetailsResponse500> Internal server error
     */
    get_token_details(metadata: types.GetTokenDetailsMetadataParam): Promise<FetchResponse<200, types.GetTokenDetailsResponse200>>;
    /**
     * Retrieves number of token holders at selected interval for the specified token.
     *
     * Useful for viewing the trend of token holders over given period.
     *
     * Currently, only daily aggregation is supported.
     *
     * @summary Token Holders Time Series
     * @throws FetchError<400, types.GetTokenHoldersTimeSeriesResponse400> Invalid request
     * @throws FetchError<404, types.GetTokenHoldersTimeSeriesResponse404> No data matches provided query
     * @throws FetchError<500, types.GetTokenHoldersTimeSeriesResponse500> Internal server error
     */
    get_token_holders_time_series(metadata: types.GetTokenHoldersTimeSeriesMetadataParam): Promise<FetchResponse<200, types.GetTokenHoldersTimeSeriesResponse200>>;
    /**
     * Retrieves the top 1,000 token holders. Data is updated every three hours
     *
     * Allows sorting based on token holder fields: rank, ownerName, ownerAddress, valueUsd,
     * balance and percentageOfSupplyHeld.
     *
     * Useful for overview of a token's top holders
     *
     * @summary Top Token Holders
     * @throws FetchError<400, types.GetTopHoldersResponse400> Invalid request
     * @throws FetchError<404, types.GetTopHoldersResponse404> No data matches provided query
     * @throws FetchError<500, types.GetTopHoldersResponse500> Internal server error
     */
    get_top_holders(metadata: types.GetTopHoldersMetadataParam): Promise<FetchResponse<200, types.GetTopHoldersResponse200>>;
    /**
     * Retrieves the token volume in USD, transferred over the specified period at selected
     * intervals for the specified token.
     *
     * Useful for viewing the trend of token volume transferred over the given period.
     *
     * @summary Token Volume Time Series
     * @throws FetchError<400, types.GetTokenVolumeTimeSeriesResponse400> Invalid request
     * @throws FetchError<404, types.GetTokenVolumeTimeSeriesResponse404> No data matches provided query
     * @throws FetchError<500, types.GetTokenVolumeTimeSeriesResponse500> Internal server error
     */
    get_token_volume_time_series(metadata: types.GetTokenVolumeTimeSeriesMetadataParam): Promise<FetchResponse<200, types.GetTokenVolumeTimeSeriesResponse200>>;
    /**
     * Retrieves a list of tracked tokens.
     *
     * Allows sorting based on token fields: mintAddress, currentSupply, marketCap, name, price
     * and symbol.
     *
     * Useful for overview of past 24 hours' activity of listed tokens.
     *
     * Results are paginated via page query parameter.
     *
     * @summary Tokens
     * @throws FetchError<400, types.GetTokensSummaryResponse400> Invalid request
     * @throws FetchError<404, types.GetTokensSummaryResponse404> No data matches provided query
     * @throws FetchError<500, types.GetTokensSummaryResponse500> Internal server error
     */
    get_tokens_summary(metadata?: types.GetTokensSummaryMetadataParam): Promise<FetchResponse<200, types.GetTokensSummaryResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
