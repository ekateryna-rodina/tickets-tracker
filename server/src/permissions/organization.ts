import { IUser } from "../contracts/user";
import { getOrganizationByUserId } from "../controllers/organizationController";
import { Roles } from "../utils/roleEnum";

const canAccessOrganization = async (user: IUser, organizationId: number) => {
  if (user.role === Roles.Superadmin) return true;
  const organization = await getOrganizationByUserId(user.userId);
  return organization?.id === organizationId;
};

export { canAccessOrganization };
