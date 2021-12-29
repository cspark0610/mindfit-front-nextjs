// types
import { CompanyDataType } from 'types/models/Company'

export const validateCompanySignup = (companyData: CompanyDataType) => {
  if (
    !companyData.name ||
    !companyData.phone ||
    !companyData.email ||
    !companyData.picture
  )
    return false

  return true
}
