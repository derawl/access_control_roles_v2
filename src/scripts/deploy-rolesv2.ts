import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  MANAGER_ROLE_ID,
  MULTISEND_ADDR,
  ROLES_V2_MASTER_COPY_ADDR,
  SAFE_MODULE_PROXY_FACTORY_ADDR,
  SAFE_OPERATION_DELEGATECALL,
  SECURITY_ROLE_ID,
  tx,
} from "./constants";
import SAFE_MASTER_COPY_ABI from "../abi/SafeMasterCopy.json";
import SAFE_MODULE_PROXY_FACTORY_ABI from "../abi/SafeModuleProxyFactory.json";
import ROLES_V2_MASTER_COPY_ABI from "../abi/RolesV2.json";
import {
  createMultisendTx,
  getPreValidatedSignatures,
  numberToBytes32,
} from "./utils";
import { AccessControllerWhitelist } from "../whitelist/acs/scope-access-controller";
import colors from "colors";
import {
  addSafeSigners,
  deploySafe,
  removeDeployerAsOwner,
} from "./deploy-safe";
import { deployViaFactory, calculateDeployAddress } from "./EIP2470";

//@dev note that hardhat struggles with nested contracts. When we call a Safe to interact with Roles, only events from the Safe can be detected.

const hre: HardhatRuntimeEnvironment = require("hardhat");

const ZeroHash =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const SaltZero =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export async function deployRolesV2(
  owner: string,
  avatar: string,
  target: string,
  proxied: boolean,
) {
  const [caller] = await hre.ethers.getSigners();
  if (proxied) {
    const abiCoder = hre.ethers.utils.defaultAbiCoder;
    const encoded = abiCoder.encode(
      ["address", "address", "address"],
      [owner, avatar, target],
    );
    const rolesMaster = new hre.ethers.Contract(
      ROLES_V2_MASTER_COPY_ADDR,
      ROLES_V2_MASTER_COPY_ABI,
      caller,
    );
    const initParams = await rolesMaster.populateTransaction.setUp(encoded);
    const tsSalt = new Date().getTime();
    const safeModuleProxyFactory = new hre.ethers.Contract(
      SAFE_MODULE_PROXY_FACTORY_ADDR,
      SAFE_MODULE_PROXY_FACTORY_ABI,
      caller,
    );

    const deployModTx = await safeModuleProxyFactory.deployModule(
      ROLES_V2_MASTER_COPY_ADDR,
      initParams.data as string,
      tsSalt,
    );
    const txReceipt = await deployModTx.wait();
    const txData = txReceipt.events?.find(
      (x: any) => x.event == "ModuleProxyCreation",
    );
    const rolesModAddress = txData?.args?.proxy;
    console.info(
      colors.green(
        `✅ Roles was deployed via proxy factory to ${rolesModAddress}`,
      ),
    );
    return rolesModAddress;
  }
  //   const Permissions = await hre.ethers.getContractFactory("Permissions");
  //   const permissions = await Permissions.deploy();
  const salt = ZeroHash;

  const Packer = await hre.ethers.getContractFactory("Packer");
  const packerLibraryAddress = await deployViaFactory(
    Packer.bytecode,
    salt,
    caller,
    "Packer",
  );

  const Integrity = await hre.ethers.getContractFactory("Integrity");
  const integrityLibraryAddress = await deployViaFactory(
    Integrity.bytecode,
    salt,
    caller,
    "Integrity",
  );
  const Roles = await hre.ethers.getContractFactory("Roles", {
    libraries: {
      Integrity: integrityLibraryAddress,
      Packer: packerLibraryAddress,
    },
  });

  console.log(owner);
  const roles = await Roles.deploy(owner, avatar, target);
  await roles.connect(caller).deployed();

  //   const rolesAddress = await deployRolesV2(owner, avatar, target, proxied);
  console.info("Modifier deployed to:", roles.address, "\n");
  return roles.address;
}

//If the roles module is not already enabled on Safe, enable it
export async function enableRolesModifier(safeAddr: string, rolesAddr: string) {
  const [caller] = await hre.ethers.getSigners();
  const signature = getPreValidatedSignatures(caller.address);

  //investment safe
  const invSafe = new hre.ethers.Contract(
    safeAddr,
    SAFE_MASTER_COPY_ABI,
    caller,
  );

  const enabled = await invSafe.isModuleEnabled(rolesAddr);

  if (!enabled) {
    const enable = await invSafe.populateTransaction.enableModule(rolesAddr);
    const enableTx = await invSafe.execTransaction(
      safeAddr,
      tx.zeroValue,
      enable.data ?? "",
      tx.operation,
      tx.avatarTxGas,
      tx.baseGas,
      tx.gasPrice,
      tx.gasToken,
      tx.refundReceiver,
      signature,
    );
    const txReceipt = await enableTx.wait();
    const txData = txReceipt.events?.find(
      (x: any) => x.event == "EnabledModule",
    );
    const moduleEnabledFromEvent = txData?.args?.module;
    console.info(
      colors.blue(
        `ℹ️  Roles modifier: ${moduleEnabledFromEvent} has been enabled on safe: ${safeAddr}`,
      ),
    );
  } else {
    console.info(
      `Roles modifier: ${rolesAddr} was already enabled on safe: ${safeAddr}`,
    );
  }
}

// sets the address of the multisend contract
export async function setRolesMultisend(safeAddr: string, rolesAddr: string) {
  const [caller] = await hre.ethers.getSigners();
  const roles = new hre.ethers.Contract(
    rolesAddr,
    ROLES_V2_MASTER_COPY_ABI,
    caller,
  );
  const multisendOnRecord = await roles.multisend();
  //If no MS on record, submit a tx to write one on record
  if (multisendOnRecord === hre.ethers.constants.AddressZero) {
    const setMsPopTx =
      await roles.populateTransaction.setMultisend(MULTISEND_ADDR);

    const safe = new hre.ethers.Contract(
      safeAddr,
      SAFE_MASTER_COPY_ABI,
      caller,
    );
    const signature = getPreValidatedSignatures(caller.address);
    await safe.execTransaction(
      rolesAddr,
      tx.zeroValue,
      setMsPopTx.data,
      tx.operation,
      tx.avatarTxGas,
      tx.baseGas,
      tx.gasPrice,
      tx.gasToken,
      tx.refundReceiver,
      signature,
    );
    console.info(
      colors.blue(`ℹ️  Multisend has been set to: ${MULTISEND_ADDR}`),
    );
  } else {
    console.info(
      `Multisend has already been previously set to: ${multisendOnRecord}`,
    );
  }
}

export async function setRolesUnwrapper(safeAddr: string, rolesAddr: string) {
  const [caller] = await hre.ethers.getSigners();

  const roles = new hre.ethers.Contract(
    rolesAddr,
    ROLES_V2_MASTER_COPY_ABI,
    caller,
  );

  const MultiSend = await hre.ethers.getContractFactory("MultiSend");
  // const multisend = await MultiSend.deploy();

  const MultiSendUnwrapper =
    await hre.ethers.getContractFactory("MultiSendUnwrapper");

  const adapter = await MultiSendUnwrapper.deploy();

  const setMsPopTx = await roles.populateTransaction.setTransactionUnwrapper(
    MULTISEND_ADDR,
    MultiSend.interface.getSighash(
      MultiSend.interface.getFunction("multiSend"),
    ),
    adapter.address,
  );

  const safe = new hre.ethers.Contract(safeAddr, SAFE_MASTER_COPY_ABI, caller);
  const signature = getPreValidatedSignatures(caller.address);
  await safe.execTransaction(
    rolesAddr,
    tx.zeroValue,
    setMsPopTx.data,
    tx.operation,
    tx.avatarTxGas,
    tx.baseGas,
    tx.gasPrice,
    tx.gasToken,
    tx.refundReceiver,
    signature,
  );

  console.info(colors.blue(`ℹ️  Multisend has been set to: ${MULTISEND_ADDR}`));

  // await roles
  //   .connect(caller)
  //   .setTransactionUnwrapper(
  //     multisend.address,
  //     multisend.interface.getSighash(
  //       multisend.interface.getFunction("multiSend"),
  //     ),
  //     adapter.address,
  //   );

  return { adapter };
}

// assign a role to a array of members addresses attached to a role id policy
export async function assignRoles(
  safeAddr: string,
  rolesAddr: string,
  memberAddrs: string[],
  roleId: number,
) {
  const [caller] = await hre.ethers.getSigners();
  // assign manager a role (becomes a member of role:manager_role_id)
  const roles = new hre.ethers.Contract(
    rolesAddr,
    ROLES_V2_MASTER_COPY_ABI,
    caller,
  );
  const signature = getPreValidatedSignatures(caller.address);
  const acSafe = new hre.ethers.Contract(
    safeAddr,
    SAFE_MASTER_COPY_ABI,
    caller,
  );

  const assignRolesPopTx = await Promise.all(
    memberAddrs.map(async (memberAddr) => {
      return await roles.populateTransaction.assignRoles(
        memberAddr,
        [numberToBytes32(roleId)],
        [true],
      );
    }),
  );
  // const assignRolesPopTx = await roles.populateTransaction.assignRoles(
  //   memberAddrs[0],
  //   [numberToBytes32(roleId)],
  //   [true],
  // );
  const metaTxs = createMultisendTx(assignRolesPopTx, MULTISEND_ADDR);
  const assignRolesTx = await acSafe.execTransaction(
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

  console.info(
    colors.blue(
      `Role member: ${memberAddrs.toString()} has been assigned role id: ${MANAGER_ROLE_ID}`,
    ),
  );
}

// this will deploy the entire system from scratch, WITHOUT any investment manager permissions
export const deployAccessControlSystemV2 = async (
  options: {
    proxied: boolean;
    sysAdminAddresses: string[];
    acSafeThreshold: number;
    invSafeThreshold: number;
    securityEOAs: string[];
    managerEOAs: string[];
  },
  deployed?: {
    acSafeAddr: string | null;
    invSafeAddr: string | null;
    invRolesAddr: string | null;
    acRolesAddr: string | null;
  },
) => {
  //Deploy both safes
  const accessControlSafeAddr = deployed?.acSafeAddr || (await deploySafe());
  const investmentSafeAddr = deployed?.invSafeAddr || (await deploySafe());

  // //Deploy and enable a Roles modifier on the investment safe
  const invRolesAddr =
    deployed?.invRolesAddr ||
    (await deployRolesV2(
      accessControlSafeAddr,
      investmentSafeAddr,
      investmentSafeAddr,
      options.proxied,
    ));
  await enableRolesModifier(investmentSafeAddr, invRolesAddr);
  //Set the multisend address on roles so that manager can send multisend txs later on
  // await setRolesMultisend(accessControlSafeAddr, invRolesAddr);
  await setRolesUnwrapper(accessControlSafeAddr, invRolesAddr);

  //Deploy and enable a Roles modifier on the access control safe
  const acRolesAddr =
    deployed?.acRolesAddr ||
    (await deployRolesV2(
      accessControlSafeAddr,
      accessControlSafeAddr,
      accessControlSafeAddr,
      options.proxied,
    ));
  await enableRolesModifier(accessControlSafeAddr, acRolesAddr);

  // //Set the multisend address on roles so that manager can send multisend txs later on
  // // await setRolesMultisend(accessControlSafeAddr, acRolesAddr);

  await setRolesUnwrapper(accessControlSafeAddr, acRolesAddr);

  // //Grant an access controller role to Security EOA's
  await assignRoles(
    accessControlSafeAddr,
    acRolesAddr,
    options.securityEOAs,
    SECURITY_ROLE_ID,
  );
  // // Populate this role for Security so they can call whitelisting related functions on investment roles
  const [caller] = await hre.ethers.getSigners();
  // const accessControllerWhitelist = new AccessControllerWhitelist(
  //   acRolesAddr,
  //   caller,
  // );
  // await accessControllerWhitelist.execute(invRolesAddr, accessControlSafeAddr);

  //Grant a role to the investment managers EOAs
  //the idea would be that each strategy would be transacted on by 1 EOA
  await assignRoles(
    accessControlSafeAddr,
    invRolesAddr,
    options.managerEOAs,
    MANAGER_ROLE_ID,
  );

  // // Add signers
  await addSafeSigners(investmentSafeAddr, options.sysAdminAddresses);
  await addSafeSigners(accessControlSafeAddr, options.sysAdminAddresses);

  // //Remove the deployer address as owner and rewrite signing threshold
  // await removeDeployerAsOwner(investmentSafeAddr, options.invSafeThreshold);
  // await removeDeployerAsOwner(accessControlSafeAddr, options.acSafeThreshold);

  return {
    acSafe: accessControlSafeAddr,
    invSafe: investmentSafeAddr,
    invRoles: invRolesAddr,
    acRoles: acRolesAddr,
  };
};
