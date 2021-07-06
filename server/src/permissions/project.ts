import { IOrganization } from "../contracts/organization";
import { IProject } from "../contracts/project";
import { IUser } from "../contracts/user";
import { getOrganizationByUserId } from "../controllers/organizationController";
import {
  getProjectsByOrganizationId,
  getProjectsByUserId,
} from "../controllers/projectController";
import { Roles } from "../utils/roleEnum";

const canAccessProject = async (
  user: IUser | null | undefined,
  project: IProject | null | undefined
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
    const organization: IOrganization | null | undefined =
      await getOrganizationByUserId(user.userId);
    const projects = await getProjectsByOrganizationId(
      organization?.id.toString() as string
    );
    return projects?.some((p) => p.projectId === projectId);
  }
  // if role is manager or user and there is the relation between userId and projectid
  const projects = await getProjectsByUserId(user.userId);
  return projects?.some((p) => p.projectId === projectId);
};

export { canAccessProject };
