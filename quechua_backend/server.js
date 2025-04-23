const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // ✅ Correcto


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rassielperez46:0QeYhTGPvfqFudYI@cluster0.itkzxn2.mongodb.net/quechuaDB?retryWrites=true&w=majority')
.then(() => console.log("✅ Conectado a MongoDB"))
.catch((err) => console.error("❌ Error al conectar MongoDB", err));


app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));

module.exports = app; //  Supertest 
