/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockERC721,
  MockERC721Interface,
} from "../../../contracts/test/MockERC721";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "someParam",
        type: "uint256",
      },
    ],
    name: "doSomething",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801562000010575f80fd5b506040518060400160405280600a8152602001694d6f636b45726337323160b01b815250604051806040016040528060068152602001654e4654504f5360d01b815250815f90816200006391906200011b565b5060016200007282826200011b565b505050620001e3565b634e487b7160e01b5f52604160045260245ffd5b600181811c90821680620000a457607f821691505b602082108103620000c357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111562000116575f81815260208120601f850160051c81016020861015620000f15750805b601f850160051c820191505b818110156200011257828155600101620000fd565b5050505b505050565b81516001600160401b038111156200013757620001376200007b565b6200014f816200014884546200008f565b84620000c9565b602080601f83116001811462000185575f84156200016d5750858301515b5f19600386901b1c1916600185901b17855562000112565b5f85815260208120601f198616915b82811015620001b55788860151825594840194600190910190840162000194565b5085821015620001d357878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b610f2980620001f15f395ff3fe608060405234801561000f575f80fd5b50600436106100d2575f3560e01c80636352211e116100845780636352211e1461018157806370a082311461019457806395d89b41146101b5578063a22cb465146101bd578063b2dd1d79146101d0578063b88d4fde146101e2578063c87b56dd146101f5578063e985e9c514610208575f80fd5b806301ffc9a7146100d657806306fdde03146100fe578063081812fc14610113578063095ea7b31461013357806323b872dd1461014857806340c10f191461015b57806342842e0e1461016e575b5f80fd5b6100e96100e4366004610b89565b61021b565b60405190151581526020015b60405180910390f35b61010661026c565b6040516100f59190610bf1565b610126610121366004610c03565b6102fb565b6040516100f59190610c1a565b610146610141366004610c49565b610322565b005b610146610156366004610c71565b61032d565b610146610169366004610c49565b6103bf565b61014661017c366004610c71565b6103c9565b61012661018f366004610c03565b6103e8565b6101a76101a2366004610caa565b6103f2565b6040519081526020016100f5565b610106610437565b6101466101cb366004610cc3565b610446565b6101466101de366004610cfc565b5050565b6101466101f0366004610d30565b610451565b610106610203366004610c03565b610468565b6100e9610216366004610e05565b6104d9565b5f6001600160e01b031982166380ac58cd60e01b148061024b57506001600160e01b03198216635b5e139f60e01b145b8061026657506301ffc9a760e01b6001600160e01b03198316145b92915050565b60605f805461027a90610e36565b80601f01602080910402602001604051908101604052809291908181526020018280546102a690610e36565b80156102f15780601f106102c8576101008083540402835291602001916102f1565b820191905f5260205f20905b8154815290600101906020018083116102d457829003601f168201915b5050505050905090565b5f61030582610506565b505f828152600460205260409020546001600160a01b0316610266565b6101de82823361053e565b6001600160a01b03821661035f575f604051633250574960e11b81526004016103569190610c1a565b60405180910390fd5b5f61036b83833361054b565b9050836001600160a01b0316816001600160a01b0316146103b9576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610356565b50505050565b6101de828261063d565b6103e383838360405180602001604052805f815250610451565b505050565b5f61026682610506565b5f6001600160a01b03821661041c575f6040516322718ad960e21b81526004016103569190610c1a565b506001600160a01b03165f9081526003602052604090205490565b60606001805461027a90610e36565b6101de33838361069e565b61045c84848461032d565b6103b984848484610733565b606061047382610506565b505f61048960408051602081019091525f815290565b90505f8151116104a75760405180602001604052805f8152506104d2565b806104b184610847565b6040516020016104c2929190610e6e565b6040516020818303038152906040525b9392505050565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b5f818152600260205260408120546001600160a01b03168061026657604051637e27328960e01b815260048101849052602401610356565b6103e383838360016108d7565b5f828152600260205260408120546001600160a01b0390811690831615610577576105778184866109d2565b6001600160a01b038116156105b1576105925f855f806108d7565b6001600160a01b0381165f90815260036020526040902080545f190190555b6001600160a01b038516156105df576001600160a01b0385165f908152600360205260409020805460010190555b5f8481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6001600160a01b038216610666575f604051633250574960e11b81526004016103569190610c1a565b5f61067283835f61054b565b90506001600160a01b038116156103e3575f6040516339e3563760e11b81526004016103569190610c1a565b6001600160a01b0382166106c75781604051630b61174360e31b81526004016103569190610c1a565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b156103b957604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610775903390889087908790600401610e9c565b6020604051808303815f875af19250505080156107af575060408051601f3d908101601f191682019092526107ac91810190610ed8565b60015b61080d573d8080156107dc576040519150601f19603f3d011682016040523d82523d5f602084013e6107e1565b606091505b5080515f036108055783604051633250574960e11b81526004016103569190610c1a565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b146108405783604051633250574960e11b81526004016103569190610c1a565b5050505050565b60605f61085383610a36565b60010190505f8167ffffffffffffffff81111561087257610872610d1c565b6040519080825280601f01601f19166020018201604052801561089c576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846108a657509392505050565b80806108eb57506001600160a01b03821615155b156109a3575f6108fa84610506565b90506001600160a01b038316158015906109265750826001600160a01b0316816001600160a01b031614155b8015610939575061093781846104d9565b155b15610959578260405163a9fbf51f60e01b81526004016103569190610c1a565b81156109a15783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b50505f90815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b6109dd838383610b0d565b6103e3576001600160a01b038316610a0b57604051637e27328960e01b815260048101829052602401610356565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610356565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610a745772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610aa0576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610abe57662386f26fc10000830492506010015b6305f5e1008310610ad6576305f5e100830492506008015b6127108310610aea57612710830492506004015b60648310610afc576064830492506002015b600a83106102665760010192915050565b5f6001600160a01b03831615801590610b695750826001600160a01b0316846001600160a01b03161480610b465750610b4684846104d9565b80610b6957505f828152600460205260409020546001600160a01b038481169116145b949350505050565b6001600160e01b031981168114610b86575f80fd5b50565b5f60208284031215610b99575f80fd5b81356104d281610b71565b5f5b83811015610bbe578181015183820152602001610ba6565b50505f910152565b5f8151808452610bdd816020860160208601610ba4565b601f01601f19169290920160200192915050565b602081525f6104d26020830184610bc6565b5f60208284031215610c13575f80fd5b5035919050565b6001600160a01b0391909116815260200190565b80356001600160a01b0381168114610c44575f80fd5b919050565b5f8060408385031215610c5a575f80fd5b610c6383610c2e565b946020939093013593505050565b5f805f60608486031215610c83575f80fd5b610c8c84610c2e565b9250610c9a60208501610c2e565b9150604084013590509250925092565b5f60208284031215610cba575f80fd5b6104d282610c2e565b5f8060408385031215610cd4575f80fd5b610cdd83610c2e565b915060208301358015158114610cf1575f80fd5b809150509250929050565b5f8060408385031215610d0d575f80fd5b50508035926020909101359150565b634e487b7160e01b5f52604160045260245ffd5b5f805f8060808587031215610d43575f80fd5b610d4c85610c2e565b9350610d5a60208601610c2e565b925060408501359150606085013567ffffffffffffffff80821115610d7d575f80fd5b818701915087601f830112610d90575f80fd5b813581811115610da257610da2610d1c565b604051601f8201601f19908116603f01168101908382118183101715610dca57610dca610d1c565b816040528281528a6020848701011115610de2575f80fd5b826020860160208301375f60208483010152809550505050505092959194509250565b5f8060408385031215610e16575f80fd5b610e1f83610c2e565b9150610e2d60208401610c2e565b90509250929050565b600181811c90821680610e4a57607f821691505b602082108103610e6857634e487b7160e01b5f52602260045260245ffd5b50919050565b5f8351610e7f818460208801610ba4565b835190830190610e93818360208801610ba4565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f90610ece90830184610bc6565b9695505050505050565b5f60208284031215610ee8575f80fd5b81516104d281610b7156fea2646970667358221220f4f08cfb832d6eb248d74f5d28a1afa6b60185e40862e0af1f97b0d09fd9cea864736f6c63430008150033";

type MockERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC721__factory extends ContractFactory {
  constructor(...args: MockERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockERC721> {
    return super.deploy(overrides || {}) as Promise<MockERC721>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockERC721 {
    return super.attach(address) as MockERC721;
  }
  override connect(signer: Signer): MockERC721__factory {
    return super.connect(signer) as MockERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC721Interface {
    return new utils.Interface(_abi) as MockERC721Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockERC721 {
    return new Contract(address, _abi, signerOrProvider) as MockERC721;
  }
}
