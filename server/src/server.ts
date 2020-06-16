import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

// no produção deverá ser assim:
// app.use(cors({
//     origin: 'www.'
// }));
app.use(cors());
app.use(express.json());
app.use(routes);
import { errors } from 'celebrate';

// Para fornecer arquivos estáticos:
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);