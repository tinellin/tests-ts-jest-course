
export enum PasswordErrors {
  SHORT = "Password is too short.",
  NO_UPPERCASE = "Password must contain at least one uppercase letter.",
  NO_LOWERCASE = "Password must contain at least one lowercase letter.",
  NO_NUMBER = "Password must contain at least one number.",
}

export type CheckResult = {
  valid: boolean;
  reasons: PasswordErrors[]
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];

    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }

    if (password === password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPERCASE);
    }

    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWERCASE);
    }

    return {
      valid: reasons.length === 0 ? true : false,
      reasons
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const { reasons } = this.checkPassword(password);
    this.checkNumber(password, reasons);

    return {
      valid: reasons.length === 0 ? true : false,
      reasons: reasons
    }
  }

  private checkNumber(password: string, reasons: PasswordErrors[]) {
    const hasNumber = /\d/

    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_UPPERCASE);
    }
  }
}