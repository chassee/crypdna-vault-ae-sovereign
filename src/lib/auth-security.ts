/**
 * Security utilities for the CrypDNA Vault authentication system.
 * Provides reusable, scalable logic for authorization enforcement.
 * 
 * SECURITY NOTES:
 * - Never expose internal auth logic to unauthorized users
 * - Never log sensitive data in production
 * - All authorization checks should be reusable and testable
 */

import { Session, User } from '@supabase/supabase-js';

export interface AuthorizationResult {
  authorized: boolean;
  reason?: string; // Internal only - never expose to client
}

/**
 * Validates if a user session is authorized to access the Vault.
 * 
 * Current checks:
 * - Valid session exists
 * - User object is present
 * - Session is not expired
 * 
 * Future extensibility:
 * - Invite validation via database lookup
 * - Admin approval state
 * - Regional access control
 * - Subscription status
 */
export function validateVaultAuthorization(
  session: Session | null,
  user: User | null
): AuthorizationResult {
  // No session = not authorized
  if (!session) {
    return { authorized: false, reason: 'no_session' };
  }

  // No user in session = invalid state
  if (!user) {
    return { authorized: false, reason: 'no_user' };
  }

  // Check session expiration
  const expiresAt = session.expires_at;
  if (expiresAt && expiresAt * 1000 < Date.now()) {
    return { authorized: false, reason: 'session_expired' };
  }

  // Future: Add invite/approval checks here
  // Example: const isApproved = await checkInviteStatus(user.id);
  // if (!isApproved) return { authorized: false, reason: 'not_approved' };

  return { authorized: true };
}

/**
 * Logs unauthorized access attempts in a safe, non-intrusive way.
 * 
 * In development: Logs to console
 * In production: Could be extended to send to monitoring service
 * 
 * SECURITY: Never log sensitive user data or session tokens
 */
export function logUnauthorizedAccess(
  attemptType: 'route_access' | 'api_call' | 'direct_url',
  metadata?: {
    path?: string;
    timestamp?: Date;
  }
): void {
  const logEntry = {
    type: 'unauthorized_access_attempt',
    attemptType,
    path: metadata?.path || 'unknown',
    timestamp: (metadata?.timestamp || new Date()).toISOString(),
    // Never log: user agents, IPs, session tokens, or other PII
  };

  // Safe logging - no sensitive data exposed
  if (process.env.NODE_ENV === 'development') {
    console.warn('[SECURITY]', logEntry);
  }

  // Future: Send to monitoring service
  // await sendToSecurityMonitoring(logEntry);
}

/**
 * Generates a generic, secure error message for unauthorized access.
 * Never reveals internal auth logic or specific failure reasons.
 */
export function getSecureAccessDeniedMessage(): string {
  return 'This vault is restricted to verified members only. Access requires an invitation from an existing member.';
}
