import { org } from "../../../../interface/types/org/org";
import { orgAddress } from "../../../../interface/types/org/orgAddress";
import { orgContact } from "../../../../interface/types/org/orgContact";
import { orgDataMachine } from "../../../../interface/types/org/orgIpDataProvider";
import Http from "../../../../interface/web/class/httpRequest";
import { ip, ipDataResponse } from "../../../web/services/network";
import { navigate } from "../navigate/navigate";

export async function signUp(
  cnpj: string,
  password: string,
  props: any,
  path: string
) {
  try {
    const response = await new Http().Get(
      /**este serviço deve ser responsabilidade de vex api */
      `${process.env.EXPO_PUBLIC_CNPJ_API}/buscarcnpj?cnpj=${cnpj}`
    );

    const Org: org = {
      fantasy_name: response["RAZAO SOCIAL"],
      corporate_name: response["NOME FANTASIA"],
      cnpj,
      org_status: response["STATUS"],
      cnae_main_code: response["CNAE PRINCIPAL CODIGO"],
      open_date: response["DATA ABERTURA"],
      password,
      cnae_main_description: response["CNAE PRINCIPAL DESCRICAO"],
      sector: response["SETOR"],
    };
    await new Http().Post(`${process.env.EXPO_PUBLIC_VEX_API}/org/save`, Org);

    let orgCreated = await new Http().Get(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/get-all`
    );
    orgCreated = orgCreated.data.data[orgCreated.data.data.length - 1].org_id;

    const OrgAddress: orgAddress = {
      zip_code: response["CEP"],
      street_type: response["TIPO LOGRADOURO"],
      public_place: response["LOGRADOURO"],
      org_number: response["NUMERO"],
      complement: response["COMPLEMENTO"],
      neighborhood: response["BAIRRO"],
      county: response["MUNICIPIO"],
      country: "Brasil",
    };
    await new Http().Post(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/address/save`,
      OrgAddress
    );

    let orgAddressCreated = await new Http().Get(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/address/get-all`
    );

    orgAddressCreated =
      orgAddressCreated.data.data[orgAddressCreated.data.data.length - 1]
        .org_address_id;

    await new Http().Post(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/address/relation-table/save`,
      {
        org_address_relation_id: orgAddressCreated,
        org_relation_id: orgCreated,
      }
    );

    const orgContact: orgContact = {
      telephone: response["TELEFONE"],
      ddd: response["DDD"],
      email: response["EMAIL"],
    };
    await new Http().Post(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/contact/save`,
      orgContact
    );

    let orgContactCreated = await new Http().Get(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/contact/get-all`
    );

    orgContactCreated =
      orgContactCreated.data.data[orgContactCreated.data.data.length - 1]
        .org_contact_id;

    await new Http().Post(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/contact/relation-table/save`,
      {
        org_contact_relation_id: orgContactCreated,
        org_relation_id: orgCreated,
      }
    );

    /**este serviço deve ser responsabilidade de vex api */
    const ipApiUrl = `${process.env.EXPO_PUBLIC_USER_IP_API_URL}`;
    const userIp = await ip(ipApiUrl);
    /**este serviço deve ser responsabilidade de vex api */
    const geoIpApiUrl = `${process.env.EXPO_PUBLIC_GEO_IP_API_URL}/${userIp}/json`;
    const ipData: any = await ipDataResponse(geoIpApiUrl);

    const dataMachine: any = ipData.ip_client_data_provider;

    const orgDataMachine: orgDataMachine = {
      ip: dataMachine.ip,
      hostname: dataMachine.hostname,
      city: dataMachine.city,
      region: dataMachine.region,
      country: dataMachine.country,
      loc: dataMachine.loc,
      org: dataMachine.org,
      postal: dataMachine.postal,
      timezone: dataMachine.timezone,
      readme: dataMachine.readme,
    };

    await new Http().Post(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/client/machine/data/provider/save`,
      orgDataMachine
    );

    let orgDataMachineCreated = await new Http().Get(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/client/machine/data/provider/get/all`
    );

    orgDataMachineCreated =
      orgDataMachineCreated.data.data[
        orgDataMachineCreated.data.data.length - 1
      ].org_ip_data_provider_id;

    await new Http().Post(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/machine/client/ip/and/provider/relation-table/save`,
      {
        org_ip_data_provider_relation_id: orgDataMachineCreated,
        org_relation_id: orgCreated,
      }
    );

    navigate(props, path);
  } catch (e) {
    return e;
  }
}
