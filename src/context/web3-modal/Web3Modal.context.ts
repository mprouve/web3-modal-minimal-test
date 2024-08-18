import { createContext } from 'react';

export interface IWeb3ModalContext {
  connectViaWeb3Modal: () => void;
  web3ModalIsOpen: boolean;
  setWeb3ModalIsOpen: (web3ModalIsOpen: boolean) => void;
  web3ModalError: string;
  setWeb3ModalError: (web3ModalError: string) => void;
}

export const initialContext: IWeb3ModalContext = {
  connectViaWeb3Modal: () => undefined,
  web3ModalIsOpen: false,
  setWeb3ModalIsOpen: () => undefined,
  web3ModalError: '',
  setWeb3ModalError: () => undefined,
};

const Web3ModalContext = createContext<IWeb3ModalContext>(initialContext);

Web3ModalContext.displayName = 'Web3ModalContext';

export default Web3ModalContext;
