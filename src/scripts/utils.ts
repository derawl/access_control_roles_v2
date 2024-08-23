import { Contract, PopulatedTransaction, ethers } from "ethers";
import { MetaTransaction, encodeMulti } from "ethers-multisend";

export enum OperationType {
  Call,
  DelegateCall,
}

export enum ExecutionOptions {
  None,
  Send,
  DelegateCall,
  Both,
}

export interface MetaTransactionData {
  to: string;
  value: string;
  data: string;
  operation?: OperationType;
}

// Encodes multiple transactions so we can then use a Safe with multisend for atomic transacting
export function createMultisendTx(
  populatedTxs: PopulatedTransaction[],
  multisendAddr: string,
): MetaTransaction {
  // console.log("encoding data");
  const safeTransactionData: MetaTransactionData[] = populatedTxs.map(
    (popTx) => ({
      to: popTx.to as string,
      value: popTx.value ? popTx.value.toString() : "0",
      data: popTx.data as string,
    }),
  );

  // console.log({ safeTransactionData });

  return encodeMulti(safeTransactionData, multisendAddr);
}

// When we have a single owner on a safe, the output of this function can be used as the signature parameter on a execTransaction call on a safe
export const getPreValidatedSignatures = (
  from: string,
  initialString = "0x",
): string => {
  return `${initialString}000000000000000000000000${from.replace(
    "0x",
    "",
  )}000000000000000000000000000000000000000000000000000000000000000001`;
};

// roles.scopeTarget helper function
export async function scopeTargets(
  targetAddrs: string[],
  roleId: number,
  roles: Contract,
) {
  const scopeTargetTxs = await Promise.all(
    targetAddrs.map(async (target) => {
      //Before granular function/parameter whitelisting can occur, you need to bring a target contract into 'scope' via scopeTarget
      const tx = await roles.populateTransaction.scopeTarget(roleId, target);
      return tx;
    }),
  );
  return scopeTargetTxs;
}

// Helper to allows function calls without param scoping
export async function scopeAllowFunctions(
  target: string,
  sigs: string[],
  roleId: number,
  roles: Contract,
) {
  const scopeFuncsTxs = await Promise.all(
    sigs.map(async (sig) => {
      // scopeAllowFunction on Roles allows a role member to call the function in question with no paramter scoping
      const tx = await roles.populateTransaction.scopeAllowFunction(
        roleId,
        target,
        sig,
        ExecutionOptions.Both,
      );
      return tx;
    }),
  );
  return scopeFuncsTxs;
}

export const getABICodedAddress = (address: string) => {
  return ethers.utils.defaultAbiCoder.encode(["address"], [address]);
};

export function numberToBytes32(num) {
  // Convert the number to a hex string
  let hexString = ethers.utils.hexlify(num);

  // Remove the "0x" prefix
  hexString = hexString.slice(2);

  // Pad the hex string to make sure it's 64 characters long (32 bytes)
  const paddedHexString = hexString.padStart(64, "0");

  // Add the "0x" prefix back
  return "0x" + paddedHexString;
}
