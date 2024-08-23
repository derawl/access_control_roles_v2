import {
    ANY,
    APPROVAL_SIG,
    CURVE_USDC_USDE_ADDR,
    EMPTY_BYTES,
    EQUAL_TO,
    MANAGER_ROLE_ID,
    MULTISEND_ADDR,
    OPTIONS_SEND, MARKET_ETHENA_SUSDE_24_OCT_2024_ADDR,
    PENDLE_ROUTER_V4_ADDR,
    PT_ETHENA_SUSDE_24_OCT_2024_ADDR,
    SAFE_OPERATION_DELEGATECALL,
    SECURITY_ROLE_ID,
    SUSDE_ADDR, SY_SUSDE_ADDR,
    TYPE_STATIC,
    USDC_ADDR,
    USDE_ADDR, YT_ETHENA_SUSDE_24_OCT_2024_ADDR,
    ZERO_VALUE,
    OPTIONS_NONE,
    CURVE_3POOL_ADDR,
    JOIN_PSM_USDC_ADDR
} from "../../scripts/constants"
import ROLES_V1_MASTER_COPY_ABI from "../../abi/RolesV1.json"
import { createMultisendTx, getABICodedAddress } from "../../scripts/utils";

import { ExecutionOptions, Whitelist } from "../whitelist-class";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";


// const hre: HardhatRuntimeEnvironment = require("hardhat");
const curveUsdcUsdeContractEncoded = getABICodedAddress(CURVE_USDC_USDE_ADDR);
const pendleRouterV4Encoded = getABICodedAddress(PENDLE_ROUTER_V4_ADDR)
const curve3poolContractEncoded = getABICodedAddress(CURVE_3POOL_ADDR);
const joinPsmAddrEncoded = getABICodedAddress(JOIN_PSM_USDC_ADDR);

const pendleEthenaRoleDefinition = {
    //function note: allows swapping between USDe <> USDC. USDe is a stablecoin backed by derivatives run by Ethena
    exchangeUsdc: {
        functionSignature: ethers.utils.id("exchange(int128,int128,uint256,uint256)").substring(0, 10),
        contractAddr: CURVE_USDC_USDE_ADDR,
    },
    //function note: allows user to swap from any token to any Pendle PT. A PT is a token that allows you to earn fixed interest by just holding it
    swapExactTokenForPt: {
        functionSignature: ethers.utils.id("swapExactTokenForPt(address,address,uint256,(uint256,uint256,uint256,uint256,uint256),(address,uint256,address,address,(uint8,address,bytes,bool)),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows user to swap from any PT to any token
    swapExactPtForToken: {
        functionSignature: ethers.utils.id("swapExactPtForToken(address,address,uint256,(address,uint256,address,address,(uint8,address,bytes,bool)),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: this lets a user burn their PT tokens in exchange for that PT's underlying token (for this strategy that would be sUSDe)
    redeemPyToToken: {
        functionSignature: ethers.utils.id("redeemPyToToken(address,address,uint256,(address,uint256,address,address,(uint8,address,bytes,bool)))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to LP, by providing a token and a PT as input
    addLiquidityDualTokenAndPt: {
        functionSignature: ethers.utils.id("addLiquidityDualTokenAndPt(address,address,(address,uint256,address,address,(uint8,address,bytes,bool)),uint256,uint256)").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },

    //function note: allows a user to LP, by providing an SY token and a PT as input
    addLiquidityDualSyAndPt: {
        functionSignature: ethers.utils.id("addLiquidityDualSyAndPt(address,address,uint256,uint256,uint256)").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to LP, by providing only a PT as input
    addLiquiditySinglePt: {
        functionSignature: ethers.utils.id("addLiquiditySinglePt(address,address,uint256,uint256,(uint256,uint256,uint256,uint256,uint256),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to LP, by providing only a single token as input
    addLiquiditySingleToken: {
        functionSignature: ethers.utils.id("addLiquiditySingleToken(address,address,uint256,(uint256,uint256,uint256,uint256,uint256),(address,uint256,address,address,(uint8,address,bytes,bool)),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to LP, by providing only a single SY token as input
    addLiquiditySingleSy: {
        functionSignature: ethers.utils.id("addLiquiditySingleSy(address,address,uint256,uint256,(uint256,uint256,uint256,uint256,uint256),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to LP their PT but keep their corresponding YT
    addLiquiditySingleTokenKeepYt: {
        functionSignature: ethers.utils.id("addLiquiditySingleTokenKeepYt(address,address,uint256,uint256,(address,uint256,address,address,(uint8,address,bytes,bool)))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to LP their PT but keep their corresponding YT
    addLiquiditySingleSyKeepYt: {
        functionSignature: ethers.utils.id("addLiquiditySingleSyKeepYt(address,address,uint256,uint256,uint256)").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //fuction note: allows a user to remove their LP and receive both token and PT as output
    removeLiquidityDualTokenAndPt: {
        functionSignature: ethers.utils.id("removeLiquidityDualTokenAndPt(address,address,uint256,(address,uint256,address,address,(uint8,address,bytes,bool)),uint256)").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //fuction note: allows a user to remove their LP and receive both SY token and PT as output
    removeLiquidityDualSyAndPt: {
        functionSignature: ethers.utils.id("removeLiquidityDualSyAndPt(address,address,uint256,uint256,uint256)").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to remove their LP for PT as output.
    removeLiquiditySinglePt: {
        functionSignature: ethers.utils.id("removeLiquiditySinglePt(address,address,uint256,uint256,(uint256,uint256,uint256,uint256,uint256),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to remove their LP for token as output.
    removeLiquiditySingleToken: {
        functionSignature: ethers.utils.id("removeLiquiditySingleToken(address,address,uint256,(address,uint256,address,address,(uint8,address,bytes,bool)),(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to remove their LP for SY token as output.
    removeLiquiditySingleSy: {
        functionSignature: ethers.utils.id("removeLiquiditySingleSy(address,address,uint256,uint256,(address,uint256,((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],((uint256,uint256,uint256,uint8,address,address,address,address,uint256,uint256,uint256,bytes),bytes,uint256)[],bytes))").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
    //function note: allows a user to claim their farmed token rewards earned for being an LP
    redeemDueInterestAndRewards: {
        functionSignature: ethers.utils.id("redeemDueInterestAndRewards(address,address[],address[],address[])").substring(0, 10),
        contractAddr: PENDLE_ROUTER_V4_ADDR,
    },
};

// Pendle USDE whitelisting class contains all the whitelisting requirements needed by the manager to carry out the strategy
export class PendleEthenaWhitelist extends Whitelist {

    constructor(invRolesAddr: string, caller: SignerWithAddress) {
        super(invRolesAddr, caller);
    }

    async getFullScope(invSafeAddr: string) {
        const targetsToScope = [USDE_ADDR, SUSDE_ADDR, USDC_ADDR, CURVE_USDC_USDE_ADDR, PT_ETHENA_SUSDE_24_OCT_2024_ADDR, PENDLE_ROUTER_V4_ADDR, MARKET_ETHENA_SUSDE_24_OCT_2024_ADDR, SY_SUSDE_ADDR, YT_ETHENA_SUSDE_24_OCT_2024_ADDR]
        const scopeTargetTxs = await this.scopeTargets(targetsToScope, MANAGER_ROLE_ID)
        const txs = [
            //bring all target contracts into scope as first step of roles whitelisting
            ...scopeTargetTxs,
            //whitelist via flexible scopeAllowFunction
            ...await this.scopeExchangeUsdc(),
            //whitelist all approvals
            await this.scopeUsdcApprovalTargetAsOneOf(),
            await this.scopeUsdeApprovalTargetAsOneOf(),
            await this.scopePtSusdeApprove(),
            await this.scopeSusdeApprove(),
            await this.scopeMarketApprove(),
            await this.scopeSySusdeApprove(),
            await this.scopeYtSusdeApprove(),
            //whitelist pendle actions, all scoped to ensure receiver == invSafe
            await this.scopeSwapExactTokenForPt(invSafeAddr),
            await this.scopeSwapExactPtForToken(invSafeAddr),
            await this.scopeAddLiquiditySinglePt(invSafeAddr),
            await this.scopeAddLiquiditySingleToken(invSafeAddr),
            await this.scopeAddLiquiditySingleSy(invSafeAddr),
            await this.scopeAddLiquidityDualTokenAndPt(invSafeAddr),
            await this.scopeAddLiquiditySingleTokenKeepYt(invSafeAddr),
            await this.scopeAddLiquiditySingleSyKeepYt(invSafeAddr),
            await this.scopeRemoveLiquidityDualTokenAndPt(invSafeAddr),
            await this.scopeRemoveLiquidityDualSyAndPt(invSafeAddr),
            await this.scopeRemoveLiquiditySinglePt(invSafeAddr),
            await this.scopeRemoveLiquiditySingleToken(invSafeAddr),
            await this.scopeRemoveLiquiditySingleSy(invSafeAddr),
            await this.scopeRedeemPyToToken(invSafeAddr),
            await this.scopeRedeemDueInterestAndRewards(invSafeAddr)
        ];
        return createMultisendTx(txs, MULTISEND_ADDR)
    }

    async build(acRolesAddr: string, invSafeAddr: string) {
        const metaTx = await this.getFullScope(invSafeAddr)
        const acRoles = new ethers.Contract(acRolesAddr, ROLES_V1_MASTER_COPY_ABI, this.caller)
        return await acRoles.populateTransaction.execTransactionWithRole(
            MULTISEND_ADDR,
            ZERO_VALUE,
            metaTx.data,
            SAFE_OPERATION_DELEGATECALL,
            SECURITY_ROLE_ID,
            true
        )
    }

    async execute(acRolesAddr: string, invSafeAddr: string) {
        const populatedTx = await this.build(acRolesAddr, invSafeAddr)
        const tx = await this.caller.sendTransaction({
            ...populatedTx
        })
        console.log("Successfully executed Pendle USDE strategy whitelisting")
    }

    async scopeExchangeUsdc() {
        //no granular scoping here needed as params are just the tokens being swapped (i,j) and the amounts (dx, min_dy)
        //so we use scopeAllow
        return await this.scopeAllowFunctions(
            pendleEthenaRoleDefinition.exchangeUsdc.contractAddr,
            [pendleEthenaRoleDefinition.exchangeUsdc.functionSignature],
            MANAGER_ROLE_ID
        );
    }

    async scopeMarketApprove() {
        return await this.scopeFunctionERC20Approval(
            MARKET_ETHENA_SUSDE_24_OCT_2024_ADDR,
            pendleRouterV4Encoded
        );
    }

    async scopePtSusdeApprove() {
        return await this.scopeFunctionERC20Approval(
            PT_ETHENA_SUSDE_24_OCT_2024_ADDR,
            pendleRouterV4Encoded
        );
    }

    async scopeYtSusdeApprove() {
        return await this.scopeFunctionERC20Approval(
            YT_ETHENA_SUSDE_24_OCT_2024_ADDR,
            pendleRouterV4Encoded
        );
    }


    async scopeUsdeApprovalTargetAsOneOf() {
        return await this.roles.populateTransaction.scopeParameterAsOneOf(
            MANAGER_ROLE_ID,
            USDE_ADDR,
            APPROVAL_SIG,
            0,
            TYPE_STATIC,
            [curveUsdcUsdeContractEncoded, pendleRouterV4Encoded]
        );
    }

    async scopeSusdeApprove() {
        //allows approval on pendle router
        return await this.scopeFunctionERC20Approval(
            SUSDE_ADDR,
            pendleRouterV4Encoded
        );
    }

    async scopeSySusdeApprove() {
        //allows approval on pendle router
        return await this.scopeFunctionERC20Approval(
            SY_SUSDE_ADDR,
            pendleRouterV4Encoded
        );
    }

    async scopeUsdcApprovalTargetAsOneOf() {
        return await this.roles.populateTransaction.scopeParameterAsOneOf(
            MANAGER_ROLE_ID,
            USDC_ADDR,
            APPROVAL_SIG,
            0,
            TYPE_STATIC,
            //note that the the last two addresses here correspond to the initial sDAI strategy, ensuring those permissions aren't overwritten
            [curveUsdcUsdeContractEncoded, pendleRouterV4Encoded, curve3poolContractEncoded, joinPsmAddrEncoded]
        );
    }

    async scopeSwapExactTokenForPt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.swapExactTokenForPt.contractAddr,
            pendleEthenaRoleDefinition.swapExactTokenForPt.functionSignature,
            [true, false, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_SEND
        );
    }

    async scopeSwapExactPtForToken(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.swapExactPtForToken.contractAddr,
            pendleEthenaRoleDefinition.swapExactPtForToken.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_SEND
        );
    }

    // add liquidity functions
    async scopeAddLiquidityDualTokenAndPt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.addLiquidityDualTokenAndPt.contractAddr,
            pendleEthenaRoleDefinition.addLiquidityDualTokenAndPt.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_SEND
        );

    }

    async scopeAddLiquiditySinglePt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.addLiquiditySinglePt.contractAddr,
            pendleEthenaRoleDefinition.addLiquiditySinglePt.functionSignature,
            [true, false, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeAddLiquiditySingleToken(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.addLiquiditySingleToken.contractAddr,
            pendleEthenaRoleDefinition.addLiquiditySingleToken.functionSignature,
            [true, false, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_SEND
        );
    }

    async scopeAddLiquiditySingleSy(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.addLiquiditySingleSy.contractAddr,
            pendleEthenaRoleDefinition.addLiquiditySingleSy.functionSignature,
            [true, false, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeAddLiquiditySingleTokenKeepYt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.addLiquiditySingleTokenKeepYt.contractAddr,
            pendleEthenaRoleDefinition.addLiquiditySingleTokenKeepYt.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_SEND
        );
    }

    async scopeAddLiquiditySingleSyKeepYt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.addLiquiditySingleSyKeepYt.contractAddr,
            pendleEthenaRoleDefinition.addLiquiditySingleSyKeepYt.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    // remove liquidity functions
    async scopeRemoveLiquidityDualTokenAndPt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.removeLiquidityDualTokenAndPt.contractAddr,
            pendleEthenaRoleDefinition.removeLiquidityDualTokenAndPt.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeRemoveLiquidityDualSyAndPt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.removeLiquidityDualSyAndPt.contractAddr,
            pendleEthenaRoleDefinition.removeLiquidityDualSyAndPt.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeRemoveLiquiditySinglePt(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.removeLiquiditySinglePt.contractAddr,
            pendleEthenaRoleDefinition.removeLiquiditySinglePt.functionSignature,
            [true, false, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeRemoveLiquiditySingleToken(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.removeLiquiditySingleToken.contractAddr,
            pendleEthenaRoleDefinition.removeLiquiditySingleToken.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeRemoveLiquiditySingleSy(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.removeLiquiditySingleSy.contractAddr,
            pendleEthenaRoleDefinition.removeLiquiditySingleSy.functionSignature,
            [true, false, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    // Redeem functions
    async scopeRedeemPyToToken(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.redeemPyToToken.contractAddr,
            pendleEthenaRoleDefinition.redeemPyToToken.functionSignature,
            [true, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }

    async scopeRedeemDueInterestAndRewards(invSafeAddr: string) {
        return await this.roles.populateTransaction.scopeFunction(
            MANAGER_ROLE_ID,
            pendleEthenaRoleDefinition.redeemDueInterestAndRewards.contractAddr,
            pendleEthenaRoleDefinition.redeemDueInterestAndRewards.functionSignature,
            [true, false, false, false],
            [TYPE_STATIC, TYPE_STATIC, TYPE_STATIC, TYPE_STATIC],
            [EQUAL_TO, ANY, ANY, ANY],
            [getABICodedAddress(invSafeAddr), EMPTY_BYTES, EMPTY_BYTES, EMPTY_BYTES],
            OPTIONS_NONE
        );
    }
}