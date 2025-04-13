const vybeApi = require('@api/vybe-api'); // Assuming you have a vybe-api package

const API_KEY = process.env.VYBE_API_KEY;

const getTokenData = async (mintAddress) => {
    try {
        vybeApi.auth(API_KEY); // Authenticate with the API key
        const response = await vybeApi.get_token_details({ mintAddress: mintAddress }); // Await the promise
        console.log(response.data); // Log the data
        return response.data; // Return the data
    } catch (error) {
        throw new Error('Failed to fetch token data: ' + error.message); // Include error details
    }
};


const getWalletData = async (walletAddress) => {
    try {
        vybeApi.auth(API_KEY); // Authenticate with the API key
        const response = await vybeApi.get_wallet_tokens({ ownerAddress: walletAddress }); // Await the promise
        console.log(response.data); // Log the data
        return response.data; // Return the data
    } catch (error) {
        throw new Error('Failed to fetch wallet data: ' + error.message); // Include error details
    }
}


module.exports = { getTokenData };
