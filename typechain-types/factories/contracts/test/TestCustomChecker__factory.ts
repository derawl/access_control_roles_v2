/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestCustomChecker,
  TestCustomCheckerInterface,
} from "../../../contracts/test/TestCustomChecker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "location",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        internalType: "bytes12",
        name: "extra",
        type: "bytes12",
      },
    ],
    name: "check",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "reason",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f80fd5b5061027d8061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063b0acb9801461002d575b5f80fd5b61004061003b366004610105565b61005b565b60408051921515835260208301919091520160405180910390f35b5f808088868961006b88836101ca565b92610078939291906101ef565b61008191610216565b90505f87600181111561009657610096610233565b146100a757505f91508190506100ce565b60648111156100bd5750600191505f90506100ce565b505f9150506001600160a01b031982165b9850989650505050505050565b8035600281106100e9575f80fd5b919050565b80356001600160a01b0319811681146100e9575f80fd5b5f805f805f805f8060e0898b03121561011c575f80fd5b88356001600160a01b0381168114610132575f80fd5b975060208901359650604089013567ffffffffffffffff80821115610155575f80fd5b818b0191508b601f830112610168575f80fd5b813581811115610176575f80fd5b8c6020828501011115610187575f80fd5b60208301985080975050505061019f60608a016100db565b93506080890135925060a089013591506101bb60c08a016100ee565b90509295985092959890939650565b808201808211156101e957634e487b7160e01b5f52601160045260245ffd5b92915050565b5f80858511156101fd575f80fd5b83861115610209575f80fd5b5050820193919092039150565b803560208310156101e9575f19602084900360031b1b1692915050565b634e487b7160e01b5f52602160045260245ffdfea2646970667358221220d4cc46440212a02035419ca6f34f8b84903a31430c39a04e192cee571a1aa38f64736f6c63430008150033";

type TestCustomCheckerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestCustomCheckerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestCustomChecker__factory extends ContractFactory {
  constructor(...args: TestCustomCheckerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestCustomChecker> {
    return super.deploy(overrides || {}) as Promise<TestCustomChecker>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestCustomChecker {
    return super.attach(address) as TestCustomChecker;
  }
  override connect(signer: Signer): TestCustomChecker__factory {
    return super.connect(signer) as TestCustomChecker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestCustomCheckerInterface {
    return new utils.Interface(_abi) as TestCustomCheckerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestCustomChecker {
    return new Contract(address, _abi, signerOrProvider) as TestCustomChecker;
  }
}
