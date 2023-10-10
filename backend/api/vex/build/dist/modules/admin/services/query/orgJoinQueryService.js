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
const OrgProjection_1 = require("../../entities/org/projections/OrgProjection");
const driverProjection_1 = require("../../../checklist/entities/driver/projections/driverProjection");
const joinProjection_1 = require("../../entities/org/projections/joinProjection");
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
class OrgJoinQueryService {
    constructor() {
        this.cryptography = new cryptography_1.default();
    }
    save() { }
    update() { }
    getAll() { }
    getById(org_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield knex_1.default
                .select(OrgProjection_1.orgProjection)
                .from("vex_schema.org")
                .where("org.org_id", org_id);
            if (organization.length !== 0) {
                for (let cipherDataPosition in organization) {
                    organization[cipherDataPosition].fantasy_name =
                        this.cryptography.decrypt(organization[cipherDataPosition].fantasy_name);
                    organization[cipherDataPosition].corporate_name =
                        this.cryptography.decrypt(organization[cipherDataPosition].corporate_name);
                    organization[cipherDataPosition].cnpj = this.cryptography.decrypt(organization[cipherDataPosition].cnpj);
                    organization[cipherDataPosition].org_status = this.cryptography.decrypt(organization[cipherDataPosition].org_status);
                    organization[cipherDataPosition].cnae_main_code =
                        this.cryptography.decrypt(organization[cipherDataPosition].cnae_main_code);
                    organization[cipherDataPosition].open_date = this.cryptography.decrypt(organization[cipherDataPosition].open_date);
                    organization[cipherDataPosition].cnae_main_description =
                        this.cryptography.decrypt(organization[cipherDataPosition].cnae_main_description);
                    organization[cipherDataPosition].sector = this.cryptography.decrypt(organization[cipherDataPosition].sector);
                    organization[cipherDataPosition].account_created_at =
                        this.cryptography.decrypt(organization[cipherDataPosition].account_created_at);
                }
            }
            const orgAndAddress = yield knex_1.default
                .select(OrgProjection_1.orgAddressProjection)
                .from("vex_schema.org_address_relation_table")
                .innerJoin("vex_schema.org", "org_address_relation_table.org_relation_id", "org.org_id")
                .innerJoin("vex_schema.org_address", "org_address_relation_table.org_address_relation_id", "org_address.org_address_id")
                .where("org.org_id", org_id);
            if (orgAndAddress.length !== 0) {
                for (let cipherDataPosition in orgAndAddress) {
                    orgAndAddress[cipherDataPosition].zip_code = this.cryptography.decrypt(orgAndAddress[cipherDataPosition].zip_code);
                    orgAndAddress[cipherDataPosition].street_type =
                        this.cryptography.decrypt(orgAndAddress[cipherDataPosition].street_type);
                    orgAndAddress[cipherDataPosition].public_place =
                        this.cryptography.decrypt(orgAndAddress[cipherDataPosition].public_place);
                    orgAndAddress[cipherDataPosition].org_number =
                        this.cryptography.decrypt(orgAndAddress[cipherDataPosition].org_number);
                    orgAndAddress[cipherDataPosition].complement =
                        this.cryptography.decrypt(orgAndAddress[cipherDataPosition].complement);
                    orgAndAddress[cipherDataPosition].neighborhood =
                        this.cryptography.decrypt(orgAndAddress[cipherDataPosition].neighborhood);
                    orgAndAddress[cipherDataPosition].county = this.cryptography.decrypt(orgAndAddress[cipherDataPosition].county);
                    orgAndAddress[cipherDataPosition].country = this.cryptography.decrypt(orgAndAddress[cipherDataPosition].country);
                }
            }
            const orgAndContact = yield knex_1.default
                .select(OrgProjection_1.orgContactProjection)
                .from("vex_schema.org_contact_relation_table")
                .innerJoin("vex_schema.org", "org_contact_relation_table.org_relation_id", "org.org_id")
                .innerJoin("vex_schema.org_contact", "org_contact_relation_table.org_contact_relation_id", "org_contact.org_contact_id")
                .where("org.org_id", org_id);
            if (orgAndContact.length !== 0) {
                for (let cipherDataPosition in orgAndContact) {
                    orgAndContact[cipherDataPosition].telephone = this.cryptography.decrypt(orgAndContact[cipherDataPosition].telephone);
                    orgAndContact[cipherDataPosition].ddd = this.cryptography.decrypt(orgAndContact[cipherDataPosition].ddd);
                    orgAndContact[cipherDataPosition].email = this.cryptography.decrypt(orgAndContact[cipherDataPosition].email);
                }
            }
            const orgAndOrgIpData = yield knex_1.default
                .select(OrgProjection_1.orgIpDataProviderProjection)
                .from("vex_schema.org_ip_data_provider_relation_table")
                .innerJoin("vex_schema.org", "org_ip_data_provider_relation_table.org_relation_id", "org.org_id")
                .innerJoin("vex_schema.org_ip_data_provider", "org_ip_data_provider_relation_table.org_ip_data_provider_relation_id", "org_ip_data_provider.org_ip_data_provider_id")
                .where("org.org_id", org_id);
            if (orgAndOrgIpData.length !== 0) {
                for (let cipherDataPosition in orgAndOrgIpData) {
                    orgAndOrgIpData[cipherDataPosition].public_client_ip =
                        this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].public_client_ip);
                    orgAndOrgIpData[cipherDataPosition].hostname =
                        this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].hostname);
                    orgAndOrgIpData[cipherDataPosition].city = this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].city);
                    orgAndOrgIpData[cipherDataPosition].region = this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].region);
                    orgAndOrgIpData[cipherDataPosition].country = this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].country);
                    orgAndOrgIpData[cipherDataPosition].loc = this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].loc);
                    orgAndOrgIpData[cipherDataPosition].provider =
                        this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].provider);
                    orgAndOrgIpData[cipherDataPosition].postal = this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].postal);
                    orgAndOrgIpData[cipherDataPosition].timezone =
                        this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].timezone);
                    orgAndOrgIpData[cipherDataPosition].readme = this.cryptography.decrypt(orgAndOrgIpData[cipherDataPosition].readme);
                }
            }
            const employees = yield knex_1.default
                .select(driverProjection_1.driverProjection)
                .from("vex_schema.org_driver_relation_table")
                .innerJoin("vex_schema.org", "org_driver_relation_table.org_relation_id", "org.org_id")
                .innerJoin("vex_schema.driver", "org_driver_relation_table.driver_relation_id", "driver.driver_id")
                .where("org.org_id", org_id);
            if (employees.length !== 0) {
                for (let cipherDataPosition in employees) {
                    employees[cipherDataPosition].first_name = this.cryptography.decrypt(employees[cipherDataPosition].first_name);
                    employees[cipherDataPosition].last_name = this.cryptography.decrypt(employees[cipherDataPosition].last_name);
                    employees[cipherDataPosition].email = this.cryptography.decrypt(employees[cipherDataPosition].email);
                }
            }
            const orgAndDriverAndAddress = yield knex_1.default
                .select(joinProjection_1.joinDriverAndAddressProjection)
                .from("vex_schema.driver_address_relation_table")
                .innerJoin("vex_schema.driver", "driver_address_relation_table.driver_relation_id", "driver.driver_id")
                .innerJoin("vex_schema.driver_address", "driver_address_relation_table.driver_address_relation_id", "driver_address.driver_address_id")
                .innerJoin("vex_schema.org", "driver_address_relation_table.org_relation_id", "org.org_id")
                .where("org.org_id", org_id);
            if (orgAndDriverAndAddress.length !== 0) {
                for (let cipherDataPosition in orgAndDriverAndAddress) {
                    orgAndDriverAndAddress[cipherDataPosition].zip_code =
                        this.cryptography.decrypt(orgAndDriverAndAddress[cipherDataPosition].zip_code);
                    orgAndDriverAndAddress[cipherDataPosition].state =
                        this.cryptography.decrypt(orgAndDriverAndAddress[cipherDataPosition].state);
                    orgAndDriverAndAddress[cipherDataPosition].city =
                        this.cryptography.decrypt(orgAndDriverAndAddress[cipherDataPosition].city);
                }
            }
            const orgAndDriverAndContact = yield knex_1.default
                .select(joinProjection_1.joinDriverAndContactProjection)
                .from("vex_schema.driver_contact_relation_table")
                .innerJoin("vex_schema.driver", "driver_contact_relation_table.driver_relation_id", "driver.driver_id")
                .innerJoin("vex_schema.driver_contact", "driver_contact_relation_table.driver_contact_relation_id", "driver_contact.driver_contact_id")
                .innerJoin("vex_schema.org", "driver_contact_relation_table.org_relation_id", "org.org_id")
                .where("org.org_id", org_id);
            if (orgAndDriverAndContact.length !== 0) {
                for (let cipherDataPosition in orgAndDriverAndContact) {
                    orgAndDriverAndContact[cipherDataPosition].telephone =
                        this.cryptography.decrypt(orgAndDriverAndContact[cipherDataPosition].telephone);
                }
            }
            const orgAndDriverAndDocument = yield knex_1.default
                .select(joinProjection_1.joinDriverAndDocumentProjection)
                .from("vex_schema.driver_document_relation_table")
                .innerJoin("vex_schema.driver", "driver_document_relation_table.driver_relation_id", "driver.driver_id")
                .innerJoin("vex_schema.driver_document", "driver_document_relation_table.driver_document_relation_id", "driver_document.driver_document_id")
                .innerJoin("vex_schema.org", "driver_document_relation_table.org_relation_id", "org.org_id")
                .where("org.org_id", org_id);
            if (orgAndDriverAndDocument.length !== 0) {
                for (let cipherDataPosition in orgAndDriverAndDocument) {
                    orgAndDriverAndDocument[cipherDataPosition].cnh =
                        this.cryptography.decrypt(orgAndDriverAndDocument[cipherDataPosition].cnh);
                }
            }
            const orgAndDriverAndInformation = yield knex_1.default
                .select(joinProjection_1.joinDriverAndInformationProjection)
                .from("vex_schema.driver_information_relation_table")
                .innerJoin("vex_schema.driver", "driver_information_relation_table.driver_relation_id", "driver.driver_id")
                .innerJoin("vex_schema.information", "driver_information_relation_table.information_relation_id", "information.information_id")
                .innerJoin("vex_schema.org", "driver_information_relation_table.org_relation_id", "org.org_id")
                .where("org.org_id", org_id);
            if (orgAndDriverAndInformation.length !== 0) {
                for (let cipherDataPosition in orgAndDriverAndInformation) {
                    orgAndDriverAndInformation[cipherDataPosition].starting_km =
                        this.cryptography.decrypt(orgAndDriverAndInformation[cipherDataPosition].starting_km);
                    orgAndDriverAndInformation[cipherDataPosition].final_km =
                        this.cryptography.decrypt(orgAndDriverAndInformation[cipherDataPosition].final_km);
                    orgAndDriverAndInformation[cipherDataPosition].plate =
                        this.cryptography.decrypt(orgAndDriverAndInformation[cipherDataPosition].plate);
                    orgAndDriverAndInformation[cipherDataPosition].notes =
                        this.cryptography.decrypt(orgAndDriverAndInformation[cipherDataPosition].notes);
                    orgAndDriverAndInformation[cipherDataPosition].date_time_registry =
                        this.cryptography.decrypt(orgAndDriverAndInformation[cipherDataPosition].date_time_registry);
                }
            }
            const midia = yield knex_1.default
                .select(joinProjection_1.joindInformationAndMidiaProjection)
                .from("vex_schema.information_midia_uri_relation_table")
                .innerJoin("vex_schema.midia_uri", "information_midia_uri_relation_table.midia_uri_relation_id", "midia_uri.midia_uri_id")
                .innerJoin("vex_schema.information", "information_midia_uri_relation_table.information_relation_id", "information.information_id")
                .innerJoin("vex_schema.driver", "information_midia_uri_relation_table.driver_relation_id", "driver.driver_id")
                .innerJoin("vex_schema.org", "information_midia_uri_relation_table.org_relation_id", "org.org_id")
                .where("org.org_id", org_id);
            return {
                data: {
                    organization: {
                        organization,
                        address: orgAndAddress,
                        contact: orgAndContact,
                        host: orgAndOrgIpData,
                        drivers: {
                            employees,
                            address: orgAndDriverAndAddress,
                            contact: orgAndDriverAndContact,
                            document: orgAndDriverAndDocument,
                            information: {
                                orgAndDriverAndInformation,
                                midia
                            },
                        },
                    },
                },
            };
        });
    }
    deleteAll() { }
    deleteById() { }
}
exports.default = OrgJoinQueryService;