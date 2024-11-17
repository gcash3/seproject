// src/lib/password-validation.ts
export const passwordCriteria = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumbers: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
  };
  
  export interface PasswordStrength {
    isValid: boolean;
    criteria: {
      minLength: boolean;
      hasUpperCase: boolean;
      hasLowerCase: boolean;
      hasNumbers: boolean;
      hasSpecialChar: boolean;
    };
  }
  
  export function validatePassword(password: string): PasswordStrength {
    const strength = {
      isValid: false,
      criteria: {
        minLength: password.length >= passwordCriteria.minLength,
        hasUpperCase: passwordCriteria.hasUpperCase.test(password),
        hasLowerCase: passwordCriteria.hasLowerCase.test(password),
        hasNumbers: passwordCriteria.hasNumbers.test(password),
        hasSpecialChar: passwordCriteria.hasSpecialChar.test(password)
      }
    };
  
    strength.isValid = Object.values(strength.criteria).every(Boolean);
    return strength;
  }