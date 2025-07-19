import 'dotenv/config';
import app from './app.js';

const port = +process.env.APP_PORT;

app.listen(port, () => console.log(`🚀 App is running at port ${port}...`));
