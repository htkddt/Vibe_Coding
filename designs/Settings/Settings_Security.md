# Settings — Security UX Description

## User goal

Protect the account and manage secure sign-in access.

## Core experience

- **Change password** launches a secure password update flow.
- Two-factor authentication toggle starts setup or disable confirmation.
- Active sessions list shows current device/location context and allows session management.
- **Save changes** confirms any modified preferences.

## Expected behavior

- Sensitive actions require current authentication or re-authentication.
- Two-factor setup explains recovery-code handling and confirms the enrolled method.
- Session revocation identifies the device/session and asks for confirmation.
- Success/error feedback must not expose sensitive security details.

## Navigation

Reached from the Security tab in Settings; can redirect to Sign-in after password/session changes.
