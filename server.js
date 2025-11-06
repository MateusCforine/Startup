const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

mongoose
  .connect('mongodb://localhost:27017/startup')
  .then(() => console.log('Conectado ao MongoDB em mongodb://localhost:27017/startup'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  telefone: String,
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema(
  {
    autor: String,
    tag: String,
    img: String,
    likes: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

app.post('/api/check-user', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: Boolean(user) });
});

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

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'E-mail e senha são necessários.' });
    }

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

async function seedPosts() {
  const count = await Post.countDocuments();
  if (count === 0) {
    await Post.insertMany([
      {
        autor: 'Outback',
        tag: '#promo',
        img: '/Outback.jpeg',
        likes: 53200,
        comments: ['Bora!', 'Quero muito provar.'],
      },
      {
        autor: 'Coco Bambu',
        tag: '#seafood',
        img: '/cocobambu.png',
        likes: 27400,
        comments: ['Incrível!', 'Melhor camarão da cidade'],
      },
      {
        autor: 'Corbucci',
        tag: '#desafio',
        img: '/Corbucci.jpeg',
        likes: 18800,
        comments: ['Monstro!', 'Como consegue?'],
      },
      {
        autor: 'Masterchef',
        tag: '#cozinha',
        img: '/masterchef.png',
        likes: 40100,
        comments: ['Que prato lindo!', 'Chef aprovado.'],
      },
    ]);
    console.log('Seeded initial posts');
  }
}

app.get('/api/posts', async (req, res) => {
  try {
    const { q } = req.query;
    const where = q
      ? {
          $or: [
            { autor: { $regex: String(q), $options: 'i' } },
            { tag: { $regex: String(q), $options: 'i' } },
          ],
        }
      : {};
    const posts = await Post.find(where).sort({ createdAt: -1 });
    res.json(
      posts.map((p) => ({
        _id: p._id,
        autor: p.autor,
        tag: p.tag,
        img: p.img,
        likes: p.likes,
        comments: p.comments.length,
        commentsList: p.comments,
        tempo: 'agora',
      }))
    );
  } catch (err) {
    console.error('Erro ao listar posts:', err);
    res.status(500).json({ message: 'Erro interno.' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { autor, tag, img } = req.body;
    const created = await Post.create({ autor, tag, img });
    res.status(201).json(created);
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ message: 'Erro interno.' });
  }
});

app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { delta } = req.body;
    if (![1, -1].includes(Number(delta))) {
      return res.status(400).json({ message: 'delta inválido' });
    }
    const updated = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: Number(delta) } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }
    res.json({ likes: updated.likes });
  } catch (err) {
    console.error('Erro ao atualizar like:', err);
    res.status(500).json({ message: 'Erro interno.' });
  }
});

app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text || !String(text).trim()) {
      return res.status(400).json({ message: 'Comentário vazio.' });
    }
    const updated = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: String(text).trim() } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }
    res.json({ comments: updated.comments.length, commentsList: updated.comments });
  } catch (err) {
    console.error('Erro ao adicionar comentário:', err);
    res.status(500).json({ message: 'Erro interno.' });
  }
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname) || '';
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9_-]/gi, '_');
    cb(null, `${Date.now()}_${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^(image|video)\//.test(file.mimetype);
    cb(ok ? null : new Error('Tipo de arquivo não suportado'), ok);
  },
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo ausente' });
    }
    const url = `/uploads/${req.file.filename}`;
    const absolute = `${req.protocol}://${req.get('host')}${url}`;
    res.json({ url: absolute, path: url });
  } catch (e) {
    console.error('Erro no upload:', e);
    res.status(500).json({ message: 'Erro no upload' });
  }
});

const PORT = 3001;
console.log('Iniciando servidor Express...');
app.listen(PORT, async () => {
  await seedPosts();
  console.log(`Server running on port ${PORT}`);
});
