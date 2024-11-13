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

---

## Shared: package.json의 version 수정

```bash
npm version patch # 패치 버전 업데이트 (0.0.x)
npm version minor # 마이너 버전 업데이트 (0.x.0)
npm version major # 메이저 버전 업데이트 (x.0.0)

npm publish
```
