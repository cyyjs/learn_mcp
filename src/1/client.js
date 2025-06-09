/*
 * @Author: cyy
 * @Date: 2025-06-06 11:56:29
 * @LastEditors: cyy
 * @LastEditTime: 2025-06-09 14:18:32
 * @Description: 客户端调用示例
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Anthropic } from "@anthropic-ai/sdk";
import dotenv from 'dotenv';
dotenv.config();

const anthropic = new Anthropic({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: 'xx',
});

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


const toolsResult = await client.listTools();
console.log(JSON.stringify(toolsResult, null, 2))

const response = await anthropic.messages.create({
  messages: [{ role: 'user', content: '8加9再乘5等于多少？' }],
  model: 'Qwen-72B-Chat',
  max_tokens: 1000,
  tools: toolsResult.tools,
})
console.log(response)
for (const content of response.content) {
  console.log(content)
  // if (content.type === 'tool_use') {
  //   const r = await client.callTool({
  //     name: content.name,
  //     arguments: content.input
  //   })
  //   console.log(r)
  // } else {
  //   console.log(content)
  // }
}