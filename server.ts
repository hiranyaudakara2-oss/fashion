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
      message: "Welcome to DRAGHO ! Step in and discover the latest trends curated just for you. Happy shopping!",
      type: "info" // info, warning, success
    },
    theme: {
      bgColor: "#050505"
    },
    products: [
      { id: 1, name: "Obsidian Trench", price: "$890", category: "Outerwear", image: "https://images.unsplash.com/photo-1550614000-4b95d41582e8?q=80&w=1000&auto=format&fit=crop", color: "#171E27" },
      { id: 2, name: "Crimson Silk Blouse", price: "$450", category: "Tops", image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1000&auto=format&fit=crop", color: "#8B0000" },
      { id: 3, name: "Midnight Silk Dress", price: "$520", category: "Tops", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop", color: "#191970" },
      { id: 4, name: "Urban Cargo Pants", price: "$320", category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", color: "#556B2F" },
      { id: 5, name: "Ivory Knit Sweater", price: "$280", category: "Knitwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", color: "#F5F5F5" },
      { id: 6, name: "Noir Leather Jacket", price: "$1,200", category: "Outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop", color: "#0A0A0A" },
      { id: 7, name: "Azure Denim Jeans", price: "$240", category: "Bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop", color: "#1E3A8A" },
      { id: 8, name: "Emerald Velvet Blazer", price: "$650", category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop", color: "#064E3B" },
      { id: 9, name: "Midnight Aviators", price: "$180", category: "Accessories", image: "https://images.unsplash.com/photo-1511499767390-903390e6fbc4?q=80&w=1000&auto=format&fit=crop", color: "#000000" },
      { id: 10, name: "Onyx Leather Boots", price: "$420", category: "Shoes", image: "https://images.unsplash.com/photo-1520639889313-7272a74b1c73?q=80&w=1000&auto=format&fit=crop", color: "#1A1A1A" },
      { id: 11, name: "Oversized Hoodie", price: "$180", category: "Tops", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop", color: "#A52A2A" },
      { id: 12, name: "Tailored Blazer", price: "$650", category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop", color: "#006400" },
      { id: 13, name: "Silk Camisole", price: "$190", category: "Tops", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop", color: "#00008B" },
      { id: 14, name: "Chino Shorts", price: "$150", category: "Bottoms", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop", color: "#D2691E" },
      { id: 15, name: "Puffer Vest", price: "$350", category: "Outerwear", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop", color: "#556B2F" },
      { id: 16, name: "Turtleneck Knit", price: "$220", category: "Tops", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", color: "#8B4513" },
      { id: 17, name: "Wide-Leg Trousers", price: "$280", category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", color: "#708090" },
      { id: 18, name: "Cotton Poplin Shirt", price: "$170", category: "Tops", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop", color: "#F5F5DC" },
      { id: 19, name: "Bomber Jacket", price: "$420", category: "Outerwear", image: "https://images.unsplash.com/photo-1548126032-079a0668228e?q=80&w=1000&auto=format&fit=crop", color: "#4682B4" },
      { id: 20, name: "Wrap Dress", price: "$390", category: "Tops", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop", color: "#800080" },
      { id: 21, name: "Men's Slim Fit Shirt", price: "$120", category: "Tops", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop", color: "#F5F5DC" },
      { id: 22, name: "Men's Chino Pants", price: "$140", category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", color: "#556B2F" }
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // SPA fallback for development
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
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
