"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_hmr_1 = __importDefault(require("node-hmr"));
const dotenv_1 = __importDefault(require("dotenv"));
let app;
// Configuration
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
(0, node_hmr_1.default)(() => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-console
    console.log('Reloading app...');
    ({ default: app } = yield Promise.resolve().then(() => __importStar(require('./app'))));
}));
const server = http_1.default.createServer((req, res) => app(req, res));
try {
    if (!process.env.PORT) {
        throw new Error('Lütfen .env dosyasını kontrol ediniz. PORT değeri bulunamadı.');
    }
    server.listen(process.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`[CoderStream] developer için hazır!, port: ${process.env.PORT}`);
    });
}
catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
}
