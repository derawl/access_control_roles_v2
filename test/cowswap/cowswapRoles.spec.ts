import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployAccessControlSystemV2 } from "../../src/scripts/deploy-rolesv2";
import { ethers, network } from "hardhat";
import { loadFixture } from "ethereum-waffle";
import { expect } from "chai";
import {
  buildScopeTxs,
  sendPermissionTx,
} from "../../src/scripts/cowswap/permissions";
import {
  MANAGER_ROLE_ID,
  CowswapOrderSigner,
  ZERO_VALUE,
  SAFE_OPERATION_CALL,
} from "../../src/scripts/constants";
import ROLES_V2_MASTER_COPY_ABI from "../../src/abi/RolesV2.json";
import COW_SWAP_ORDER_SIGNER_ABI from "../../src/abi/CowswapOrderSigner.json";
import { numberToBytes32 } from "../../src/scripts/utils";

describe("Access Control System V2", function () {
  let sysAdmins: SignerWithAddress;
  let securityEOAs: SignerWithAddress;
  let managerEOAs: SignerWithAddress;
  let acSafeThreshold: number;
  let invSafeThreshold: number;

  before(async function () {
    [sysAdmins, securityEOAs, managerEOAs] = await ethers.getSigners();
    acSafeThreshold = 1;
    invSafeThreshold = 1;
  });

  it("should deploy the access control system", async function () {
    console.log(sysAdmins);
    const { acSafe, invSafe, invRoles, acRoles } =
      await deployAccessControlSystemV2({
        proxied: false,
        sysAdminAddresses: [sysAdmins.address],
        acSafeThreshold,
        invSafeThreshold,
        securityEOAs: [securityEOAs.address],
        managerEOAs: [managerEOAs.address],
      });

    expect(acSafe).to.be.properAddress;
    expect(invSafe).to.be.properAddress;
    expect(invRoles).to.be.properAddress;
    expect(acRoles).to.be.properAddress;
  });

  // it should mock a cowswap trade
  it("should mock a cowswap order sign", async function () {
    const { acSafe, invSafe, invRoles, acRoles } =
      await deployAccessControlSystemV2({
        proxied: false,
        sysAdminAddresses: [sysAdmins.address],
        acSafeThreshold,
        invSafeThreshold,
        securityEOAs: [securityEOAs.address],
        managerEOAs: [managerEOAs.address],
      });

    const roles = new ethers.Contract(
      invRoles,
      ROLES_V2_MASTER_COPY_ABI,
      managerEOAs,
    );

    await sendPermissionTx(invSafe, roles, MANAGER_ROLE_ID, sysAdmins, {
      sell: ["ETH"],
      buy: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
    });

    //manager should be able to call the safe
    // const cowSwap = new ethers.Contract(
    //   CowswapOrderSigner,
    //   COW_SWAP_ORDER_SIGNER_ABI,
    // );

    // const signOrderPopTx = cowSwap.populateTransaction.signOrder(
    //   {
    //     sellToken: "ETH",
    //     buyToken: "WETH",
    //     receiver: "0x0000000000000000000000000000000000000000",
    //     sellAmount: "1000000000000000000",
    //     buyAmount: "1000000000000000000",
    //     validTo: 1666262400,
    //     appData: "0x",
    //     feeAmount: "0",
    //     kind: 0,
    //     partiallyFillable: false,
    //     sellTokenBalance: "erc20",
    //     buyTokenBalance: "erc20",
    //   },
    //   0,
    //   0,
    // );

    // const safeTx = await roles
    //   .connect(managerEOAs)
    //   .execTransactionWithRole(
    //     cowSwap.address,
    //     ZERO_VALUE,
    //     signOrderPopTx.data,
    //     SAFE_OPERATION_CALL,
    //     numberToBytes32(MANAGER_ROLE_ID),
    //     true,
    //   );

    // await safeTx.wait();
  });
});
