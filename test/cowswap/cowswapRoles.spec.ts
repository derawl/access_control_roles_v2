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

const { VIRTUAL_MAINNET_RPC, PK_ADDR } = process.env;

describe("Access Control System V2", function () {
  let sysAdmins: SignerWithAddress;
  let securityEOAs: SignerWithAddress;
  let managerEOAs: SignerWithAddress;
  let acSafeThreshold: number;
  let invSafeThreshold: number;

  let deployedSnapshot: string;
  // let deployedSnapshot: string = "0xe96454b00eccb2c7fd98507b52e44ae5359b35b8695e82207ee0a3b9f1004bd9";
  let balanceSnap: string;

  let contractsAddr: any;
  // let contractsAddr: any = {
  //   acSafe: "0x0D677532C9De71DF612FF4D1BBD9ad31B6f3BE13",
  //   invSafe: "0x862dF55Ab39f989E7e28A6ce136Da7033e14A5f9",
  //   invRoles: "0x9c60A529615074116FDEC06795a2E0371c4c4714",
  //   acRoles: "0x577496EB76AF6A63969C2F78cb22B0D76a9C7DcF"
  // };

  async function setupFixture() {
    if (!contractsAddr) {
      const base = await deployAccessControlSystemV2({
        proxied: true,
        managerEOAs: [managerEOAs.address],
        securityEOAs: [securityEOAs.address],
        invSafeThreshold: 1,
        acSafeThreshold: 1,
        sysAdminAddresses: [sysAdmins.address],
      })
      deployedSnapshot = await network.provider.send("evm_snapshot", []);
      console.log("deployedSnapshot: ", deployedSnapshot)
      contractsAddr = base
      return base
    } else {
      return contractsAddr
    }
  }

  before(async function () {
    // after deploy snapshot
    if (contractsAddr) {
      await network.provider.send("evm_revert", [deployedSnapshot]);
    }

    // send ETH to caller 
    await network.provider.request({
      method: 'tenderly_setBalance',
      params: [PK_ADDR, ethers.utils.parseEther("100").toHexString().replace("0x0", "0x")]
    })
  })

  // before(async function () {
  //   [sysAdmins, securityEOAs, managerEOAs] = await ethers.getSigners();
  //   acSafeThreshold = 1;
  //   invSafeThreshold = 1;
  // });

  beforeEach(async function () {
    // [caller, manager, dummyOwnerOne, dummyOwnerTwo, dummyOwnerThree, security] = await ethers.getSigners();

    [sysAdmins, securityEOAs, managerEOAs] = await ethers.getSigners();

    const provider = new ethers.providers.JsonRpcProvider(VIRTUAL_MAINNET_RPC);
    await provider.send("tenderly_setBalance", [managerEOAs.address, "0xDE0B6B3A7640000",]);
    await provider.send("tenderly_setBalance", [securityEOAs.address, "0xDE0B6B3A7640000",]);
    await provider.send("tenderly_setBalance", [sysAdmins.address, "0xDE0B6B3A7640000",]);
  });

  afterEach(async () => {
    if (balanceSnap) {
      await network.provider.send("evm_revert", [balanceSnap]);
    }
  })

  it("should deploy the access control system", async function () {
    console.log(sysAdmins);
    // const { acSafe, invSafe, invRoles, acRoles } =
    //   await deployAccessControlSystemV2({
    //     proxied: false,
    //     sysAdminAddresses: [sysAdmins.address],
    //     acSafeThreshold,
    //     invSafeThreshold,
    //     securityEOAs: [securityEOAs.address],
    //     managerEOAs: [managerEOAs.address],
    //   });

    const { invRoles, invSafe, acRoles, acSafe } = await loadFixture(setupFixture);

    expect(acSafe).to.be.properAddress;
    expect(invSafe).to.be.properAddress;
    expect(invRoles).to.be.properAddress;
    expect(acRoles).to.be.properAddress;
  });

  // it should mock a cowswap trade
  // it("should mock a cowswap order sign", async function () {
  //   const { acSafe, invSafe, invRoles, acRoles } =
  //     await deployAccessControlSystemV2({
  //       proxied: false,
  //       sysAdminAddresses: [sysAdmins.address],
  //       acSafeThreshold,
  //       invSafeThreshold,
  //       securityEOAs: [securityEOAs.address],
  //       managerEOAs: [managerEOAs.address],
  //     });

  //   const roles = new ethers.Contract(
  //     invRoles,
  //     ROLES_V2_MASTER_COPY_ABI,
  //     managerEOAs,
  //   );

  //   await sendPermissionTx(invSafe, roles, MANAGER_ROLE_ID, sysAdmins, {
  //     sell: ["ETH"],
  //     buy: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
  //   });

  //   //manager should be able to call the safe
  //   // const cowSwap = new ethers.Contract(
  //   //   CowswapOrderSigner,
  //   //   COW_SWAP_ORDER_SIGNER_ABI,
  //   // );

  //   // const signOrderPopTx = cowSwap.populateTransaction.signOrder(
  //   //   {
  //   //     sellToken: "ETH",
  //   //     buyToken: "WETH",
  //   //     receiver: "0x0000000000000000000000000000000000000000",
  //   //     sellAmount: "1000000000000000000",
  //   //     buyAmount: "1000000000000000000",
  //   //     validTo: 1666262400,
  //   //     appData: "0x",
  //   //     feeAmount: "0",
  //   //     kind: 0,
  //   //     partiallyFillable: false,
  //   //     sellTokenBalance: "erc20",
  //   //     buyTokenBalance: "erc20",
  //   //   },
  //   //   0,
  //   //   0,
  //   // );

  //   // const safeTx = await roles
  //   //   .connect(managerEOAs)
  //   //   .execTransactionWithRole(
  //   //     cowSwap.address,
  //   //     ZERO_VALUE,
  //   //     signOrderPopTx.data,
  //   //     SAFE_OPERATION_CALL,
  //   //     numberToBytes32(MANAGER_ROLE_ID),
  //   //     true,
  //   //   );

  //   // await safeTx.wait();
  // });
});
