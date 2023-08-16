import knex from "../../repositories/knex/knex";
import { DbOperations } from "../../interface/operations";
import Driver from "../../entities/driver/driver";

import { driverProjection } from "../../repositories/projections/driverProjection";
import Cryptography from "../../config/security/cryptography";

export default class DriverService extends Driver implements DbOperations {
  constructor(
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
  ) {
    super(first_name, last_name, email, password);
  }

  driver = new Driver(
    this.first_name,
    this.last_name,
    this.email,
    this.password
  );

  cryptography = new Cryptography();

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("driver_id", id)
      .from("vex_schema.driver")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyEmail(email: string) {
    const data = await knex.select(driverProjection).from("vex_schema.driver");

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].email = this.cryptography.decrypt(
        data[cipherDataPosition].email
      );
    }

    const search = data.find((dataElement) => dataElement.email === email);

    if (!search) return false;

    return true;
  }

  async save() {
    await knex.insert(this.driver).from("vex_schema.driver");
  }

  async update(id?: string | number) {
    await knex
      .where("driver_id", id)
      .update(this.driver)
      .from("vex_schema.driver");
  }

  async getAll() {
    const data = await knex.select(driverProjection).from("vex_schema.driver");

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].first_name = this.cryptography.decrypt(
        data[cipherDataPosition].first_name
      );
      data[cipherDataPosition].last_name = this.cryptography.decrypt(
        data[cipherDataPosition].last_name
      );
      data[cipherDataPosition].email = this.cryptography.decrypt(
        data[cipherDataPosition].email
      );
    }

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_id", id)
      .select(driverProjection)
      .from("vex_schema.driver");

    if (data.length === 0) return "driver not found";

    data[0].first_name = this.cryptography.decrypt(data[0].first_name);
    data[0].last_name = this.cryptography.decrypt(data[0].last_name);
    data[0].email = this.cryptography.decrypt(data[0].email);

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.driver");
  }

  async deleteById(id?: string | number) {
    await knex.where("driver_id", id).delete().from("vex_schema.driver");
  }
}
