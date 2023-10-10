import knex from "../../../../repositories/knex/knex";
import { DbOperations } from "../../../../interface/operations";
import DriverAddress from "../../entities/driver/driverAddress";

import { driverAddressProjection } from "../../entities/driver/projections/driverProjection";
import Cryptography from "../../../../modules/security/controllers/cryptography/cryptography";

export default class DriverAddressService
  extends DriverAddress
  implements DbOperations
{
  constructor(zip_code?: string, state?: string, city?: string) {
    super(zip_code, state, city);
  }

  driverAddressService = new DriverAddress(
    this.zip_code,
    this.state,
    this.city
  );

  cryptography = new Cryptography();

  async getZipCode(axios?: any, url?: string) {
    const data = await axios.get(url);

    return data.data;
  }

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("driver_address_id", id)
      .from("vex_schema.driver_address")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.driverAddressService)
      .from("vex_schema.driver_address");
  }

  async update(id?: string | number) {
    await knex
      .where("driver_address_id", id)
      .update(this.driverAddressService)
      .from("vex_schema.driver_address");
  }

  async getAll(page?: any, size?: any) {

    const data: any = await knex
      .select(driverAddressProjection)
      .from("vex_schema.driver_address")
      .paginate({
        currentPage: page,
        perPage: size,
      });

    if (data.data.length === 0) return "no data";

    for (let cipherDataPosition in data.data) {
      data.data[cipherDataPosition].zip_code = this.cryptography.decrypt(
        data.data[cipherDataPosition].zip_code
      );
      data.data[cipherDataPosition].state = this.cryptography.decrypt(
        data.data[cipherDataPosition].state
      );
      data.data[cipherDataPosition].city = this.cryptography.decrypt(
        data.data[cipherDataPosition].city
      );
    }

    return data.data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_address_id", id)
      .select(driverAddressProjection)
      .from("vex_schema.driver_address");

    if (data.length === 0) return "driver address not found";

    data[0].zip_code = this.cryptography.decrypt(data[0].zip_code);
    data[0].state = this.cryptography.decrypt(data[0].state);
    data[0].city = this.cryptography.decrypt(data[0].city);

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.driver_address");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("driver_address_id", id)
      .delete()
      .from("vex_schema.driver_address");
  }
}