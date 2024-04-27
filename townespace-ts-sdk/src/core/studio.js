"use strict";
/**
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Studio = void 0;
var module_endpoints_1 = require("../utils/module-endpoints");
var Studio = /** @class */ (function () {
    function Studio() {
    }
    Studio.prototype.burnComposableToken = function (aptos, deployer, token_object) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::burn_composable_token"),
                                functionArguments: [token_object],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Composable token burned. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    Studio.prototype.burnTraitToken = function (aptos, deployer, token_object) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::burn_trait_token"),
                                functionArguments: [token_object],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Trait token burned. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    Studio.prototype.equipTrait = function (aptos, deployer, composable_object, trait_object, trait_type) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::equip_trait"),
                                functionArguments: [composable_object, trait_object, trait_type],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Trait equipped. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    Studio.prototype.unequipTrait = function (aptos, deployer, composable_object, trait_object, trait_type) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::unequip_trait"),
                                functionArguments: [composable_object, trait_object, trait_type],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Trait unequipped. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    Studio.prototype.decomposeEntireToken = function (aptos, deployer, composable_object, new_uri) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::decompose_entire_token"),
                                functionArguments: [composable_object, new_uri],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Token decomposed. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    // tokens are created but not ready to be minted
    Studio.prototype.CreateComposableToken = function (aptos, deployer, collection_name, description, uri, base_mint_price, traits, royalty_numerator, royalty_denominator) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::create_composable_token"),
                                functionArguments: [collection_name, description, uri, base_mint_price, traits, royalty_numerator, royalty_denominator],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Token created. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    // tokens are created but not ready to be minted
    Studio.prototype.createTraitToken = function (aptos, deployer, collection_name, description, type, uri, base_mint_price, royalty_numerator, royalty_denominator) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::create_trait_token"),
                                functionArguments: [collection_name, description, type, uri, base_mint_price, royalty_numerator, royalty_denominator],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Token created. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    Studio.prototype.transferDigitalAsset = function (aptos, deployer, type, // type of the digital asset
    token_address, recipient_address) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::transfer_digital_asset"),
                                functionArguments: [type, token_address, recipient_address],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Digital asset transferred. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    // works with digital asset being the recipient as well
    Studio.prototype.transferFungibleAsset = function (aptos, deployer, fa_type, // type of the fungible asset
    recipient_address, fa, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::transfer_fungible_asset"),
                                functionArguments: [fa_type, recipient_address, fa, amount],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Fungible asset transferred. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    Studio.prototype.setTokenName = function (aptos, deployer, token_object_addr, new_name) {
        return __awaiter(this, void 0, void 0, function () {
            var rawTxn, pendingTxn, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: deployer.accountAddress,
                            data: {
                                function: "".concat(module_endpoints_1.STUDIO_MODULE, "::set_token_name"),
                                functionArguments: [token_object_addr, new_name],
                            },
                        })];
                    case 1:
                        rawTxn = _a.sent();
                        return [4 /*yield*/, aptos.signAndSubmitTransaction({ signer: deployer, transaction: rawTxn })];
                    case 2:
                        pendingTxn = _a.sent();
                        console.log("pendingTxn", pendingTxn);
                        return [4 /*yield*/, aptos.waitForTransaction({ transactionHash: pendingTxn.hash })];
                    case 3:
                        response = _a.sent();
                        console.log("Token name set. - ", response.hash);
                        return [2 /*return*/, response.hash];
                }
            });
        });
    };
    return Studio;
}());
exports.Studio = Studio;
