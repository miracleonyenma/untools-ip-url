# @untools/ip-url

A simple utility to get the local IP address of your machine and format URLs with it instead of using "localhost".

## Installation

### Global Installation

```bash
npm install -g local-ip-url
```

### Local Installation

```bash
npm install local-ip-url
```

## Usage

### As a CLI Tool

After installing globally, you can use it as follows:

```bash
# Get the default URL (http://your-ip:3000)
local-ip

# Specify a port
local-ip 8080

# Use HTTPS
local-ip --protocol https

# Use IPv6
local-ip --family IPv6

# Show all available IP addresses
local-ip --all

# Get help
local-ip --help
```

### As a Library

```typescript
import { getPrimaryIP, formatIPUrl, getLocalIPs } from 'local-ip-url';

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
