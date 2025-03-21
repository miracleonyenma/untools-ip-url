# @untools/ip-url

A simple utility to get the local IP address of your machine and format URLs with it instead of using "localhost".

## Installation

### Global Installation

```bash
npm install -g @untools/ip-url
```

### Local Installation

```bash
npm install @untools/ip-url
```

## Usage

### As a CLI Tool

After installing globally, you can use it as follows:

```bash
# Get the default URL (http://your-ip:3000)
ip-url

# Specify a port
ip-url 8080

# Use HTTPS
ip-url --protocol https

# Use IPv6
ip-url --family IPv6

# Show all available IP addresses
ip-url --all

# Get help
ip-url --help
```

### As a Library

```typescript
import { getPrimaryIP, formatIPUrl, getLocalIPs } from '@untools/ip-url';

// Get the primary IP address
const ip = getPrimaryIP(); // Returns something like '192.168.1.5'

// Format a URL with the IP address
const url = formatIPUrl(3000); // Returns 'http://192.168.1.5:3000'

// Custom protocol and port
const httpsUrl = formatIPUrl(8080, 'https'); // Returns 'https://192.168.1.5:8080'

// Get all IP addresses
const allIPs = getLocalIPs(); // Returns an array of IP addresses
```

## API

### `getPrimaryIP(family?: 'IPv4' | 'IPv6'): string | undefined`

Returns the primary IP address of the machine.

### `formatIPUrl(port: number, protocol?: 'http' | 'https', family?: 'IPv4' | 'IPv6'): string | undefined`

Returns a formatted URL with the IP address instead of localhost.

### `getLocalIPs(family?: 'IPv4' | 'IPv6', skipInternal?: boolean): string[]`

Returns an array of all IP addresses on the machine.

## License

MIT
