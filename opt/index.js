"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const constant_1 = require("./constant");
const discord_1 = require("./lib/discord");
const bot = new discord_1.MyBot({
    intents: 32767,
    partials: ['MESSAGE', 'REACTION', 'USER']
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.loadCogs();
    yield bot.loadCommand(constant_1.ID_GUILD_MAIN);
    yield bot.login(constant_1.TOKEN_BOT_DISCORD);
}))()
    .then(() => { var _a; return console.log(`logged in as ${(_a = bot.user) === null || _a === void 0 ? void 0 : _a.username}`); })
    .catch(console.error);
exports.client = bot;
