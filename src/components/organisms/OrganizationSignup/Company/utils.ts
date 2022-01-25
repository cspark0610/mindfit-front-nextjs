// types
import { OrganizationDataType } from 'types/models/Organization'

export const validateCompanySignup = (companyData: OrganizationDataType) => {
  if (!companyData.name || !companyData.about || !companyData.profilePicture)
    return false

  return true
}
