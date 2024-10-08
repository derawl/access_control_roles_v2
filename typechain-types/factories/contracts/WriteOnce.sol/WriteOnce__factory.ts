/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  WriteOnce,
  WriteOnceInterface,
} from "../../../contracts/WriteOnce.sol/WriteOnce";

const _abi = [
  {
    inputs: [],
    name: "SALT",
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
  {
    inputs: [],
    name: "SINGLETON_FACTORY",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c0610034600b8282823980515f1a60731461002857634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603c575f3560e01c8063ba9a91a5146040578063cf8a37af146059575b5f80fd5b60465f81565b6040519081526020015b60405180910390f35b607373ce0042b868300000d44a59004da54a005ffdcf9f81565b6040516001600160a01b039091168152602001605056fea2646970667358221220b64b086e93322bd50175a3915a0ba3375242c29919136983856c456ee383e90664736f6c63430008150033";

type WriteOnceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WriteOnceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WriteOnce__factory extends ContractFactory {
  constructor(...args: WriteOnceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WriteOnce> {
    return super.deploy(overrides || {}) as Promise<WriteOnce>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WriteOnce {
    return super.attach(address) as WriteOnce;
  }
  override connect(signer: Signer): WriteOnce__factory {
    return super.connect(signer) as WriteOnce__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WriteOnceInterface {
    return new utils.Interface(_abi) as WriteOnceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WriteOnce {
    return new Contract(address, _abi, signerOrProvider) as WriteOnce;
  }
}
