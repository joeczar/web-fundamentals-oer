---
title: Content Kitchen Sink
description: A demonstration of all available content components and formatting options
navigation: false
---

# Content Kitchen Sink

This page demonstrates all available content components and formatting options. Use this as a reference when writing educational content.

## Typography

This is a paragraph with **bold text**, *italic text*, and `inline code`. You can also use ~~strikethrough~~ and combine **_bold italic_** styles.

### Heading Level 3

Regular paragraph text follows headings. The prose styling ensures proper spacing and readability.

#### Heading Level 4

Even deeper nesting is supported for complex content structures.

---

## Links

- [Internal link to About page](/about)
- [External link to MDN](https://developer.mozilla.org) (notice the external indicator)

## Lists

### Unordered List

- First item
- Second item with a longer description that might wrap to multiple lines
- Third item
  - Nested item one
  - Nested item two

### Ordered List

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B

## Blockquotes

> "The internet is the first thing that humanity has built that humanity doesn't understand."
>
> — Eric Schmidt

## Code Examples

### Inline Code

Use the `console.log()` function to debug your JavaScript code. The `http` module in Node.js handles HTTP requests.

### Code Blocks

```javascript
// A simple HTTP server example
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

```python
# Python equivalent
from http.server import HTTPServer, SimpleHTTPRequestHandler

def run_server(port=3000):
    server = HTTPServer(('', port), SimpleHTTPRequestHandler)
    print(f'Server running at http://localhost:{port}/')
    server.serve_forever()

if __name__ == '__main__':
    run_server()
```

```bash
# Run a simple HTTP server
python -m http.server 3000
```

## Callouts

::callout{type="info"}
DNS (Domain Name System) translates human-readable domain names like `example.com` into IP addresses like `93.184.216.34`.
::

::callout{type="tip" title="Pro Tip"}
Use `nslookup` or `dig` commands to troubleshoot DNS issues locally before checking your server configuration.
::

::callout{type="warning"}
Changing DNS settings can take up to 48 hours to propagate globally. Plan your changes accordingly.
::

::callout{type="success" title="Checkpoint Complete"}
You've learned the basics of DNS resolution. Time to put this knowledge into practice!
::

::callout{type="error" title="Common Mistake"}
Never expose your DNS server to the public internet without proper security measures. This can lead to DNS amplification attacks.
::

## Step-by-Step Guides

::steps
::step{title="Register a Domain" step="1"}
Choose a domain registrar (like Namecheap, Google Domains, or Cloudflare) and search for your desired domain name.
::

::step{title="Configure DNS Records" step="2"}
Point your domain to your hosting provider by updating the nameserver records or adding A/AAAA records.
::

::step{title="Verify Configuration" step="3"}
Use `nslookup yourdomain.com` to verify that DNS is resolving correctly to your server's IP address.
::

::step{title="Enable HTTPS" step="4"}
Set up SSL/TLS certificates using Let's Encrypt or your hosting provider's certificate service.
::
::

## Diagrams

### Sequence Diagram

::mermaid
sequenceDiagram
    participant B as Browser
    participant R as DNS Resolver
    participant Root as Root Server
    participant TLD as TLD Server
    participant Auth as Authoritative Server

    B->>R: What is example.com?
    R->>Root: Query for .com
    Root-->>R: TLD Server address
    R->>TLD: Query for example.com
    TLD-->>R: Authoritative NS
    R->>Auth: Query for example.com
    Auth-->>R: 93.184.216.34
    R-->>B: 93.184.216.34
::

### Flowchart

::mermaid{code="flowchart TD\n    A[User Types URL] --> B{URL in Cache?}\n    B -->|Yes| C[Return Cached IP]\n    B -->|No| D[Query DNS Resolver]\n    D --> E[Recursive Lookup]\n    E --> F[Return IP Address]\n    F --> G[Cache Result]\n    G --> H[Connect to Server]\n    C --> H"}
::

## Interactive Animation

::packet-flow{speed="normal"}
::

## Tables

| Protocol | Port | Description |
|----------|------|-------------|
| HTTP | 80 | Unencrypted web traffic |
| HTTPS | 443 | Encrypted web traffic |
| DNS | 53 | Domain name resolution |
| SSH | 22 | Secure shell access |
| FTP | 21 | File transfer protocol |

## Knowledge Check

::quiz{id="dns-basics"}
  ::question{type="multiple-choice"}
  What does DNS stand for?
    ::quiz-option
    Domain Network System
    ::
    ::quiz-option{correct}
    Domain Name System
    ::
    ::quiz-option
    Digital Name Service
    ::
    ::quiz-option
    Distributed Naming Service
    ::
  ::
::

## Images

Images can include captions using the alt text:

![A diagram showing the OSI model layers](/images/osi-model.png)

## Code Groups

::code-group
::code-block{label="JavaScript"}
```js
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data));
```
::

::code-block{label="Python"}
```python
import requests

response = requests.get('https://api.example.com/data')
data = response.json()
print(data)
```
::

::code-block{label="cURL"}
```bash
curl -X GET https://api.example.com/data
```
::
::

---

## Summary

This kitchen sink demonstrates:

1. **Typography** - Headings, paragraphs, emphasis, and inline code
2. **Links** - Internal and external with indicators
3. **Lists** - Ordered, unordered, and nested
4. **Blockquotes** - Styled quotations
5. **Code** - Inline and block with syntax highlighting
6. **Callouts** - Info, tip, warning, success, and error variants
7. **Steps** - Sequential learning guides
8. **Diagrams** - Mermaid sequence and flowcharts
9. **Animations** - Interactive canvas visualizations
10. **Tables** - Structured data
11. **Quizzes** - Interactive knowledge checks
12. **Code Groups** - Multi-language examples

Use these components to create rich, engaging educational content!
