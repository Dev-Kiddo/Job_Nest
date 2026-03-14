import app from "./index.js";
import { connectDb } from "./config/dbConfig.js";

const PORT = process.env.PORT || 3000;

(async function () {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {}
})();
