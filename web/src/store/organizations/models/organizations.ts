import { Organization } from "../../../../../common/contracts/organization";

export default interface IOrganizations {
  data: {
    [key: number]: Organization;
  };
}
