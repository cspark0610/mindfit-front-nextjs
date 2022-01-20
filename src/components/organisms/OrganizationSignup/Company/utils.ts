// types
import { CompanyDataType } from 'types/models/Company'

export const validateCompanySignup = (companyData: CompanyDataType) => {
  if (!companyData.name || !companyData.about || !companyData.profilePicture)
    return false

  return true
}
