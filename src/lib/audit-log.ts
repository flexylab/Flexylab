import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

export interface AuditLog {
  timestamp: string;
  action: string;
  userId?: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  status: 'success' | 'failure';
  error?: string;
}

export function logAudit(log: AuditLog) {
  const logFile = path.join(logsDir, `audit-${new Date().toISOString().split('T')[0]}.log`);
  
  const logEntry = {
    ...log,
    timestamp: new Date().toISOString(),
  };

  fs.appendFileSync(
    logFile,
    JSON.stringify(logEntry) + '\n'
  );

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[AUDIT]', logEntry);
  }
}

export function logSecurityEvent(
  action: string,
  userId: string | undefined,
  email: string | undefined,
  details: Record<string, any> = {}
) {
  logAudit({
    action,
    userId,
    email,
    timestamp: new Date().toISOString(),
    details,
    status: 'success',
  });
}

export function logSecurityError(
  action: string,
  error: string,
  userId: string | undefined,
  email: string | undefined,
  details: Record<string, any> = {}
) {
  logAudit({
    action,
    userId,
    email,
    timestamp: new Date().toISOString(),
    error,
    details,
    status: 'failure',
  });
}
