#!/usr/bin/env node

import { formatIPUrl, getPrimaryIP, getLocalIPs } from "./index";

// Define command-line arguments
const args = process.argv.slice(2);

// Help command
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: ip-url [options] [port]

Options:
  --protocol, -p <protocol>  Protocol to use (http or https). Default: http.
  --family, -f <family>      IP version family (IPv4 or IPv6). Default: IPv4.
  --all                      Show all available IP addresses.
  --help, -h                 Show this help message.

Examples:
  ip-url                   Output http://your-ip:3000
  ip-url 8080              Output http://your-ip:8080
  ip-url --protocol https  Output https://your-ip:3000
  ip-url --all             List all available IP addresses
  `);
  process.exit(0);
}

// Show all IP addresses
if (args.includes("--all")) {
  const ipv4Addresses = getLocalIPs("IPv4");
  const ipv6Addresses = getLocalIPs("IPv6");

  console.log("IPv4 Addresses:");
  ipv4Addresses.forEach((ip) => console.log(`  ${ip}`));

  console.log("\nIPv6 Addresses:");
  ipv6Addresses.forEach((ip) => console.log(`  ${ip}`));

  process.exit(0);
}

// Parse arguments
let port = 3000;
let protocol: "http" | "https" = "http";
let family: "IPv4" | "IPv6" = "IPv4";

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === "--protocol" || arg === "-p") {
    protocol = args[i + 1] as "http" | "https";
    i++;
  } else if (arg === "--family" || arg === "-f") {
    family = args[i + 1] as "IPv4" | "IPv6";
    i++;
  } else if (!isNaN(parseInt(arg))) {
    port = parseInt(arg);
  }
}

// Get and display the IP URL
const ip = getPrimaryIP(family);
if (!ip) {
  console.error(`No ${family} address found.`);
  process.exit(1);
}

const url = formatIPUrl(port, protocol, family);
console.log(url);
