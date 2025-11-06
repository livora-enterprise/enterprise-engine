# 🚀 Phase 0: Foundation Setup Guide

**Status:** ACTIVE ✅  
**Duration:** Week 1 (This Week)  
**Team Size:** 2 Engineers  
**Goal:** Get the complete foundation running locally and deployed to AWS

---

## 📋 What We're Building This Week

By end of Week 1 (Phase 0), you'll have:

✅ **Local Development Environment**
- Docker Compose stack with backend, Redis, PostgreSQL, LocalStack
- Hot-reload development setup
- All services running locally

✅ **AWS Foundation (Deployed)**
- VPC with public/private subnets across 3 AZs
- IAM roles and KMS encryption keys
- CloudWatch monitoring dashboard
- SNS alerts topic

✅ **CI/CD Pipeline (Ready)**
- GitHub Actions for automated testing, linting, building
- Deployment workflows for dev/staging/prod
- Security scanning

✅ **Project Structure**
- Monorepo with packages: infrastructure, backend, frontend, SDK
- TypeScript across the entire stack
- ESLint and formatting configured

✅ **First API Running**
- Health check endpoint working
- Event ingestion placeholder ready
- Docker image building and running

---

## 🎯 Phase 0 Tasks (Priority Order)

### **Task 1: AWS Setup** (~2 hours)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 1.1 AWS Account Configuration
```bash
# Install AWS CLI
pip install awscli-v2

# Configure AWS credentials
aws configure
# Enter:
# - AWS Access Key ID
# - AWS Secret Access Key  
# - Default region: us-east-1
# - Default output format: json

# Verify setup
aws sts get-caller-identity
```

**Expected Output:**
```json
{
  "UserId": "AIDAI...",
  "Account": "123456789012",
  "Arn": "arn:aws:iam::123456789012:user/your-user"
}
```

#### 1.2 Create AWS Account Alias
```bash
# Make AWS account easier to identify
aws iam create-account-alias --account-alias livora-enterprise-dev
```

**Checklist:**
- [ ] AWS CLI installed and configured
- [ ] `aws sts get-caller-identity` returns correct account
- [ ] AWS account alias created

---

### **Task 2: GitHub Repository Setup** (~1 hour)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 2.1 Create GitHub Organization/Repo
1. Go to https://github.com/organizations/new (create org)
   - Organization name: `livora-enterprise`
   - GitHub username: [Your username]
   - Email: [engineering@livora.io]

2. Create repository
   - Name: `enterprise-engine`
   - Description: "Livora Enterprise Intelligence and Automation Engine"
   - Visibility: Private (initially)
   - Initialize with README

#### 2.2 Push Initial Code
```bash
# Add GitHub remote
git remote add origin https://github.com/livora-enterprise/enterprise-engine.git

# Create initial commit
git add .
git commit -m "chore: initial phase 0 foundation setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

**Checklist:**
- [ ] GitHub organization created
- [ ] Repository created
- [ ] Code pushed to main branch
- [ ] Repository shows all files

---

### **Task 3: Local Development Environment** (~2 hours)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 3.1 Install Prerequisites
```bash
# Node.js (v20 or higher)
node --version  # Should be v20+

# npm (v10 or higher)
npm --version   # Should be v10+

# Docker and Docker Compose
docker --version
docker-compose --version

# AWS CDK
npm install -g aws-cdk

# TypeScript globally (optional)
npm install -g typescript
```

**Checklist:**
- [ ] Node.js v20+ installed
- [ ] npm v10+ installed
- [ ] Docker installed and daemon running
- [ ] AWS CDK installed globally
- [ ] TypeScript installed

#### 3.2 Install Project Dependencies
```bash
# From project root
npm install

# Install all workspace dependencies
npm install --workspaces
```

**Expected Output:**
```
added XXX packages in Xs
```

**Checklist:**
- [ ] `npm install` completes successfully
- [ ] No peer dependency warnings
- [ ] `node_modules/` directory created

---

### **Task 4: Local Services (Docker Compose)** (~1 hour)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 4.1 Build and Start Services
```bash
# From project root
docker-compose up -d

# Wait 30 seconds for services to initialize
sleep 30

# Check service health
docker-compose ps

# View logs
docker-compose logs -f
```

**Expected Output:**
```
CONTAINER ID   IMAGE                   STATUS
xxxxx          livora-backend          Up 2 minutes (healthy)
xxxxx          localstack/localstack   Up 2 minutes (healthy)
xxxxx          postgres:16-alpine      Up 2 minutes (healthy)
xxxxx          redis:7-alpine          Up 2 minutes (healthy)
```

#### 4.2 Verify Each Service
```bash
# Backend
curl http://localhost:3000/health
# Expected: {"status":"healthy","timestamp":"...","version":"0.1.0","phase":"phase-0"}

# LocalStack (AWS Mock)
aws --endpoint-url=http://localhost:4566 s3 ls
# Expected: (empty list or existing buckets)

# PostgreSQL
PGPASSWORD=dev_password psql -h localhost -U livora_dev -d livora_engine -c "SELECT version();"

# Redis
redis-cli -h localhost ping
# Expected: PONG
```

**Checklist:**
- [ ] All 4 services running and healthy
- [ ] Backend responds to /health
- [ ] LocalStack S3 accessible
- [ ] PostgreSQL accepts connections
- [ ] Redis responds to ping

---

### **Task 5: Build and Test Infrastructure** (~2 hours)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 5.1 Build CDK Project
```bash
# Build TypeScript
npm run build -w @livora/infrastructure

# Synthesize CloudFormation
npm run cdk:synth -w @livora/infrastructure
```

**Expected Output:**
```
✔ Built successfully
cdk.out/LivoraEnterprise... foundation...json
```

#### 5.2 Review Generated CloudFormation
```bash
# List synthesized stacks
ls -la infrastructure/cdk.out/*.json

# Preview what will be deployed (no changes)
npm run cdk:diff -w @livora/infrastructure
```

**Checklist:**
- [ ] CDK builds without errors
- [ ] CloudFormation templates generated
- [ ] `cdk diff` shows what will be created (VPC, IAM, KMS, etc.)

---

### **Task 6: Deploy Foundation to AWS** (~3 hours)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 6.1 Bootstrap AWS Account (One-time)
```bash
# This prepares AWS account for CDK deployments
npm run cdk:bootstrap -w @livora/infrastructure
```

**Expected Output:**
```
 ✓ Environment aws://123456789012/us-east-1 bootstrapped.
```

#### 6.2 Deploy Stacks
```bash
# Deploy to development environment
npm run deploy:dev

# OR use CDK directly with auto-approval
npm run cdk:deploy -w @livora/infrastructure -- --all --require-approval=never
```

**Expected Output:**
```
Do you wish to deploy these changes (y/n)? y

LivoraEnterpriseSecurity-dev: deploying...
✓ LivoraEnterpriseSecurity-dev
  VpcId: vpc-xxxxx
  ✓ Outputs:
    LivoraEnterpriseSecurity-dev.KMSKeyId = ...
    LivoraEnterpriseSecurity-dev.LambdaRoleArn = ...

LivoraNetworking-dev: deploying...
✓ LivoraNetworking-dev

LivoraFoundation-dev: deploying...
✓ LivoraFoundation-dev
  LogGroupName: /livora/dev/application
  AlarmTopicArn: arn:aws:sns:us-east-1:...
  DashboardURL: https://console.aws.amazon.com/cloudwatch/...

✓ All stacks deployed successfully
```

**Checklist:**
- [ ] AWS account bootstrapped
- [ ] All 3 stacks deployed successfully
- [ ] No errors in deployment
- [ ] Outputs displayed (VPC, KMS, Log Group, etc.)

#### 6.3 Verify Deployment
```bash
# List deployed stacks
aws cloudformation list-stacks --region us-east-1 \
  --query 'StackSummaries[?StackStatus==`CREATE_COMPLETE`].StackName' \
  --output table

# Check CloudWatch Dashboard
aws cloudwatch describe-dashboards \
  --dashboard-name-prefix livora \
  --region us-east-1
```

**Checklist:**
- [ ] 3 stacks show CREATE_COMPLETE status
- [ ] CloudWatch dashboard created
- [ ] CloudWatch logs group created
- [ ] SNS topic created for alerts

---

### **Task 7: Build and Test Backend** (~1 hour)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 7.1 Build Backend
```bash
npm run build -w @livora/backend
```

**Expected Output:**
```
✓ Backend built successfully
```

#### 7.2 Run Tests
```bash
npm run test -w @livora/backend
```

**Expected Output:**
```
PASS src/__tests__/index.test.ts
  Backend API
    ✓ returns health status
    ✓ accepts event ingestion requests

Test Suites: 1 passed, 1 total
Tests: 2 passed, 2 total
```

#### 7.3 Start Backend Locally
```bash
npm run dev -w @livora/backend
```

**Expected Output:**
```
✅ Livora Backend initialized on port 3000
📍 Phase: 0 (Foundation)
🌍 Environment: development
⏰ Started at: 2024-01-15T10:30:00Z
```

**Checklist:**
- [ ] Backend builds without errors
- [ ] Tests pass (2/2)
- [ ] Backend starts on port 3000
- [ ] Server logs show "Phase: 0"

---

### **Task 8: Build and Test Frontend** (~1 hour)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 8.1 Build Frontend
```bash
npm run build -w @livora/frontend
```

**Expected Output:**
```
✓ built in XXXms
```

#### 8.2 Start Frontend Dev Server
In a new terminal:
```bash
npm run dev -w @livora/frontend
```

**Expected Output:**
```
  VITE v5.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

#### 8.3 Access Frontend
Open: http://localhost:5173/

**Expected Display:**
- 🚀 Livora Enterprise Engine
- Phase 0: Foundation
- Status: ✅ READY
- Next Steps listed

**Checklist:**
- [ ] Frontend builds without errors
- [ ] Dev server starts on port 5173
- [ ] Browser shows dashboard
- [ ] Status shows ✅ READY

---

### **Task 9: Build Docker Image** (~30 min)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 9.1 Build Docker Image
```bash
docker build -t livora-enterprise:0.1.0 .
```

**Expected Output:**
```
Successfully built abc123def456
Successfully tagged livora-enterprise:0.1.0
```

#### 9.2 Test Docker Image Locally
```bash
# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e AWS_ACCESS_KEY_ID=test \
  -e AWS_SECRET_ACCESS_KEY=test \
  livora-enterprise:0.1.0

# Test in another terminal
curl http://localhost:3000/health
```

**Expected Output:**
```
{"status":"healthy","timestamp":"...","version":"0.1.0","phase":"phase-0"}
```

**Checklist:**
- [ ] Docker image builds successfully
- [ ] Image tagged as 0.1.0
- [ ] Container starts and responds to requests
- [ ] Health endpoint returns 200

---

### **Task 10: Set Up GitHub Secrets for CI/CD** (~30 min)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 10.1 Create AWS IAM User for CI/CD
```bash
# Create IAM user
aws iam create-user --user-name livora-ci-cd
aws iam create-access-key --user-name livora-ci-cd
```

**Note the outputs:**
```json
{
  "AccessKeyId": "AKIA...",
  "SecretAccessKey": "..."
}
```

#### 10.2 Attach Permissions
```bash
# Attach policy for CDK deployments
aws iam attach-user-policy \
  --user-name livora-ci-cd \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

#### 10.3 Add Secrets to GitHub
Go to: https://github.com/livora-enterprise/enterprise-engine/settings/secrets

Add these secrets:
1. `AWS_ACCESS_KEY_ID` = `AKIA...`
2. `AWS_SECRET_ACCESS_KEY` = `...`
3. `AWS_ACCOUNT_ID` = `123456789012`

**Checklist:**
- [ ] IAM user created for CI/CD
- [ ] Access key generated
- [ ] All 3 secrets added to GitHub
- [ ] Secrets are private (verify eye icon)

---

### **Task 11: Test CI/CD Pipeline** (~1 hour)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 11.1 Create Test Branch and PR
```bash
# Create feature branch
git checkout -b test/phase-0-ci-cd

# Make a small change
echo "# Phase 0 Setup Complete" >> TEST.md

# Commit and push
git add TEST.md
git commit -m "test: verify CI/CD pipeline"
git push -u origin test/phase-0-ci-cd
```

#### 11.2 Create Pull Request
1. Go to GitHub repo
2. Click "Compare & pull request"
3. Create PR with title: "test: verify CI/CD pipeline"

#### 11.3 Monitor GitHub Actions
- Go to "Actions" tab
- Watch "CI Pipeline" workflow run
- Should see:
  - ✅ test job passed
  - ✅ cdk-synth job passed
  - ✅ security-check job passed

**Checklist:**
- [ ] PR created successfully
- [ ] CI pipeline triggered automatically
- [ ] All 3 jobs pass (test, cdk-synth, security)
- [ ] No errors or warnings

#### 11.4 Merge PR
```bash
# Merge PR via GitHub UI
# Then pull latest
git checkout main
git pull origin main
```

**Checklist:**
- [ ] PR merged to main
- [ ] Code merged locally

---

### **Task 12: Documentation & Handover** (~1 hour)
**Owner:** [Assign]  
**Status:** [ ] Not Started

#### 12.1 Create Phase 0 Completion Report
Create file: `PHASE_0_COMPLETION.md`

```markdown
# Phase 0 Completion Report

**Date:** 2024-01-15  
**Duration:** 1 week  
**Team:** 2 engineers  

## ✅ Completed Deliverables

- [x] AWS Foundation Stack deployed
  - VPC: vpc-xxxxx
  - Subnets: 3 public, 3 private
  - NAT Gateway: 1
  
- [x] Local development environment
  - Docker Compose with 4 services
  - Hot-reload for backend and frontend
  
- [x] CI/CD Pipeline
  - GitHub Actions configured
  - Test, lint, build steps automated
  - Deployment to dev environment ready
  
- [x] Project Structure
  - Monorepo with 4 workspaces
  - TypeScript everywhere
  - ESLint and Prettier configured
  
- [x] First APIs
  - Health check: http://localhost:3000/health
  - Event ingestion placeholder: POST /api/v1/events/ingest
  
## 📊 Metrics

- Build time: < 2 minutes
- Test coverage: TBD (Phase 1)
- Docker image size: ~200MB
- AWS resources created: 7 (VPC, subnets, IGW, NAT, IAM roles, KMS key, Log group)

## 🎯 Phase 1 Kickoff Ready

- [ ] All Phase 0 checklist items completed
- [ ] Team familiar with monorepo structure
- [ ] Local environment works for all team members
- [ ] AWS account ready for Phase 1 resources (Kinesis, DynamoDB, etc.)

## 📝 Notes

- Team can run `docker-compose up` to start all services
- Backend available at http://localhost:3000
- Frontend available at http://localhost:5173
- CI/CD tests run automatically on PR
```

#### 12.2 Update Main README
Update: `README.md`

```markdown
# 🚀 Livora Enterprise Intelligence Engine

A unified, scalable enterprise automation and intelligence platform.

## 🏗️ Phase: 0 - Foundation

**Status:** ✅ Active  
**Duration:** Week 1  
**Team:** 2 engineers

### Quick Start

**Prerequisites:**
- Node.js v20+
- Docker & Docker Compose
- AWS CLI configured

**Setup (5 minutes):**
```bash
# Install dependencies
npm install

# Start all services
docker-compose up

# In separate terminals:
npm run dev -w @livora/backend
npm run dev -w @livora/frontend
```

**Verify:**
- Backend: http://localhost:3000/health
- Frontend: http://localhost:5173
- LocalStack: http://localhost:4566

## 📁 Project Structure

```
livora-enterprise/
├── infrastructure/     # AWS CDK (TypeScript)
├── backend/           # Node.js APIs
├── frontend/          # React Web Dashboard
├── packages/sdk/      # Client SDK
├── docker-compose.yml # Local dev environment
├── Dockerfile         # Backend image
└── ROADMAP.md        # Full 16-phase plan
```

## 🔗 Documentation

- [16-Phase Roadmap](./ROADMAP.md)
- [Phase 0 Guide](./PHASE_0_GUIDE.md)
- [Phase 0 Checklist](./PHASE_0_CHECKLIST.md)
- [Architecture](./1.md)

## 🚀 Next Phase (Phase 1)

- Event Ingestion API
- Kinesis Stream Setup
- SDK Event Tracking
- First customer integration

## 📞 Team

Engineering Team: 2  
Scrum Master: [TBD]  
Product Owner: [TBD]
```

**Checklist:**
- [ ] Phase 0 Completion Report created
- [ ] Main README updated
- [ ] Documentation links working

---

## ✅ Phase 0 Completion Checklist

### Infrastructure
- [ ] AWS account configured
- [ ] AWS CLI working
- [ ] CDK stacks deployed (3/3)
- [ ] CloudWatch dashboard visible
- [ ] SNS alerts configured

### Local Development
- [ ] Node.js v20+, npm v10+ installed
- [ ] Docker and Docker Compose working
- [ ] All 4 services healthy (docker-compose ps)
- [ ] Backend accessible on port 3000
- [ ] PostgreSQL accessible on port 5432
- [ ] Redis accessible on port 6379
- [ ] LocalStack accessible on port 4566

### Code Quality
- [ ] Backend builds without errors
- [ ] Backend tests pass (2/2)
- [ ] Frontend builds without errors
- [ ] Linting passes (no errors)
- [ ] Docker image builds successfully

### CI/CD
- [ ] GitHub Actions configured
- [ ] Secrets added (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ACCOUNT_ID)
- [ ] Test workflow passes
- [ ] cdk-synth workflow passes
- [ ] security-check workflow passes

### Documentation
- [ ] README.md updated
- [ ] Phase 0 Completion Report created
- [ ] PHASE_0_GUIDE.md complete
- [ ] Roadmap reference updated

---

## 🎯 Success Criteria (Phase 0 Complete)

✅ When you can:
1. Run `npm install` and all dependencies resolve
2. Run `docker-compose up` and all 4 services start
3. Access backend health check: `curl http://localhost:3000/health`
4. Access frontend dashboard: http://localhost:5173
5. Create a PR and see CI/CD tests pass automatically
6. Deploy infrastructure with `npm run deploy:dev`
7. View CloudWatch dashboard in AWS console

**You're ready for Phase 1!** 🚀

---

## 📞 Troubleshooting

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker-compose up --build

# Check logs
docker-compose logs -f backend
```

### AWS Issues
```bash
# Verify credentials
aws sts get-caller-identity

# Check CDK context
npm run cdk:synth -w @livora/infrastructure -- --no-staging
```

### Node Issues
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check versions
node --version
npm --version
```

---

**Phase 0 Setup Complete! Ready for Phase 1 🚀**