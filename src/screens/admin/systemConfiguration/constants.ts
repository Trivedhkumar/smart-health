export const ADMIN_SETTINGS = [
  {
    setting: "Enable user profile editing",
    id: "user-profile-editing",
    description: "Allow users to modify their basic profile information.",
  },
  {
    setting: "Enable password resets by email",
    id: "password-reset-email",
    description: "Allow users to request password resets via email.",
  },
  {
    setting: "Require two-factor authentication (2FA)",
    id: "two-factor-auth",
    description: "Enforce 2FA for all user accounts for added security.",
  },
  {
    setting: "Allow user account deletion",
    id: "user-account-deletion",
    description: "Permit users to delete their own accounts permanently.",
  },
  {
    setting: "Enable email notifications for admins",
    id: "admin-email-notifications",
    description:
      "Notify admins about new user registrations, password resets, etc.",
  },
  {
    setting: "Allow users to upload profile pictures",
    id: "user-profile-pictures",
    description:
      "Enable users to personalize their accounts with profile images.",
  },
  {
    setting: "Display user activity logs to admins",
    id: "user-activity-logs",
    description:
      "Grant admins access to logs of user actions within the system.",
  },
  {
    setting: "Enable user registration via social media",
    id: "social-media-registration",
    description:
      "Allow users to create accounts using their social media credentials.",
  },
  {
    setting: "Define default user roles and permissions",
    id: "default-user-roles",
    description:
      "Set the access levels and permissions for newly created users.",
  },
  {
    setting: "Require email verification for new accounts",
    id: "email-verification",
    description:
      "Ensure users confirm their email addresses before full account access.",
  },
];
