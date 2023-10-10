import Cryptography from "../../../security/controllers/cryptography/cryptography";
import OrgAddress from "../../entities/org/orgAddress";
import { DbOperations } from "../../../../interface/operations";
import knex from "../../../../repositories/knex/knex";

import { orgAddressProjection } from "../../entities/org/projections/OrgProjection";

export default class OrgAddressService
  extends OrgAddress
  implements DbOperations
{
  constructor(
    zip_code?: string,
    street_type?: string,
    public_place?: string,
    org_number?: string,
    complement?: string,
    neighborhood?: string,
    county?: string,
    country?: string
  ) {
    super(
      zip_code,
      street_type,
      public_place,
      org_number,
      complement,
      neighborhood,
      county,
      country
    );
  }

  orgAddress = new OrgAddress(
    this.zip_code,
    this.street_type,
    this.public_place,
    this.org_number,
    this.complement,
    this.neighborhood,
    this.county,
    this.country
  );

  cryptography = new Cryptography();

  async verifyId(id: string | number) {
    const existsOrNotExistsId = await knex
      .where("org_address_id", id)
      .from("vex_schema.org_address")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex.insert(this.orgAddress).from("vex_schema.org_address");
  }

  async update(id?: string | number) {
    await knex
      .where("org_address_id", id)
      .update(this.orgAddress)
      .from("vex_schema.org_address");
  }

  async getAll(page?: any, size?: any) {
    const data: any = await knex
      .select(orgAddressProjection)
      .from("vex_schema.org_address")
      .paginate({
        currentPage: page,
        perPage: size,
      });

    if (data.data.length === 0) return "no data";

    for (let cipherDataPosition in data.data) {
      data.data[cipherDataPosition].zip_code = this.cryptography.decrypt(
        data.data[cipherDataPosition].zip_code
      );
      data.data[cipherDataPosition].street_type = this.cryptography.decrypt(
        data.data[cipherDataPosition].street_type
      );
      data.data[cipherDataPosition].public_place = this.cryptography.decrypt(
        data.data[cipherDataPosition].public_place
      );
      data.data[cipherDataPosition].org_number = this.cryptography.decrypt(
        data.data[cipherDataPosition].org_number
      );
      data.data[cipherDataPosition].complement = this.cryptography.decrypt(
        data.data[cipherDataPosition].complement
      );
      data.data[cipherDataPosition].neighborhood = this.cryptography.decrypt(
        data.data[cipherDataPosition].neighborhood
      );
      data.data[cipherDataPosition].county = this.cryptography.decrypt(
        data.data[cipherDataPosition].county
      );
      data.data[cipherDataPosition].country = this.cryptography.decrypt(
        data.data[cipherDataPosition].country
      );
    }

    return data.data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("org_address_id", id)
      .select(orgAddressProjection)
      .from("vex_schema.org_address");

    if (data.length === 0) return "organization address not found";

    data[0].zip_code = this.cryptography.decrypt(data[0].zip_code);
    data[0].street_type = this.cryptography.decrypt(data[0].street_type);
    data[0].public_place = this.cryptography.decrypt(data[0].public_place);
    data[0].org_number = this.cryptography.decrypt(data[0].org_number);
    data[0].complement = this.cryptography.decrypt(data[0].complement);
    data[0].neighborhood = this.cryptography.decrypt(data[0].neighborhood);
    data[0].county = this.cryptography.decrypt(data[0].county);
    data[0].country = this.cryptography.decrypt(data[0].country);

    return data;
  }

  deleteAll(): void {}

  async deleteById(id?: string | number) {
    await knex
      .where("org_address_id", id)
      .delete()
      .from("vex_schema.org_address");
  }
}