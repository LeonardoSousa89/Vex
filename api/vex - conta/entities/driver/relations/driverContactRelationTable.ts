export default class DriveAddressRelationTable {

    driver_contact_relation_id?: number
    driver_relation_id?: number
    org_relation_id?: number

    constructor(
        driver_contact_relation_id?: number,
        driver_relation_id?: number,
        org_relation_id?: number
    ){

        this.driver_contact_relation_id  = driver_contact_relation_id 
        this.driver_relation_id  = driver_relation_id,
        this.org_relation_id = org_relation_id 
    }
}