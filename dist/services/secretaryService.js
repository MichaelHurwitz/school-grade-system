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
exports.deleteSecretary = exports.updateSecretary = exports.createSecretary = void 0;
const secretary_1 = require("../models/secretary");
const createSecretary = (secretaryData) => __awaiter(void 0, void 0, void 0, function* () {
    const newSecretary = new secretary_1.Secretary(secretaryData);
    return yield newSecretary.save();
});
exports.createSecretary = createSecretary;
const updateSecretary = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield secretary_1.Secretary.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateSecretary = updateSecretary;
const deleteSecretary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield secretary_1.Secretary.findByIdAndDelete(id);
});
exports.deleteSecretary = deleteSecretary;
