import { defaultConfig } from "@web3modal/ethers/react";
import { baseMainnet, baseSepoliaTestnet } from "../../constants/chains";
import { siweConfig } from "../../modules/web3-modal/siwe-config";

// 1. Get projectId
const projectId = "c6ff8ac22ac51e4bfa5f07a9d374db5c";

// 2. Set / Import Chains from constants (src/constants/chains)

// 3. Create a metadata object
const metadata = {
  name: "Legendary: Heroes Unchained",
  description:
    "A hero-collector RPG game where you will own the heroes you collect.",
  url: "https://www.legendaryheroesunchained.com", // origin must match your domain & subdomain
  icons: ["https://www.legendaryheroesunchained.com/apple-touch-icon-192.png"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /* Required */
  metadata,
  /* Optional */
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: baseSepoliaTestnet.chainId, // used for the Coinbase SDK
  auth: {
    email: true,
    socials: [
      "google",
      // 'x',
      // 'github',
      // 'discord',
      // 'apple',
      "facebook",
      // 'farcaster'
    ], // add social logins
    showWallets: true,
    walletFeatures: true,
  },
});

export const web3ModalConfig = {
  ethersConfig,
  projectId,
  chains: [baseMainnet, baseSepoliaTestnet],
  termsConditionsUrl: "https://static.n3twork.com/docs/terms.html",
  privacyPolicyUrl: "https://static.n3twork.com/docs/privacy-policy.html",
  enableAnalytics: true,
  enableSwaps: true,
  enableOnramp: true,
  siweConfig,
};
