import { IOrganizationInfo } from "../contracts/organization";
import { IProjectInfo } from "../contracts/project";
import { IUserInfo } from "../contracts/user";
import { getOrganizationByUserId } from "../controllers/organizationController";
import {
  getProjectsByOrganizationId,
  getProjectsByUserId,
} from "../controllers/projectController";
import { Roles } from "../utils/roleEnum";

const canAccessProject = async (
  user: IUserInfo | null | undefined,
  project: IProjectInfo | null | undefined
) => {
  if (
    !user ||
    !project ||
    user.role === Roles.Admin ||
    user.role === Roles.Superadmin
  )
    return false;

  const { projectId } = project;
  // if role is organization and project belongs to organization
  if (user.role === Roles.Organization) {
    const organization: IOrganizationInfo | null | undefined =
      await getOrganizationByUserId(user.userId);
    const projects = await getProjectsByOrganizationId(
      organization?.organizationId.toString() as string
    );
    return projects?.some((p) => p.projectId === projectId);
  }
  // if role is manager or user and there is the relation between userId and projectid
  const projects = await getProjectsByUserId(user.userId);
  return projects?.some((p) => p.projectId === projectId);
};

export { canAccessProject };
