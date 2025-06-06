/*
 * @Author: cyy
 * @Date: 2025-06-06 11:56:29
 * @LastEditors: cyy
 * @LastEditTime: 2025-06-06 12:26:42
 * @Description: 客户端调用示例
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["src/1/server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

// Call a tool
const result = await client.callTool({
  name: "add",
  arguments: {
    a: 11,
    b: 22
  }
});

console.log(result)