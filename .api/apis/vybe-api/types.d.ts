import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type GetCollectionOwnersMetadataParam = FromSchema<typeof schemas.GetCollectionOwners.metadata>;
export type GetCollectionOwnersResponse200 = FromSchema<typeof schemas.GetCollectionOwners.response['200']>;
export type GetCollectionOwnersResponse400 = FromSchema<typeof schemas.GetCollectionOwners.response['400']>;
export type GetCollectionOwnersResponse500 = FromSchema<typeof schemas.GetCollectionOwners.response['500']>;
export type GetKnownAccountsMetadataParam = FromSchema<typeof schemas.GetKnownAccounts.metadata>;
export type GetKnownAccountsResponse200 = FromSchema<typeof schemas.GetKnownAccounts.response['200']>;
export type GetKnownAccountsResponse400 = FromSchema<typeof schemas.GetKnownAccounts.response['400']>;
export type GetKnownAccountsResponse404 = FromSchema<typeof schemas.GetKnownAccounts.response['404']>;
export type GetKnownAccountsResponse500 = FromSchema<typeof schemas.GetKnownAccounts.response['500']>;
export type GetKnownProgramAccountsMetadataParam = FromSchema<typeof schemas.GetKnownProgramAccounts.metadata>;
export type GetKnownProgramAccountsResponse200 = FromSchema<typeof schemas.GetKnownProgramAccounts.response['200']>;
export type GetKnownProgramAccountsResponse400 = FromSchema<typeof schemas.GetKnownProgramAccounts.response['400']>;
export type GetKnownProgramAccountsResponse404 = FromSchema<typeof schemas.GetKnownProgramAccounts.response['404']>;
export type GetKnownProgramAccountsResponse500 = FromSchema<typeof schemas.GetKnownProgramAccounts.response['500']>;
export type GetMarketFilteredOhlcvMetadataParam = FromSchema<typeof schemas.GetMarketFilteredOhlcv.metadata>;
export type GetMarketFilteredOhlcvResponse200 = FromSchema<typeof schemas.GetMarketFilteredOhlcv.response['200']>;
export type GetMarketFilteredOhlcvResponse400 = FromSchema<typeof schemas.GetMarketFilteredOhlcv.response['400']>;
export type GetMarketFilteredOhlcvResponse500 = FromSchema<typeof schemas.GetMarketFilteredOhlcv.response['500']>;
export type GetMarketsMetadataParam = FromSchema<typeof schemas.GetMarkets.metadata>;
export type GetMarketsResponse200 = FromSchema<typeof schemas.GetMarkets.response['200']>;
export type GetMarketsResponse400 = FromSchema<typeof schemas.GetMarkets.response['400']>;
export type GetMarketsResponse404 = FromSchema<typeof schemas.GetMarkets.response['404']>;
export type GetPairTradeOhlcvProgramMetadataParam = FromSchema<typeof schemas.GetPairTradeOhlcvProgram.metadata>;
export type GetPairTradeOhlcvProgramResponse200 = FromSchema<typeof schemas.GetPairTradeOhlcvProgram.response['200']>;
export type GetPairTradeOhlcvProgramResponse400 = FromSchema<typeof schemas.GetPairTradeOhlcvProgram.response['400']>;
export type GetPairTradeOhlcvProgramResponse500 = FromSchema<typeof schemas.GetPairTradeOhlcvProgram.response['500']>;
export type GetProgramActiveUsersCountMetadataParam = FromSchema<typeof schemas.GetProgramActiveUsersCount.metadata>;
export type GetProgramActiveUsersCountResponse200 = FromSchema<typeof schemas.GetProgramActiveUsersCount.response['200']>;
export type GetProgramActiveUsersMetadataParam = FromSchema<typeof schemas.GetProgramActiveUsers.metadata>;
export type GetProgramActiveUsersResponse200 = FromSchema<typeof schemas.GetProgramActiveUsers.response['200']>;
export type GetProgramActiveUsersResponse400 = FromSchema<typeof schemas.GetProgramActiveUsers.response['400']>;
export type GetProgramActiveUsersResponse500 = FromSchema<typeof schemas.GetProgramActiveUsers.response['500']>;
export type GetProgramInstructionsCountMetadataParam = FromSchema<typeof schemas.GetProgramInstructionsCount.metadata>;
export type GetProgramInstructionsCountResponse200 = FromSchema<typeof schemas.GetProgramInstructionsCount.response['200']>;
export type GetProgramInstructionsCountResponse400 = FromSchema<typeof schemas.GetProgramInstructionsCount.response['400']>;
export type GetProgramInstructionsCountResponse500 = FromSchema<typeof schemas.GetProgramInstructionsCount.response['500']>;
export type GetProgramMetadataParam = FromSchema<typeof schemas.GetProgram.metadata>;
export type GetProgramResponse200 = FromSchema<typeof schemas.GetProgram.response['200']>;
export type GetProgramResponse400 = FromSchema<typeof schemas.GetProgram.response['400']>;
export type GetProgramResponse500 = FromSchema<typeof schemas.GetProgram.response['500']>;
export type GetProgramTransactionsCountMetadataParam = FromSchema<typeof schemas.GetProgramTransactionsCount.metadata>;
export type GetProgramTransactionsCountResponse200 = FromSchema<typeof schemas.GetProgramTransactionsCount.response['200']>;
export type GetProgramTransactionsCountResponse400 = FromSchema<typeof schemas.GetProgramTransactionsCount.response['400']>;
export type GetProgramTransactionsCountResponse500 = FromSchema<typeof schemas.GetProgramTransactionsCount.response['500']>;
export type GetProgramTvlMetadataParam = FromSchema<typeof schemas.GetProgramTvl.metadata>;
export type GetProgramTvlResponse200 = FromSchema<typeof schemas.GetProgramTvl.response['200']>;
export type GetProgramTvlResponse400 = FromSchema<typeof schemas.GetProgramTvl.response['400']>;
export type GetProgramTvlResponse500 = FromSchema<typeof schemas.GetProgramTvl.response['500']>;
export type GetProgramsListMetadataParam = FromSchema<typeof schemas.GetProgramsList.metadata>;
export type GetProgramsListResponse200 = FromSchema<typeof schemas.GetProgramsList.response['200']>;
export type GetProgramsListResponse400 = FromSchema<typeof schemas.GetProgramsList.response['400']>;
export type GetProgramsListResponse500 = FromSchema<typeof schemas.GetProgramsList.response['500']>;
export type GetProgramsResponse200 = FromSchema<typeof schemas.GetPrograms.response['200']>;
export type GetPythPriceMetadataParam = FromSchema<typeof schemas.GetPythPrice.metadata>;
export type GetPythPriceOhlcMetadataParam = FromSchema<typeof schemas.GetPythPriceOhlc.metadata>;
export type GetPythPriceOhlcResponse200 = FromSchema<typeof schemas.GetPythPriceOhlc.response['200']>;
export type GetPythPriceOhlcResponse400 = FromSchema<typeof schemas.GetPythPriceOhlc.response['400']>;
export type GetPythPriceOhlcResponse404 = FromSchema<typeof schemas.GetPythPriceOhlc.response['404']>;
export type GetPythPriceOhlcResponse500 = FromSchema<typeof schemas.GetPythPriceOhlc.response['500']>;
export type GetPythPriceProductPairsMetadataParam = FromSchema<typeof schemas.GetPythPriceProductPairs.metadata>;
export type GetPythPriceProductPairsResponse200 = FromSchema<typeof schemas.GetPythPriceProductPairs.response['200']>;
export type GetPythPriceResponse200 = FromSchema<typeof schemas.GetPythPrice.response['200']>;
export type GetPythPriceResponse400 = FromSchema<typeof schemas.GetPythPrice.response['400']>;
export type GetPythPriceResponse404 = FromSchema<typeof schemas.GetPythPrice.response['404']>;
export type GetPythPriceResponse500 = FromSchema<typeof schemas.GetPythPrice.response['500']>;
export type GetPythPriceTsMetadataParam = FromSchema<typeof schemas.GetPythPriceTs.metadata>;
export type GetPythPriceTsResponse200 = FromSchema<typeof schemas.GetPythPriceTs.response['200']>;
export type GetPythPriceTsResponse400 = FromSchema<typeof schemas.GetPythPriceTs.response['400']>;
export type GetPythPriceTsResponse404 = FromSchema<typeof schemas.GetPythPriceTs.response['404']>;
export type GetPythPriceTsResponse500 = FromSchema<typeof schemas.GetPythPriceTs.response['500']>;
export type GetPythProductMetadataParam = FromSchema<typeof schemas.GetPythProduct.metadata>;
export type GetPythProductResponse200 = FromSchema<typeof schemas.GetPythProduct.response['200']>;
export type GetPythProductResponse400 = FromSchema<typeof schemas.GetPythProduct.response['400']>;
export type GetPythProductResponse404 = FromSchema<typeof schemas.GetPythProduct.response['404']>;
export type GetPythProductResponse500 = FromSchema<typeof schemas.GetPythProduct.response['500']>;
export type GetTokenDetailsMetadataParam = FromSchema<typeof schemas.GetTokenDetails.metadata>;
export type GetTokenDetailsResponse200 = FromSchema<typeof schemas.GetTokenDetails.response['200']>;
export type GetTokenDetailsResponse400 = FromSchema<typeof schemas.GetTokenDetails.response['400']>;
export type GetTokenDetailsResponse404 = FromSchema<typeof schemas.GetTokenDetails.response['404']>;
export type GetTokenDetailsResponse500 = FromSchema<typeof schemas.GetTokenDetails.response['500']>;
export type GetTokenHoldersTimeSeriesMetadataParam = FromSchema<typeof schemas.GetTokenHoldersTimeSeries.metadata>;
export type GetTokenHoldersTimeSeriesResponse200 = FromSchema<typeof schemas.GetTokenHoldersTimeSeries.response['200']>;
export type GetTokenHoldersTimeSeriesResponse400 = FromSchema<typeof schemas.GetTokenHoldersTimeSeries.response['400']>;
export type GetTokenHoldersTimeSeriesResponse404 = FromSchema<typeof schemas.GetTokenHoldersTimeSeries.response['404']>;
export type GetTokenHoldersTimeSeriesResponse500 = FromSchema<typeof schemas.GetTokenHoldersTimeSeries.response['500']>;
export type GetTokenInstructionNamesMetadataParam = FromSchema<typeof schemas.GetTokenInstructionNames.metadata>;
export type GetTokenInstructionNamesResponse200 = FromSchema<typeof schemas.GetTokenInstructionNames.response['200']>;
export type GetTokenInstructionNamesResponse400 = FromSchema<typeof schemas.GetTokenInstructionNames.response['400']>;
export type GetTokenInstructionNamesResponse404 = FromSchema<typeof schemas.GetTokenInstructionNames.response['404']>;
export type GetTokenInstructionNamesResponse500 = FromSchema<typeof schemas.GetTokenInstructionNames.response['500']>;
export type GetTokenTradeOhlcMetadataParam = FromSchema<typeof schemas.GetTokenTradeOhlc.metadata>;
export type GetTokenTradeOhlcResponse200 = FromSchema<typeof schemas.GetTokenTradeOhlc.response['200']>;
export type GetTokenTradeOhlcResponse400 = FromSchema<typeof schemas.GetTokenTradeOhlc.response['400']>;
export type GetTokenTradeOhlcResponse500 = FromSchema<typeof schemas.GetTokenTradeOhlc.response['500']>;
export type GetTokenTransfersMetadataParam = FromSchema<typeof schemas.GetTokenTransfers.metadata>;
export type GetTokenTransfersResponse200 = FromSchema<typeof schemas.GetTokenTransfers.response['200']>;
export type GetTokenTransfersResponse400 = FromSchema<typeof schemas.GetTokenTransfers.response['400']>;
export type GetTokenTransfersResponse500 = FromSchema<typeof schemas.GetTokenTransfers.response['500']>;
export type GetTokenVolumeTimeSeriesMetadataParam = FromSchema<typeof schemas.GetTokenVolumeTimeSeries.metadata>;
export type GetTokenVolumeTimeSeriesResponse200 = FromSchema<typeof schemas.GetTokenVolumeTimeSeries.response['200']>;
export type GetTokenVolumeTimeSeriesResponse400 = FromSchema<typeof schemas.GetTokenVolumeTimeSeries.response['400']>;
export type GetTokenVolumeTimeSeriesResponse404 = FromSchema<typeof schemas.GetTokenVolumeTimeSeries.response['404']>;
export type GetTokenVolumeTimeSeriesResponse500 = FromSchema<typeof schemas.GetTokenVolumeTimeSeries.response['500']>;
export type GetTokensSummaryMetadataParam = FromSchema<typeof schemas.GetTokensSummary.metadata>;
export type GetTokensSummaryResponse200 = FromSchema<typeof schemas.GetTokensSummary.response['200']>;
export type GetTokensSummaryResponse400 = FromSchema<typeof schemas.GetTokensSummary.response['400']>;
export type GetTokensSummaryResponse404 = FromSchema<typeof schemas.GetTokensSummary.response['404']>;
export type GetTokensSummaryResponse500 = FromSchema<typeof schemas.GetTokensSummary.response['500']>;
export type GetTopHoldersMetadataParam = FromSchema<typeof schemas.GetTopHolders.metadata>;
export type GetTopHoldersResponse200 = FromSchema<typeof schemas.GetTopHolders.response['200']>;
export type GetTopHoldersResponse400 = FromSchema<typeof schemas.GetTopHolders.response['400']>;
export type GetTopHoldersResponse404 = FromSchema<typeof schemas.GetTopHolders.response['404']>;
export type GetTopHoldersResponse500 = FromSchema<typeof schemas.GetTopHolders.response['500']>;
export type GetTradeDataProgramMetadataParam = FromSchema<typeof schemas.GetTradeDataProgram.metadata>;
export type GetTradeDataProgramResponse200 = FromSchema<typeof schemas.GetTradeDataProgram.response['200']>;
export type GetTradeDataProgramResponse400 = FromSchema<typeof schemas.GetTradeDataProgram.response['400']>;
export type GetTradeDataProgramResponse500 = FromSchema<typeof schemas.GetTradeDataProgram.response['500']>;
export type GetWalletNftsMetadataParam = FromSchema<typeof schemas.GetWalletNfts.metadata>;
export type GetWalletNftsResponse200 = FromSchema<typeof schemas.GetWalletNfts.response['200']>;
export type GetWalletNftsResponse400 = FromSchema<typeof schemas.GetWalletNfts.response['400']>;
export type GetWalletNftsResponse500 = FromSchema<typeof schemas.GetWalletNfts.response['500']>;
export type GetWalletPnlMetadataParam = FromSchema<typeof schemas.GetWalletPnl.metadata>;
export type GetWalletPnlResponse200 = FromSchema<typeof schemas.GetWalletPnl.response['200']>;
export type GetWalletPnlResponse400 = FromSchema<typeof schemas.GetWalletPnl.response['400']>;
export type GetWalletPnlResponse403 = FromSchema<typeof schemas.GetWalletPnl.response['403']>;
export type GetWalletPnlResponse500 = FromSchema<typeof schemas.GetWalletPnl.response['500']>;
export type GetWalletTokensMetadataParam = FromSchema<typeof schemas.GetWalletTokens.metadata>;
export type GetWalletTokensResponse200 = FromSchema<typeof schemas.GetWalletTokens.response['200']>;
export type GetWalletTokensResponse400 = FromSchema<typeof schemas.GetWalletTokens.response['400']>;
export type GetWalletTokensResponse500 = FromSchema<typeof schemas.GetWalletTokens.response['500']>;
export type GetWalletTokensTsMetadataParam = FromSchema<typeof schemas.GetWalletTokensTs.metadata>;
export type GetWalletTokensTsResponse200 = FromSchema<typeof schemas.GetWalletTokensTs.response['200']>;
export type GetWalletTokensTsResponse400 = FromSchema<typeof schemas.GetWalletTokensTs.response['400']>;
export type GetWalletTokensTsResponse500 = FromSchema<typeof schemas.GetWalletTokensTs.response['500']>;
export type PostWalletNftsManyBodyParam = FromSchema<typeof schemas.PostWalletNftsMany.body>;
export type PostWalletNftsManyResponse200 = FromSchema<typeof schemas.PostWalletNftsMany.response['200']>;
export type PostWalletNftsManyResponse400 = FromSchema<typeof schemas.PostWalletNftsMany.response['400']>;
export type PostWalletNftsManyResponse500 = FromSchema<typeof schemas.PostWalletNftsMany.response['500']>;
export type PostWalletTokensManyBodyParam = FromSchema<typeof schemas.PostWalletTokensMany.body>;
export type PostWalletTokensManyResponse200 = FromSchema<typeof schemas.PostWalletTokensMany.response['200']>;
export type PostWalletTokensManyResponse400 = FromSchema<typeof schemas.PostWalletTokensMany.response['400']>;
export type PostWalletTokensManyResponse500 = FromSchema<typeof schemas.PostWalletTokensMany.response['500']>;
export type PostWalletTokensTsManyBodyParam = FromSchema<typeof schemas.PostWalletTokensTsMany.body>;
export type PostWalletTokensTsManyResponse200 = FromSchema<typeof schemas.PostWalletTokensTsMany.response['200']>;
export type PostWalletTokensTsManyResponse400 = FromSchema<typeof schemas.PostWalletTokensTsMany.response['400']>;
export type PostWalletTokensTsManyResponse500 = FromSchema<typeof schemas.PostWalletTokensTsMany.response['500']>;
export type RankingMetadataParam = FromSchema<typeof schemas.Ranking.metadata>;
export type RankingResponse200 = FromSchema<typeof schemas.Ranking.response['200']>;
export type RankingResponse400 = FromSchema<typeof schemas.Ranking.response['400']>;
export type RankingResponse404 = FromSchema<typeof schemas.Ranking.response['404']>;
export type RankingResponse500 = FromSchema<typeof schemas.Ranking.response['500']>;
