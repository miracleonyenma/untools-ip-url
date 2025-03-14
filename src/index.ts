import { networkInterfaces } from "os";

/**
 * Gets the local IP address(es) of the machine.
 * @param family - The IP version family to use (IPv4 or IPv6). Default is 'IPv4'.
 * @param skipInternal - Whether to skip internal interfaces (like loopback). Default is true.
 * @returns An array of IP addresses.
 */
export function getLocalIPs(
  family: "IPv4" | "IPv6" = "IPv4",
  skipInternal: boolean = true,
): string[] {
  const interfaces = networkInterfaces();
  const results: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      // Skip internal interfaces if specified
      if (skipInternal && iface.internal) {
        continue;
      }

      // Filter by family (IPv4 or IPv6)
      if (iface.family === family) {
        results.push(iface.address);
      }
    }
  }

  return results;
}

/**
 * Gets the primary local IP address.
 * @param family - The IP version family to use (IPv4 or IPv6). Default is 'IPv4'.
 * @returns The primary IP address or undefined if not found.
 */
export function getPrimaryIP(
  family: "IPv4" | "IPv6" = "IPv4",
): string | undefined {
  const ips = getLocalIPs(family);
  return ips.length > 0 ? ips[0] : undefined;
}

/**
 * Formats a URL with the IP address instead of localhost.
 * @param port - The port number to use.
 * @param protocol - The protocol to use (http or https). Default is 'http'.
 * @param family - The IP version family to use (IPv4 or IPv6). Default is 'IPv4'.
 * @returns The formatted URL or undefined if IP not found.
 */
export function formatIPUrl(
  port: number,
  protocol: "http" | "https" = "http",
  family: "IPv4" | "IPv6" = "IPv4",
): string | undefined {
  const ip = getPrimaryIP(family);
  if (!ip) {
    return undefined;
  }

  // For IPv6, we need to wrap the address in square brackets
  const formattedIP = family === "IPv6" ? `[${ip}]` : ip;
  return `${protocol}://${formattedIP}:${port}`;
}

// If this file is being executed directly, run the CLI logic
if (require.main === module) {
  const args = process.argv.slice(2);
  const port = parseInt(args[0]) || 3000;
  const protocol = (args[1] as "http" | "https") || "http";
  const family = (args[2] as "IPv4" | "IPv6") || "IPv4";

  const url = formatIPUrl(port, protocol, family);
  if (url) {
    console.log(url);
  } else {
    console.error(`No ${family} address found.`);
    process.exit(1);
  }
}
