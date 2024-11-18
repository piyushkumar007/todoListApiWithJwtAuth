import {app} from './app';

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});