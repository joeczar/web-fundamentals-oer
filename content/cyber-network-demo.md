---
title: Cyberpunk Network Visualizations
description: Interactive animated diagrams showing how the internet works
---

# Cyberpunk Network Visualizations

These animated diagrams show the progression from simple computer connections to the full internet infrastructure.

## 1. Direct Connection

The simplest network: two computers connected by a single cable.

::cyber-network{diagram="two-computers"}
::

## 2. The Mesh Problem

What happens when we add more computers? With 5 computers, we need **10 cables** (n×(n-1)/2).

::cyber-network{diagram="mesh"}
::

This quickly becomes unmanageable as the network grows!

## 3. The Solution: Switches

A switch acts as a central hub. Now we only need **5 cables** - one per computer.

::cyber-network{diagram="switch"}
::

The switch intelligently routes packets only to their intended destination.

## 4. Connecting Networks with Routers

Routers bridge separate networks, enabling communication across network boundaries.

::cyber-network{diagram="router"}
::

Notice how packets travel through the router when going from Network A to Network B.

## 5. The Full Internet Stack

The complete journey from your computer to a web server:

::cyber-network{diagram="full-stack"}
::

**Your PC** → **Switch** → **Modem** → **ISP** → **Internet** → **Server**

## 6. DNS Resolution

How "example.com" becomes an IP address:

::cyber-network{diagram="dns"}
::

The recursive lookup process: Browser → Resolver → Root → TLD → Authoritative DNS → back with IP address.

---

## Component Options

All diagrams support these props:

- `diagram` - Which diagram to show (required)
- `animated` - Enable/disable packet animation (default: true)
- `showLabels` - Show/hide node labels (default: true)
- `showGlitch` - Enable/disable glitch effect (default: true)
