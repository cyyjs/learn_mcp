/*
 * @Author: cyy
 * @Date: 2025-06-06 11:56:29
 * @LastEditors: cyy
 * @LastEditTime: 2025-06-06 12:49:58
 * @Description: 创建一个加法工具
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Addition Tool",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  "Add two numbers",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
// 乘法
server.tool("multiply",
  "Multiply two numbers",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a * b) }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);