# Carbonlink

This repository contains shared packages for the Carbonlink project.

## Packages

### @carbonlink/types

TypeScript definitions for emission calculation and reporting.

## Installation

```bash
# Install types package
npm install @carbonlink/types
```

## Usage

```typescript
import { EmissionScope, GreenHouseGas } from "@carbonlink/types";

// Use the types in your code
const scope: EmissionScope = EmissionScope.SCOPE_1;
```

## Development

```bash
# Install dependencies
cd types
npm install

# Build
npm run build

# Publish
npm publish
```