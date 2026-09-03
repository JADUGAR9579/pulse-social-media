import { runtimeUsers } from '../mock/users';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Simulate async network latency */
const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

/** Minimal JWT-shaped token (not cryptographically signed — mock only) */
function createMockToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      username: user.username,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    })
  );
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
}

/** Strip the password before returning a user object to the store */
function sanitize(user) {
  const { password, ...safe } = user;
  return safe;
}

// ─── Auth service ─────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Login — accepts email OR username + password.
   * Returns { user, token }.
   */
  async login({ identifier, password, rememberMe }) {
    await delay();

    const user = runtimeUsers.find(
      (u) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials. Try alex@pulse.dev / Password1');
    }

    const token = createMockToken(user);

    // Persist per rememberMe preference
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('pulse_token', token);
    storage.setItem('pulse_user', JSON.stringify(sanitize(user)));

    return { user: sanitize(user), token };
  },

  /**
   * Signup — creates a new runtime user and auto-logs them in.
   * Returns { user, token }.
   */
  async signup({ name, username, email, password }) {
    await delay(800);

    const emailTaken = runtimeUsers.some((u) => u.email === email);
    if (emailTaken) throw new Error('An account with this email already exists.');

    const usernameTaken = runtimeUsers.some((u) => u.username === username);
    if (usernameTaken) throw new Error('That username is already taken.');

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      username,
      email,
      password,
      avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${username}`,
      bio: '',
      location: '',
      website: '',
      followers: 0,
      following: 0,
      verified: false,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    runtimeUsers.push(newUser);

    const token = createMockToken(newUser);
    sessionStorage.setItem('pulse_token', token);
    sessionStorage.setItem('pulse_user', JSON.stringify(sanitize(newUser)));

    return { user: sanitize(newUser), token };
  },

  /** Logout — clears both storage buckets */
  logout() {
    localStorage.removeItem('pulse_token');
    localStorage.removeItem('pulse_user');
    sessionStorage.removeItem('pulse_token');
    sessionStorage.removeItem('pulse_user');
  },

  /** Rehydrate auth state on app load — returns { user, token } or null */
  getStoredSession() {
    const token =
      localStorage.getItem('pulse_token') ||
      sessionStorage.getItem('pulse_token');
    const raw =
      localStorage.getItem('pulse_user') ||
      sessionStorage.getItem('pulse_user');

    if (!token || !raw) return null;

    try {
      return { user: JSON.parse(raw), token };
    } catch {
      return null;
    }
  },

  /**
   * Forgot password — in production sends a reset email.
   * Mock: just simulates the call and returns success.
   */
  async forgotPassword({ email }) {
    await delay(700);
    const exists = runtimeUsers.some((u) => u.email === email);
    // Always succeed (security: don't reveal which emails exist)
    return {
      message: exists
        ? 'Reset link sent! Check your inbox.'
        : 'If that email is registered, a reset link has been sent.',
    };
  },

  /**
   * Verify OTP — mock always accepts "123456".
   */
  async verifyOtp({ otp }) {
    await delay(500);
    if (otp !== '123456') throw new Error('Incorrect code. (Hint: use 123456)');
    return { verified: true };
  },
};
