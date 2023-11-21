import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;
  const cluster = '@cluster0.vlc6aub.mongodb.net';
  const database = 'DatabaseExample';
  const uri = `mongodb+srv://${user}:${passwd}${cluster}/${database}?retryWrites=true&w=majority`;

  return mongoose.connect(uri);
};
