const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/startup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  telefone: String,
});

const User = mongoose.model('User', userSchema);

// Endpoint para verificar se o usuário existe
app.post('/api/check-user', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

// Endpoint para registrar novo usuário
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, telefone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'E-mail e senha são necessários.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Usuário já cadastrado.' });
    }

    const user = new User({ email, password, telefone });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
});

// Endpoint para login (verifica email + senha)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'E-mail e senha são necessários.' });

    const user = await User.findOne({ email, password });
    if (user) {
      return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
