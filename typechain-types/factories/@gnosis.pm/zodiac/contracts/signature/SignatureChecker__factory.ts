/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  SignatureChecker,
  SignatureCheckerInterface,
} from "../../../../../@gnosis.pm/zodiac/contracts/signature/SignatureChecker";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "moduleTxHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class SignatureChecker__factory {
  static readonly abi = _abi;
  static createInterface(): SignatureCheckerInterface {
    return new utils.Interface(_abi) as SignatureCheckerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignatureChecker {
    return new Contract(address, _abi, signerOrProvider) as SignatureChecker;
  }
}
