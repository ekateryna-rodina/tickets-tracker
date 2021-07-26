import { IUserInfo } from "../../../common/contracts/user";
import { getOrganizationByUserId } from "../controllers/organizationController";
import { Roles } from "../utils/roleEnum";

const canAccessOrganization = async (
  user: IUserInfo,
  organizationId: number
) => {
  if (user.role === Roles.Superadmin) return true;
  const organization = await getOrganizationByUserId(user.userId);
  return organization?.organizationId === organizationId;
};

export { canAccessOrganization };
