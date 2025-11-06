# 🚀 Livora Enterprise Intelligence Engine

**A unified, scalable, cloud-native enterprise automation and intelligence platform.**

![Phase](https://img.shields.io/badge/Phase-0%20Foundation-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Team](https://img.shields.io/badge/Team-2%20Engineers-orange)

---

## 📋 Overview

Livora is building a comprehensive enterprise intelligence platform that powers:

- **📊 Real-time Analytics** - Event pipeline → Analytics warehouse → BI dashboards
- **🤖 Automation Engine** - Workflow triggers → Campaign execution → Customer engagement
- **💡 AI/ML Layer** - Predictive insights, churn detection, recommendations
- **📱 Multi-channel Integration** - E-commerce, CRM, WhatsApp, Email, SMS, APIs
- **🔐 Enterprise Security** - GDPR-ready, SOC2-compliant, encrypted data

---

## 🏗️ Current Phase: **0 - Foundation**

**Status:** ✅ Active  
**Duration:** 1 Week (Week 1)  
**Team:** 2 Engineers  
**Goal:** Build local dev environment + AWS foundation

### What's Ready in Phase 0:
✅ Local Docker Compose environment  
✅ AWS CDK infrastructure as code  
✅ GitHub Actions CI/CD pipeline  
✅ Backend API skeleton  
✅ Frontend dashboard shell  
✅ Client SDK foundation  

### Next Up (Phase 1):
🔄 Event Ingestion API  
🔄 Kinesis Stream Setup  
🔄 End-to-end event flow  

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js** v20 or higher
- **npm** v10 or higher
- **Docker** & **Docker Compose**
- **AWS CLI** configured (optional for Phase 0)

### Setup

```bash
# 1. Clone and install
git clone https://github.com/livora-enterprise/enterprise-engine.git
cd enterprise-engine
npm install

# 2. Start all services
docker-compose up

# 3. In separate terminals, start dev servers:
npm run dev -w @livora/backend    # Runs on :3000
npm run dev -w @livora/frontend   # Runs on :5173
```

### Verify Everything Works

```bash
# Backend health check
curl http://localhost:3000/health

# Frontend dashboard
open http://localhost:5173

# All services running
docker-compose ps  # Should show 4 healthy services
```

---

## 📁 Project Structure

```
livora-enterprise/
│
├── 🏗️  infrastructure/
│   ├── src/stacks/
│   │   ├── foundation-stack.ts       # CloudWatch, logging, alarms
│   │   ├── networking-stack.ts       # VPC, subnets, NAT
│   │   └── security-stack.ts         # IAM, KMS, encryption
│   └── cdk.json                       # CDK configuration
│
├── 🔧  backend/
│   ├── src/
│   │   └── index.ts                  # Express server
│   ├── package.json
│   └── tsconfig.json
│
├── 🎨  frontend/
│   ├── src/
│   │   ├── App.tsx                   # Main React component
│   │   └── index.css                 # Styles
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── 📦  packages/
│   └── sdk/                          # Livora SDK for clients
│       ├── src/client.ts
│       └── package.json
│
├── 🐳  Docker setup
│   ├── docker-compose.yml            # Local dev environment
│   └── Dockerfile                    # Backend image
│
├── 🔄  .github/workflows/
│   ├── ci.yml                        # Test, lint, build
│   └── deploy-dev.yml                # Deploy to AWS
│
└── 📚  docs/                         # Comprehensive documentation
    ├── ROADMAP.md                    # 50-week, 16-phase plan
    ├── PHASE_0_GUIDE.md              # Detailed Phase 0 instructions
    ├── PHASE_0_CHECKLIST.md          # Day-by-day checklist
    ├── PHASE_0_COMPLETE.md           # Phase 0 completion summary
    ├── BUILD_COMPLETE_BLUEPRINT.md   # Technical blueprint
    ├── PRE_PHASE_0_DECISIONS.md      # Design decisions
    ├── QUICK_START.md                # Quick reference
    ├── 1.md - 5.md                   # Architecture documents
    └── README.md                     # Root readme (this file)
```

---

## 🛠️ Development Commands

### Building
```bash
# Build all workspaces
npm run build

# Build specific workspace
npm run build -w @livora/infrastructure
npm run build -w @livora/backend
npm run build -w @livora/frontend
npm run build -w @livora/sdk
```

### Development
```bash
# Start backend with hot-reload
npm run dev -w @livora/backend

# Start frontend with hot-reload
npm run dev -w @livora/frontend

# Start all services with Docker
docker-compose up

# View service logs
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Testing
```bash
# Run all tests
npm test

# Run tests for specific workspace
npm test -w @livora/backend

# Run with coverage
npm test -- --coverage
```

### Linting & Formatting
```bash
# Lint all code
npm run lint --workspaces

# Format with Prettier
npx prettier --write .
```

### AWS & Infrastructure
```bash
# Build CDK infrastructure
npm run build -w @livora/infrastructure

# Synthesize CloudFormation
npm run cdk:synth -w @livora/infrastructure

# Preview changes (no deployment)
npm run cdk:diff -w @livora/infrastructure

# Deploy to AWS
npm run deploy:dev

# Bootstrap AWS account (one-time)
npm run cdk:bootstrap -w @livora/infrastructure
```

### Docker
```bash
# Build Docker image
docker build -t livora-enterprise:0.1.0 .

# Run Docker container
docker run -p 3000:3000 livora-enterprise:0.1.0

# Stop all services
docker-compose down

# Remove all data
docker-compose down -v
```

---

## 🌍 Services & Endpoints

| Service | URL | Status | Purpose |
|---------|-----|--------|---------|
| **Backend API** | http://localhost:3000 | ✅ | Event ingestion, business logic |
| **Frontend Dashboard** | http://localhost:5173 | ✅ | React web interface |
| **PostgreSQL** | localhost:5432 | ✅ | CRM & operational data |
| **Redis** | localhost:6379 | ✅ | Caching layer |
| **LocalStack (AWS Mock)** | http://localhost:4566 | ✅ | Local AWS services |
| **Postgres UI** | http://localhost:5050 | ⏳ | Admin panel (Phase 1) |

### Health Checks

```bash
# Backend
curl -s http://localhost:3000/health | jq

# LocalStack S3
aws --endpoint-url=http://localhost:4566 s3 ls

# PostgreSQL
psql -h localhost -U livora_dev -d livora_engine -c "SELECT version();"

# Redis
redis-cli -h localhost ping
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Interaction Layer                          │
│            (Web Browser, Mobile App, Desktop Client)            │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                    Integration Layer                            │
│       (API Gateway, Webhooks, Third-party Adapters)            │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│              Intelligence Engine (Core)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Analytics│ │Automation│ │   AI/ML  │ │Campaign  │          │
│  │  Engine  │ │  Engine  │ │  Layer   │ │ Builder  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                      Data Layer                                 │
│  DynamoDB │ PostgreSQL │ S3 │ Redis │ Redshift │ Kinesis      │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│          Visualization & Control Layer                          │
│        (CRM Dashboard, Analytics, Campaign Builder)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📚 Documentation

All documentation is organized in the `docs/` folder to prevent naming conflicts and keep the root clean.

| Document | Purpose | Audience |
|----------|---------|----------|
| **[ROADMAP.md](./docs/ROADMAP.md)** | Complete 16-phase, 50-week plan | Engineering team |
| **[PHASE_0_GUIDE.md](./docs/PHASE_0_GUIDE.md)** | Detailed Phase 0 setup instructions | Engineers executing Phase 0 |
| **[PHASE_0_CHECKLIST.md](./docs/PHASE_0_CHECKLIST.md)** | Day-by-day checklist | Daily reference |
| **[PHASE_0_COMPLETE.md](./docs/PHASE_0_COMPLETE.md)** | Phase 0 completion summary | Completion reference |
| **[BUILD_COMPLETE_BLUEPRINT.md](./docs/BUILD_COMPLETE_BLUEPRINT.md)** | Technical blueprint | Tech leads |
| **[PRE_PHASE_0_DECISIONS.md](./docs/PRE_PHASE_0_DECISIONS.md)** | Design decisions & rationale | Architects |
| **[QUICK_START.md](./docs/QUICK_START.md)** | Quick reference guide | Quick lookup |
| **[1.md](./docs/1.md)** | Architecture blueprint | Tech leads, architects |
| **[2.md](./docs/2.md)** | System workflows | Developers |
| **[3.md](./docs/3.md)** | Frontend design system | Frontend engineers |
| **[4.md](./docs/4.md)** | Backend APIs & SDKs | Backend engineers |
| **[5.md](./docs/5.md)** | Operational procedures | DevOps, SRE |

---

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
AWS_REGION=us-east-1
AWS_ENDPOINT_URL=http://localstack:4566
REDIS_URL=redis://redis:6379
DATABASE_URL=postgresql://livora_dev:dev_password@postgres:5432/livora_engine
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
```

### Infrastructure (.env)
```env
CDK_DEFAULT_ACCOUNT=123456789012
CDK_DEFAULT_REGION=us-east-1
ENVIRONMENT=dev
```

---

## 🔐 Security

- ✅ **Encryption at Rest:** KMS-managed keys
- ✅ **Encryption in Transit:** TLS/HTTPS everywhere
- ✅ **Authentication:** JWT tokens + API keys
- ✅ **Authorization:** IAM role-based access
- ✅ **Audit Logging:** CloudWatch logs retained
- ✅ **Secrets Management:** AWS Secrets Manager
- ✅ **GDPR Ready:** Data retention policies, right to erasure
- ✅ **SOC2 Ready:** Monitoring, alerting, compliance logging

---

## 🚨 Troubleshooting

### Docker Issues
```bash
# Services won't start
docker-compose down -v
docker-compose up --build

# Check specific service logs
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Backend Issues
```bash
# Clear dependencies and reinstall
rm -rf backend/node_modules package-lock.json
npm install

# Port 3000 already in use
lsof -i :3000
kill -9 <PID>
```

### AWS/CDK Issues
```bash
# Verify AWS credentials
aws sts get-caller-identity

# Clear CDK cache
rm -rf infrastructure/cdk.out
npm run cdk:synth -w @livora/infrastructure
```

### Database Issues
```bash
# Connect to PostgreSQL
psql -h localhost -U livora_dev -d livora_engine

# Connect to Redis
redis-cli -h localhost
```

See [PHASE_0_GUIDE.md](./docs/PHASE_0_GUIDE.md) for more troubleshooting details.

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/description`
2. Make changes and commit: `git commit -am "feat: description"`
3. Push to GitHub: `git push origin feature/description`
4. Create Pull Request
5. Wait for CI/CD checks to pass
6. Get code review
7. Merge to main

**Code Style:**
- TypeScript strict mode
- ESLint enforced
- Prettier formatting
- >80% test coverage

---

## 📞 Team

| Role | Person | Contact |
|------|--------|---------|
| Tech Lead | [TBD] | slack |
| Backend Lead | [TBD] | slack |
| Frontend Lead | [TBD] | slack |
| DevOps Lead | [TBD] | slack |

---

## 📅 Roadmap

### Phase 0 (Week 1) ✅ ACTIVE
Foundation, local setup, AWS infrastructure

### Phase 1 (Week 2-3) ⏳
Event ingestion, Kinesis, end-to-end flow

### Phase 2-3 (Week 4-8)
Operational stores, database setup, caching

### Phases 4-16 (Week 9-50)
Analytics, frontend, campaigns, AI/ML, launch

**[Full Roadmap →](./ROADMAP.md)**

---

## 📝 License

MIT - See LICENSE file

---

## 🎉 Phase 0 Status

```
✅ Local development environment ready
✅ AWS foundation deployed
✅ CI/CD pipeline configured
✅ Backend API running
✅ Frontend dashboard accessible
✅ Team synchronized

🚀 Ready to start Phase 1!
```

---

**Last Updated:** 2024-01-15  
**Next Phase:** Phase 1 - Event Ingestion  
**Contact:** engineering@livora.io