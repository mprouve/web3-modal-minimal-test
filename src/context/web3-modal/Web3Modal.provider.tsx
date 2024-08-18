import {
  FC,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalError,
  useWeb3ModalState,
} from "@web3modal/ethers/react";
import Web3ModalContext, {
  initialContext,
  IWeb3ModalContext,
} from "../../context/web3-modal/Web3Modal.context";
import { web3ModalConfig } from "../../modules/web3-modal/config";
// import { createWeb3ModalInstance } from 'src/modules/web3-modal/config';
import { logMain } from "../../modules/logger/logger";

logMain.debug(
  "[WEB3 MODAL]: Initializing Web3 Modal Instance:",
  web3ModalConfig
);

// Initialize Web3Modal instance
createWeb3Modal(web3ModalConfig);

interface Web3ModalProviderProps {
  children: ReactNode;
}

const Web3ModalProvider: FC<Web3ModalProviderProps> = ({ children }) => {
  const { open } = useWeb3Modal();
  //   const events = useWeb3ModalEvents();
  const { open: modalStateIsOpen } = useWeb3ModalState();
  const { error: modalError } = useWeb3ModalError();
  const [web3ModalIsOpen, setWeb3ModalIsOpen] = useState<
    IWeb3ModalContext["web3ModalIsOpen"]
  >(initialContext.web3ModalIsOpen);
  const [web3ModalError, setWeb3ModalError] = useState<
    IWeb3ModalContext["web3ModalError"]
  >(initialContext.web3ModalError);

  // Listen for Web3Modal Events
  //   useEffect(() => {
  //     logMain.debug('[WEB3 MODAL]: EVENTS:', events);
  //   }, [events]);

  // Set the Web3Modal Open / Closed State
  useEffect(() => {
    setWeb3ModalIsOpen(modalStateIsOpen);
  }, [modalStateIsOpen]);

  // Set the Web3Modal Error State
  useEffect(() => {
    if (modalError) {
      logMain.debug(
        `[WEB3 MODAL]: ERROR: ${modalError.toString()}`,
        modalError
      );

      setWeb3ModalError(modalError.toString());
    }
  }, [modalError]);

  // FUNCTION: Open the Web3Modal
  const connectViaWeb3Modal = useCallback(() => {
    logMain.debug("[WEB3 MODAL]: 'Connect' button clicked!");

    open({ view: "Connect" });
  }, [open]);

  const value = useMemo(
    () => ({
      connectViaWeb3Modal,
      web3ModalIsOpen,
      setWeb3ModalIsOpen,
      web3ModalError,
      setWeb3ModalError,
    }),
    [connectViaWeb3Modal, web3ModalIsOpen, web3ModalError, setWeb3ModalError]
  );

  return (
    <Web3ModalContext.Provider value={value}>
      {children}
    </Web3ModalContext.Provider>
  );
};

export default Web3ModalProvider;
