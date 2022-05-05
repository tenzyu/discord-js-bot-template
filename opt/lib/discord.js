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
exports.MyBot = void 0;
const discord_js_1 = require("discord.js");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class MyBot extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = [];
        // NOTE: must be an absolute path
        this.pathToCogs = (0, path_1.join)(__dirname, '..', 'cogs');
        this.pathToCommands = (0, path_1.join)(__dirname, '..', 'commands');
    }
    loadCogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, promises_1.readdir)(this.pathToCogs);
            files.map(path_1.parse).forEach(({ name }) => __awaiter(this, void 0, void 0, function* () {
                // NOTE: must be a relative path
                const path = (0, path_1.join)('..', 'cogs', name);
                yield Promise.resolve().then(() => require(path)).then((_) => console.log(`loaded ${name} cog`));
            }));
        });
    }
    loadCommand(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, promises_1.readdir)(this.pathToCommands);
            files.map(path_1.parse).forEach(({ name }) => __awaiter(this, void 0, void 0, function* () {
                // NOTE: must be a relative path
                const path = (0, path_1.join)('..', 'commands', name);
                const { data, execute } = (yield Promise.resolve().then(() => require(path))).default;
                this.commands.push({ data, execute });
            }));
            this.once('ready', () => __awaiter(this, void 0, void 0, function* () {
                // NOTE: Log each one. Use set() instead of create() if launch performance is important.
                this.commands.forEach(({ data }) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield ((_a = this.application) === null || _a === void 0 ? void 0 : _a.commands.create(data, guildId).then((_) => console.log(`created command ${data.name}`)).catch((error) => console.error(`failed to create ${data.name}\n${error}`)));
                }));
            }));
            this.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
                if (!(interaction instanceof discord_js_1.CommandInteraction))
                    return;
                const command = this.commands.find((command) => { var _a; return ((_a = interaction.command) === null || _a === void 0 ? void 0 : _a.name) === command.data.name; });
                yield (command === null || command === void 0 ? void 0 : command.execute(interaction).catch(console.error));
            }));
        });
    }
}
exports.MyBot = MyBot;
