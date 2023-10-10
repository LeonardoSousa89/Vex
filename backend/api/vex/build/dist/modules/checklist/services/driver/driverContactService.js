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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../../../../repositories/knex/knex"));
const driverContact_1 = __importDefault(require("../../entities/driver/driverContact"));
const driverProjection_1 = require("../../entities/driver/projections/driverProjection");
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
class DriverContactService extends driverContact_1.default {
    constructor(telephone) {
        super(telephone);
        this.driverContact = new driverContact_1.default(this.telephone);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("driver_contact_id", id)
                .from("vex_schema.driver_contact")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.driverContact).from("vex_schema.driver_contact");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_contact_id", id)
                .update(this.driverContact)
                .from("vex_schema.driver_contact");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(driverProjection_1.driverContactProjection)
                .from("vex_schema.driver_contact")
                .paginate({
                currentPage: page,
                perPage: size,
            });
            if (data.data.length === 0)
                return "no data";
            for (let cipherDataPosition in data.data) {
                data.data[cipherDataPosition].telephone = this.cryptography.decrypt(data.data[cipherDataPosition].telephone);
            }
            return data.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("driver_contact_id", id)
                .select(driverProjection_1.driverContactProjection)
                .from("vex_schema.driver_contact");
            if (data.length === 0)
                return "driver contact not found";
            data[0].telephone = this.cryptography.decrypt(data[0].telephone);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.driver_contact");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_contact_id", id)
                .delete()
                .from("vex_schema.driver_contact");
        });
    }
}
exports.default = DriverContactService;