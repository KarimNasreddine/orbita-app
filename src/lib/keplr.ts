// Assuming you have an existing function or place where you connect to Keplr
export const connectKeplrWallet = async () => {
  if (!window.keplr) {
    console.error("Keplr extension not found.");
    return;
  }

  const chainId = "cosmoshub-4"; // Use your target chain ID
  await window.keplr.enable(chainId);
  const offlineSigner = window.keplr.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();
  const key = await window.keplr.getKey("cosmoshub-4");

  console.log("offlineSigner:", offlineSigner);
  console.log("accounts:", accounts);
  console.log("key:", key);

  if (accounts.length > 0) {
    const { address } = accounts[0];
    // Note: Keplr doesn't directly provide a "wallet name", so we use address as identifier
    return { address };
  } else {
    throw new Error("No accounts found.");
  }
};

const saveWalletDetailsToSession = async () => {
  try {
    const walletDetails = await connectKeplrWallet();
    if (walletDetails) {
      sessionStorage.setItem("walletAddress", walletDetails.address);
      // If you were able to fetch a name or any other details, save them similarly
      console.log("Wallet details saved to session storage.");
    }
  } catch (error) {
    console.error("Error saving wallet details:", error);
  }
};
