import {
  type SIWESession,
  type SIWEVerifyMessageArgs,
  type SIWECreateMessageArgs,
  createSIWEConfig,
  formatMessage,
} from "@web3modal/siwe";
import { baseMainnet, baseSepoliaTestnet } from "../../constants/chains";
// import { PooleEvents } from 'src/modules/poole/events';
// import store from 'src/redux/store';
// import { siweNonce } from 'src/api/auth/siwe-nonce';
// import { siweFinish } from 'src/api/auth/siwe-finish';
// import { siweSession } from 'src/api/auth/siwe-session';
// import { logout } from 'src/api/auth/logout';
// import isLocalSessionHealthy from 'src/tools/isLocalSessionHealthy';
// import isLocalSessionValid from 'src/tools/isLocalSessionValid';
// import processNewLogin from 'src/tools/processNewLogin';
// import { config } from 'src/config/config';
import { logMain } from "../../modules/logger/logger";

// FUNCTION: Get message params
const getMessageParams = () => {
  logMain.debug("[SIWE]: Retrieving message params...");

  const messageParams = {
    domain:
      window.location.host.indexOf(":") !== -1
        ? window.location.host.split(":")[0]
        : window.location.host,
    uri: window.location.origin,
    chains: [baseMainnet.chainId, baseSepoliaTestnet.chainId],
    statement: "Please sign with your account",
  };

  logMain.debug(
    "[SIWE]: Successfully retrieved message params!",
    messageParams
  );

  return Promise.resolve(messageParams);
};

// FUNCTION: Get the nonce
const getNonce = () => {
  logMain.debug("[SIWE]: Retrieving nonce...");

  return Promise.resolve("");

  // const { dispatch } = store;

  // return dispatch(siweNonce())
  //   .then(data => {
  //     logMain.debug('[SIWE]: Successfully retrieved nonce!');

  //     return data?.nonce || '';
  //   })
  //   .catch(e => {
  //     logMain.error('[SIWE]: Failed to retrieve nonce.', e);

  //     return '';
  //   });
};

// FUNCTION: Create the message using the previously retrieved Nonce and available args
const createMessage = ({ address, ...args }: SIWECreateMessageArgs) => {
  logMain.debug("[SIWE]: Formatting message...");

  const formattedMessage = formatMessage(args, address);

  logMain.debug("[SIWE]: Successfully formatted message!", formattedMessage);

  return formattedMessage;
};

// FUNCTION: Returns the user's session
const getSession = () => {
  logMain.debug("[SIWE]: Retrieving session...");

  // const { dispatch } = store;

  // if (isLocalSessionHealthy() && isLocalSessionValid()) {
  //   return dispatch(siweSession())
  //     .then(data => {
  //       const sessionData: SIWESession = {
  //         address: data?.walletAddress,
  //         chainId: data?.chainId,
  //       };

  //       logMain.debug('[SIWE]: Successfully retrieved session!', sessionData);

  //       return sessionData;
  //     })
  //     .catch(e => {
  //       logMain.error('[SIWE]: Failed to retrieve session.', e);

  //       return null;
  //     });
  // }

  logMain.debug("[SIWE]: No session / invalid session found.");

  return Promise.resolve(null);
};

// FUNCTION: Verify if message and signature are valid
const verifyMessage = ({ message, signature }: SIWEVerifyMessageArgs) => {
  logMain.debug("[SIWE]: Verifying message...", message, signature);

  return Promise.resolve(true);

  // const { dispatch } = store;

  // return dispatch(siweFinish({ data: { siweMessage: message, signature } }))
  //   .then(data => {
  //     logMain.debug('[SIWE]: Successfully verified message!');

  //     processNewLogin(data, false);

  //     return true;
  //   })
  //   .catch(e => {
  //     logMain.error('[SIWE]: Failed to verify message.', e);

  //     return false;
  //   });
};

// FUNCTION: Sign out
const signOut = () => {
  logMain.debug("[SIWE]: Signing out...");

  return Promise.resolve(true);

  // const { dispatch } = store;

  // return dispatch(logout())
  //   .then(() => {
  //     return true;
  //   })
  //   .catch(e => {
  //     logMain.error('[SIWE]: Endpoint /auth/logout failed. Error logging out:', e);

  //     return false;
  //   });
};

// FUNCTION: On sign in
const onSignIn = (session?: SIWESession) => {
  logMain.debug("[SIWE]: Successfully signed in!", session);
};

// FUNCTION: On sign out
const onSignOut = () => {
  logMain.debug("[SIWE]: Successfully signed out!");
};

export const siweConfig = createSIWEConfig({
  getMessageParams,
  getNonce,
  createMessage,
  getSession,
  verifyMessage,
  signOut,
  onSignIn,
  onSignOut,
  nonceRefetchIntervalMs: 30000,
  sessionRefetchIntervalMs: 30000,
  signOutOnDisconnect: true,
  signOutOnNetworkChange: true,
  signOutOnAccountChange: true,
});
