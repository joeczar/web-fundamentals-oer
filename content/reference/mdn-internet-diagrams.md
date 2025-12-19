---
title: MDN Internet Diagrams Reference
description: Reference images from MDN's "How does the Internet work?" article for educational content development
---

# MDN Internet Diagrams Reference

Source: [MDN - How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)

These diagrams illustrate the progression from simple computer connections to the full internet infrastructure.

---

## 1. Two Computers Linked Together

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-1.png`

**Concept:** Point-to-point connection

**Description:** The most basic network setup showing two computers connected directly by a physical cable (typically Ethernet). This illustrates the foundational concept of direct communication between two machines. Each computer can send and receive data to/from the other through this simple link.

**Use for:** Introducing the concept of networked computers, explaining that a "network" at its simplest is just two connected devices.

---

## 2. Ten Computers All Together

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-2.png`

**Concept:** The scaling problem with direct connections

**Description:** Demonstrates why direct point-to-point connections don't scale. With 10 computers, each would need 9 connections (one to every other computer), resulting in 45 total cables. The formula is `n(n-1)/2` where n is the number of computers. This "mesh" topology quickly becomes impractical as networks grow.

**Use for:** Explaining why we need networking infrastructure (switches/routers), demonstrating the combinatorial explosion of direct connections.

---

## 3. Ten Computers with a Switch

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-3.png`

**Concept:** The network switch as a solution

**Description:** Shows a network switch (or hub) in the center with 10 computers connected via individual cables radiating outward. The switch acts as a central traffic controller, receiving messages and forwarding them only to their intended recipients. This reduces the cable count from 45 to just 10 (one per computer).

**Use for:** Introducing network switches/hubs, explaining "star topology," demonstrating efficient network design.

---

## 4. Two Switches Linked Together

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-4.png`

**Concept:** Interconnecting networks

**Description:** Two separate switch-based networks connected by linking the switches together. Each switch manages its local network, but messages can pass between networks through the switch-to-switch connection. This is the first step toward building larger internetworks.

**Use for:** Explaining how separate networks communicate, introducing the concept of network interconnection.

---

## 5. Switches Linked to Switches

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-5.png`

**Concept:** Hierarchical network topology

**Description:** A tree-like structure with multiple switches connected in a hierarchy. This demonstrates how networks can scale by adding more switches, each managing its own segment. However, this design has a weakness: if a single switch fails, it can disconnect large portions of the network (no redundancy).

**Use for:** Discussing network scalability, introducing concepts of network topology, explaining single points of failure.

---

## 6. A Router Linked to a Modem

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-6.png`

**Concept:** Connecting to external infrastructure

**Description:** Shows the addition of two key devices:
- **Router:** A specialized computer that forwards messages between different networks, determining the best path for data
- **Modem:** (MOdulator-DEModulator) Converts digital network signals to analog signals suitable for transmission over telephone lines, and vice versa

This setup enables a local network to connect to the broader telephone/cable infrastructure.

**Use for:** Explaining routers vs switches, introducing modems, discussing how home networks connect to ISPs.

---

## 7. Full Internet Stack

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-7.png`

**Concept:** Complete internet architecture

**Description:** Comprehensive diagram showing the full internet infrastructure:
- Local networks with their switches and computers
- Routers connecting local networks
- Modems interfacing with telephone/cable infrastructure
- ISP (Internet Service Provider) networks
- Connections between multiple ISPs

This illustrates that "the Internet" is really a network of networks, all interconnected through ISPs and their infrastructure.

**Use for:** Giving the complete picture of internet architecture, explaining the role of ISPs, showing how distributed the internet truly is.

---

## 8. Domain Name and IP Address Relationship

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/dns-ip.png`

**Concept:** DNS aliasing

**Description:** Visual representation showing the relationship between:
- Human-readable domain names (e.g., `google.com`)
- Machine-readable IP addresses (e.g., `142.250.190.78`)

Demonstrates that domain names are essentially "aliases" or friendly names that map to numeric IP addresses through the DNS (Domain Name System).

**Use for:** Introducing DNS concepts, explaining why we use domain names instead of IP addresses, showing the translation process.

---

## 9. Intranet and Extranet

**Image URL:** `https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work/internet-schema-8.png`

**Concept:** Private networks vs the public internet

**Description:** Illustrates the difference between:
- **Intranet:** A private network restricted to a single organization (e.g., a company's internal network)
- **Extranet:** A private network that shares portions of its access with external partners or organizations
- **Internet:** The public, globally accessible network

All three use the same underlying technology (TCP/IP, etc.) but differ in access restrictions.

**Use for:** Explaining enterprise networking concepts, distinguishing private vs public networks, discussing network security boundaries.

---

## Usage Notes

These images are from MDN Web Docs and are available under the [CC-BY-SA 2.5 license](https://creativecommons.org/licenses/by-sa/2.5/). When using these images:

1. Provide attribution to MDN Web Docs
2. Link back to the original article when possible
3. Consider creating original diagrams inspired by these for production use

## Suggested Teaching Order

1. Start with diagrams 1-3 to explain basic networking
2. Use diagrams 4-5 to discuss scaling
3. Introduce diagram 6 for home network concepts
4. Show diagram 7 for the complete picture
5. Use diagram 8 when teaching DNS
6. Reserve diagram 9 for advanced topics on network types
