// import { allow } from "zodiac-roles-sdk/kit";
import { allow } from "defi-kit/eth";
import { BigNumberish, Contract } from "ethers";
import {
  createMultisendTx,
  ExecutionOptions,
  getPreValidatedSignatures,
  numberToBytes32,
} from "../utils";
import {
  MULTISEND_ADDR,
  tx,
  SAFE_OPERATION_DELEGATECALL,
  MANAGER_ROLE_ID,
} from "../constants";
import SAFE_MASTER_COPY_ABI from "../../abi/SafeMasterCopy.json";
import { Permissions } from "@gnosis.pm/zodiac";
import { ethers } from "hardhat";
import { Operator } from "../../../test/utils";
import { ParamType } from "@ethersproject/abi";

const scopePermission = async (options: {
  sell: (`0x${string}` | "ETH")[];
  buy?: (`0x${string}` | "ETH")[];
}) => {
  const permission = await allow.cowswap.swap({
    sell: options.sell,
    buy: options.buy,
  });
  for (const target of permission) {
    //@ts-ignore
    console.log(target);
  }
  return permission;
};

// scopePermission({
//   sell: ["ETH"],
//   buy: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
// });

export const buildScopeTxs = async (
  rolesV2: Contract,
  roleId: BigNumberish,
  options: {
    sell: (`0x${string}` | "ETH")[];
    buy?: (`0x${string}` | "ETH")[];
  },
) => {
  const permissions = await scopePermission({
    sell: options.sell,
    buy: options.buy,
  });

  const txs = [];

  console.log("preparing txs");
  // for (const permission of permissions) {
  //   console.log({ permission });
  //   //@ts-ignore
  //   if (permission && permission.signature) {
  //     console.log("scopeFunction");
  //     //@ts-ignore
  //     console.log(typeof permission.condition);
  //     //@ts-ignore
  //     const conditions = permission.condition();

  //     console.log({ conditions });

  //     //@ts-ignore
  //     // for (const condition of conditions.childen) {
  //     //   console.log(condition);
  //     // }

  //     // const condition = [
  //     //   [1, 0, 0, ethers.constants.HashZero],
  //     //   [2, 0, 0, ethers.constants.HashZero],
  //     // ];
  //     // const tx = await rolesV2.scopeFunction(
  //     //   numberToBytes32(1),
  //     //   permission.targetAddress,
  //     //   //@ts-ignore
  //     //   ethers.utils.id(permission.signature),
  //     //   //@ts-ignore
  //     //   condition,
  //     //   1,
  //     // );
  //     // console.log("a tx");
  //     // console.log({ tx });
  //     // txs.push(tx);
  //   } else {
  //     const options = permission.delegatecall || permission.send;

  //     const condition = [
  //       [1, 0, 0, ethers.constants.HashZero],
  //       [2, 0, 0, ethers.constants.HashZero],
  //     ];
  //     const tx = await rolesV2.populateTransaction.scopeFunction(
  //       numberToBytes32(roleId),
  //       permission.targetAddress,
  //       //@ts-ignore
  //       permission.selector,
  //       //@ts-ignore
  //       condition,
  //       ExecutionOptions.DelegateCall,
  //     );
  //     console.log({ tx });
  //     txs.push(tx);
  //   }
  // }

  console.log({ persmission1: permissions[0] });

  const tx = await rolesV2.populateTransaction.scopeFunction(
    numberToBytes32(MANAGER_ROLE_ID),
    permissions[0].targetAddress,
    //@ts-ignore
    permissions[0].selector,
    [
      {
        parent: 0,
        paramType: 5,
        operator: Operator.Matches,
        compValue: "0x",
      },
    ],
    ExecutionOptions.None,
  );

  txs.push(tx);
  console.log({ txs });
  return txs;
};

export const sendPermissionTx = async (
  safeAddr: string,
  rolesV2: Contract,
  roleId: BigNumberish,
  caller: any,
  options: {
    sell: (`0x${string}` | "ETH")[];
    buy?: (`0x${string}` | "ETH")[];
  },
) => {
  //   const [caller] = await hre.ethers.getSigners();
  const safe = new hre.ethers.Contract(safeAddr, SAFE_MASTER_COPY_ABI, caller);

  const scopeTxs_ = await buildScopeTxs(rolesV2, roleId, options);

  console.log("scope txs", scopeTxs_);

  const metaTxs = createMultisendTx(scopeTxs_, MULTISEND_ADDR);

  const signature = getPreValidatedSignatures(caller.address);

  console.log({ metaTxs });

  console.log(await rolesV2.owner());

  const tx_ = await safe
    .connect(caller)
    .execTransaction(
      MULTISEND_ADDR,
      tx.zeroValue,
      metaTxs.data,
      SAFE_OPERATION_DELEGATECALL,
      tx.avatarTxGas,
      tx.baseGas,
      tx.gasPrice,
      tx.gasToken,
      tx.refundReceiver,
      signature,
    );

  await tx_.wait();

  // const tx_ = await safe.execTransaction(
  //   MULTISEND_ADDR,
  //   tx.zeroValue,
  //   metaTxs.data,
  //   SAFE_OPERATION_DELEGATECALL,
  //   tx.avatarTxGas,
  //   tx.baseGas,
  //   tx.gasPrice,
  //   tx.gasToken,
  //   tx.refundReceiver,
  //   signature,
  // );

  // await tx_.wait();
};
