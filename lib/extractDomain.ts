import { excludedDomains } from "./excludedDomains";

export const extractEmailDomain = (email: string): string => {
  const [user, domain] = email.toLowerCase().split('@');
  const domainParts = domain.split('.');
  // Check if the domain is not in the excluded list
  console.log(domainParts)
  if (!excludedDomains.includes(domainParts[0])) {
    return domainParts[0];
  } 
  const isolatedDomain = domainParts[0];
  console.log(isolatedDomain)
  return isolatedDomain;
}

export const isDomainInExcludedList = (domain: string): boolean => {
  return excludedDomains.includes(domain);
}
