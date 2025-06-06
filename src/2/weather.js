/*
 * @Author: cyy
 * @Date: 2025-06-06 16:26:59
 * @LastEditors: cyy
 * @LastEditTime: 2025-06-06 16:48:42
 * @Description: 获取天气信息
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const URL = `https://api.seniverse.com/v3/weather/now.json?key=${process.env.API_KEY}&language=zh-Hans&unit=c&location=`
// Create an MCP server
const server = new McpServer({
  name: "Weather Tool",
  version: "1.0.0"
})

// Add a weather tool
server.tool("weather",
  "Get weather information",
  {
    city: z.string().describe("The city to get weather information for")
  },
  async ({ city }) => {
    const response = await fetch(URL + city);
    const data = await response.json();
    const weather = data.results[0].now;
    return {
      content: [{ type: "text", text: JSON.stringify(weather) }]
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);