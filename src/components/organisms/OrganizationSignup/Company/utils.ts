// types
import { CompanyDataType } from 'types/models/Company'

export const validateCompanySignup = (companyData: CompanyDataType) => {
  if (!companyData.name || !companyData.description || !companyData.picture)
    return false

  return true
}
