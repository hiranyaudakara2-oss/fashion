import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import { Server } from "socket.io";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json());

  // Simple JSON-based storage for CMS content
  const CONTENT_FILE = path.join(process.cwd(), "cms-content.json");
  
  // Initial default content
  const defaultContent = {
    hero: {
      title: "DRAGHO",
      subtitle: "Fashion Shop",
      buttonText: "Shop Now"
    },
    broadcast: {
      enabled: false,
      message: "Welcome to DRAGHO!",
      type: "info" // info, warning, success
    },
    theme: {
      bgColor: "#050505"
    },
    products: [
      { id: 1, name: "Obsidian Trench", price: "$890", category: "Outerwear", image: "https://images.unsplash.com/photo-1550614000-4b95d41582e8?q=80&w=1000&auto=format&fit=crop", color: "#171E27" },
      { id: 2, name: "Crimson Silk Blouse", price: "$450", category: "Tops", image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1000&auto=format&fit=crop", color: "#8B0000" },
      { id: 3, name: "Midnight Silk Dress", price: "$520", category: "Tops", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop", color: "#191970" },
      { id: 4, name: "Urban Cargo Pants", price: "$320", category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", color: "#556B2F" }
    ]
  };

  // Ensure content file exists
  if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
  }

  // Socket.io connection handling
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    // Send initial content on connection
    const content = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    socket.emit("content-update", content);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // API Routes
  app.get("/api/content", (req, res) => {
    const content = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    res.json(content);
  });

  app.post("/api/content", (req, res) => {
    const { password, content } = req.body;
    
    // Simple password check
    if (password !== "123") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
    
    // Broadcast update to all connected clients
    io.emit("content-update", content);
    
    res.json({ success: true, content });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
