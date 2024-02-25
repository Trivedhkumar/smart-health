import {
  ADDITIONAL_SERVICES,
  ADMINISTRATOR_MENU,
  DIAGNOSTIC_SERVICES,
  HEALTHCARE_PROVIDERS_MENU,
  HEALTH_ADMINISTRATOR_MENU,
  HOME_MENU,
  PATIENT_MENU,
  PHARMACIST_MENU,
  PREVENTATIVE_CARE_SERVICES,
  PRIMARY_CARE_SERVICES,
  ROLES,
  SERVICE_NAMES,
  SPECIALITY_SERVICES,
} from "../constants";

export const getServices = (serviceName: any) => {
  switch (serviceName) {
    case SERVICE_NAMES.PRIMARY_CARE:
      return PRIMARY_CARE_SERVICES;
    case SERVICE_NAMES.PREVENTATIVE_CARE:
      return PREVENTATIVE_CARE_SERVICES;
    case SERVICE_NAMES.ADDITIONAL:
      return ADDITIONAL_SERVICES;
    case SERVICE_NAMES.SPECIALITY:
      return SPECIALITY_SERVICES;
    case SERVICE_NAMES.DIAGNOSTIC:
      return DIAGNOSTIC_SERVICES;
    default:
      return PRIMARY_CARE_SERVICES;
  }
};
export const getMenuItemsByRole = (role: any) => {
  switch (role) {
    case ROLES.ADMINISTRATOR:
      return ADMINISTRATOR_MENU;
    case ROLES.HEALTHCARE_PROVIDERS:
      return HEALTHCARE_PROVIDERS_MENU;
    case ROLES.HEALTH_ADMINISTRATOR:
      return HEALTH_ADMINISTRATOR_MENU;
    case ROLES.PATIENT:
      return PATIENT_MENU;
    case ROLES.PHARMACIST:
      return PHARMACIST_MENU;
    case ROLES.GUEST:
      return HOME_MENU;
    default:
      return HOME_MENU;
  }
};
export const camelCaseToTitle = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};
