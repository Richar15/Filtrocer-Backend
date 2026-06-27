import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return res.status(500).json({ error: 'Las credenciales de administrador no están configuradas' });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${username}:${password}`).toString('base64');

      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, token });
    }

    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  } catch {
    return res.status(500).json({ error: 'Error interno del servidor. Intenta de nuevo.' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res.json({ success: true });
});

export default router;
