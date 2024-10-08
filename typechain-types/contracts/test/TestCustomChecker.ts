/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface TestCustomCheckerInterface extends utils.Interface {
  functions: {
    "check(address,uint256,bytes,uint8,uint256,uint256,bytes12)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "check"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "check",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "check", data: BytesLike): Result;

  events: {};
}

export interface TestCustomChecker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestCustomCheckerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    check(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      operation: PromiseOrValue<BigNumberish>,
      location: PromiseOrValue<BigNumberish>,
      size: PromiseOrValue<BigNumberish>,
      extra: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { success: boolean; reason: string }>;
  };

  check(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    operation: PromiseOrValue<BigNumberish>,
    location: PromiseOrValue<BigNumberish>,
    size: PromiseOrValue<BigNumberish>,
    extra: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[boolean, string] & { success: boolean; reason: string }>;

  callStatic: {
    check(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      operation: PromiseOrValue<BigNumberish>,
      location: PromiseOrValue<BigNumberish>,
      size: PromiseOrValue<BigNumberish>,
      extra: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { success: boolean; reason: string }>;
  };

  filters: {};

  estimateGas: {
    check(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      operation: PromiseOrValue<BigNumberish>,
      location: PromiseOrValue<BigNumberish>,
      size: PromiseOrValue<BigNumberish>,
      extra: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    check(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      operation: PromiseOrValue<BigNumberish>,
      location: PromiseOrValue<BigNumberish>,
      size: PromiseOrValue<BigNumberish>,
      extra: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
