# Pre-Phase 0: Critical Decisions Checklist

**Purpose:** Confirm all major decisions BEFORE engineers start coding. No surprises mid-way.

---

## ❓ SECTION 1: Organization & Team

### 1.1 Team Composition
- [ ] How many engineers can you allocate to this project?
  - [ ] 5-8 (skeleton team, 60-70 week timeline)
  - [ ] 12-15 (recommended, 50 week timeline)
  - [ ] 20+ (accelerated, 35-40 week timeline)

- [ ] Do you have a **Tech Lead / Architect** assigned?
  - Name: _______________
  - Responsibility: Architecture decisions, code review standards, technical direction

- [ ] Who owns **each major phase**? (Assign phase owners)
  - Phase 0-3 (Backend pipeline): _______________
  - Phase 4-5 (Analytics): _______________
  - Phase 6-9 (Frontend): _______________
  - Phase 10-12 (Campaigns & Connectors): _______________
  - Phase 13-16 (Infrastructure & Launch): _______________

### 1.2 Communication & Governance
- [ ] **Weekly stakeholder sync:** Days & times?
  - Meeting cadence: Mondays 10am? (Suggest: 1 hour weekly)
  - Attendees: Product, Engineering, Design, Leadership
  
- [ ] **Escalation & Decision-Making:**
  - Who approves architecture decisions? (Tech Lead + CTO?)
  - Who approves go/no-go for phase completions?
  - Where are decisions documented? (Notion? Confluence? GitHub Discussions?)

- [ ] **Incident & Issue Management:**
  - Critical bugs: what's the SLA? (4-hour? 24-hour?)
  - Who is on-call when?
  - Escalation path for blockers?

---

## ❓ SECTION 2: AWS & Cloud Setup

### 2.1 AWS Account Strategy
- [ ] Do you have an AWS account already?
  - [ ] Yes, ready to use: Account ID: _______________
  - [ ] No, need to create: (Do this in Week 0)

- [ ] **Environment separation:** How should we split dev/staging/prod?
  - [ ] Option A: Single AWS account, different regions
  - [ ] Option B: Different AWS accounts per environment (recommended for security)
  - [ ] Option C: Separate organization with cross-account roles

- [ ] **AWS Region:** Which is your primary region?
  - [ ] us-east-1 (N. Virginia) — default
  - [ ] eu-west-1 (Ireland)
  - [ ] ap-south-1 (Mumbai)
  - [ ] ap-southeast-1 (Singapore)
  - [ ] Other: _______________

### 2.2 Billing & Cost Management
- [ ] **Monthly budget for infrastructure (development phase):**
  - Estimated: $5k-15k/month (Phases 0-8)
  - Scaling to: $20k-50k/month (Phases 9+)
  - Your budget: $ _______________

- [ ] **Cost tracking:**
  - [ ] Enable AWS Cost Explorer
  - [ ] Set up billing alerts (e.g., alert if >$X/day)
  - [ ] Who reviews monthly AWS bill?

### 2.3 Security & Compliance (Foundation)
- [ ] **Encryption by default:**
  - [ ] Use AWS KMS for all encryption keys
  - [ ] Enforce TLS 1.2+ everywhere
  - [ ] Rotate credentials every 90 days

- [ ] **Compliance requirements:**
  - [ ] SOC2 (for enterprise sales)?
  - [ ] GDPR (European customers)?
  - [ ] HIPAA (healthcare clients)?
  - [ ] PCI-DSS (payments)?
  - [ ] Other: _______________

---

## ❓ SECTION 3: Technology Stack Confirmation

### 3.1 Existing Tech Stack
- [ ] Do you have any existing code / libraries we should build on?
  - [ ] Backend services already written?
  - [ ] Frontend component library?
  - [ ] Shared utilities / SDKs?
  - Describe: _______________

### 3.2 Database Technology
- [ ] **Operational Store (session, cart, realtime features):**
  - Confirmed: **DynamoDB** (single-table pattern)
  - Alternative considered? _______________

- [ ] **CRM Database (contacts, deals, activities):**
  - Confirmed: **Aurora PostgreSQL**
  - Alternative considered? _______________

- [ ] **Analytics Data Warehouse:**
  - Confirmed: **Redshift**
  - Alternative: BigQuery? (if GCP preference)
  - Alternative: Snowflake? (if budget allows)

- [ ] **Cache Layer (sessions, hot data):**
  - Confirmed: **Redis** (ElastiCache)
  - Alternative: DynamoDB Accelerator (DAX)?

### 3.3 Event Streaming
- [ ] **Event Stream Technology:**
  - Confirmed: **Kinesis** (AWS native)
  - Alternative: Apache Kafka? (self-managed)
  - Alternative: Google Pub/Sub? (GCP)

### 3.4 Frontend Technology
- [ ] **Desktop CRM:**
  - Confirmed: **Electron + React**
  - Alternative: Web-based only? (Simpler but less offline support)

- [ ] **Web Dashboards:**
  - Confirmed: **Next.js + React**

- [ ] **Mobile Apps:**
  - Confirmed: **React Native** (iOS + Android)
  - Alternative: Native iOS/Android?

- [ ] **Component Library:**
  - Confirmed: **Recharts / Chart.js** for visualizations
  - Confirmed: **TailwindCSS** for styling
  - Confirmed: **Storybook** for component documentation

### 3.5 Backend Framework
- [ ] **API Framework:**
  - Option A: **NestJS** (full-featured, great for large teams)
  - Option B: **Express** (lightweight, fast to start)
  - Your choice: _______________

- [ ] **API Style:**
  - Option A: **REST** (simple, widely understood)
  - Option B: **GraphQL** (flexible, but more complex)
  - Option C: **Both** (REST for SDKs, GraphQL for internal)
  - Your choice: _______________

### 3.6 Authentication & Authorization
- [ ] **User Authentication:**
  - Confirmed: **AWS Cognito** (for simplicity)
  - Alternative: **Auth0**? (for flexibility)
  - Alternative: **Keycloak**? (self-hosted)

- [ ] **API Authentication:**
  - Confirmed: **JWT** tokens
  - Token TTL: 15 minutes (access), 7 days (refresh)?

- [ ] **RBAC (Role-Based Access Control):**
  - Roles defined:
    - [ ] Admin (full system access)
    - [ ] Manager (team + campaign access)
    - [ ] Agent/User (limited CRM access)
    - [ ] Read-only analyst
    - Others: _______________

### 3.7 Infrastructure & Deployment
- [ ] **Infrastructure as Code (IaC):**
  - Confirmed: **AWS CDK (TypeScript)**
  - Alternative: **Terraform**?

- [ ] **Containerization:**
  - Confirmed: **Docker** for services that need it (Lambda doesn't need it)
  - Container orchestration: **ECS** (managed), **EKS** (Kubernetes)?

- [ ] **CI/CD Pipeline:**
  - Confirmed: **GitHub Actions**
  - Alternative: **AWS CodePipeline**?
  - Alternative: **GitLab CI**?

### 3.8 Monitoring & Observability
- [ ] **Logging:**
  - Confirmed: **CloudWatch Logs** (AWS native)
  - Alternative: **ELK Stack**, **Datadog**, **New Relic**?

- [ ] **Monitoring & Alerting:**
  - Confirmed: **CloudWatch** (basic)
  - Enhanced: **Prometheus + Grafana**?
  - Enterprise: **Datadog**, **New Relic**, **Sumo Logic**?

- [ ] **Error Tracking:**
  - Confirmed: **Sentry** (for SDK errors, frontend crashes)

- [ ] **Tracing (Performance):**
  - Confirmed: **AWS X-Ray** (Lambda tracing)

---

## ❓ SECTION 4: Architecture & Design Decisions

### 4.1 Deployment Pattern Priority
- [ ] **Which deployment pattern to build first?**
  - [ ] Pattern A (Full delivery — Livora builds everything)
  - [ ] Pattern B (IaaS — client retains UI, Livora provides APIs)
  - Recommendation: Start with Pattern A (includes Pattern B APIs anyway)

### 4.2 Multi-Cloud Strategy
- [ ] **Should we design for multi-cloud from day 1?**
  - [ ] Yes (add abstraction layers, build for GCP/Azure too)
  - [ ] No (AWS-first, multi-cloud later)
  - Recommendation: AWS-first (Day 1), multi-cloud abstractions after Phase 13

### 4.3 Single Tenant vs Multi-Tenant
- [ ] **Architecture approach:**
  - [ ] Single-tenant per deployment (separate AWS account per client)
  - [ ] Multi-tenant shared (multiple clients in same infrastructure)
  - [ ] Hybrid (multi-tenant for Pattern B, single for Pattern A)
  - Recommendation: Start multi-tenant (Phase 3+)

### 4.4 Data Retention & Compliance
- [ ] **Data Retention Policy:**
  - Raw events (S3): ___ years (recommend: 1 year)
  - Curated data (Redshift): ___ years (recommend: 3 years)
  - CRM contacts (Aurora): ___ years (recommend: permanent)
  - Audit logs: ___ years (recommend: 7 years for compliance)

- [ ] **Data Deletion:**
  - GDPR "right to be forgotten": How to handle? (Implement in Phase 14)
  - Schedule: Automatic deletion after retention period?

---

## ❓ SECTION 5: Business & Product Decisions

### 5.1 Target Industries (MVP)
- [ ] Which industries are we targeting first?
  - [ ] E-commerce (primary)
  - [ ] Real estate
  - [ ] SaaS / Software
  - [ ] Logistics / Supply Chain
  - [ ] Other: _______________

### 5.2 Initial Feature Set (MVP)
- [ ] What's the **absolute minimum** for first customer launch?
  - [ ] Event ingestion + Analytics dashboard?
  - [ ] + Campaign automation (WhatsApp/Email)?
  - [ ] + CRM (contacts, deals)?
  - [ ] + AI predictions (churn, recommendations)?
  - Describe: _______________

### 5.3 Performance Targets
- [ ] **Event ingestion throughput:**
  - Target: 10,000 events/sec (adjustable)
  - Can we start with lower (1,000 eps) and scale?

- [ ] **API latency targets:**
  - Analytics query (p99): <2 seconds
  - CRM API (p99): <200 milliseconds
  - Campaign send latency: <5 minutes from event

- [ ] **Uptime SLA:**
  - 99.5%? (2.4 hours downtime/month)
  - 99.9%? (43 minutes downtime/month)
  - 99.95%? (21 minutes downtime/month)

---

## ❓ SECTION 6: Immediate Next Steps

### 6.1 Pre-Phase 0 (This Week)
- [ ] Assign Tech Lead
- [ ] Create AWS account
- [ ] Finalize team size & assignments
- [ ] Schedule kickoff meeting
- [ ] Answer all questions in this checklist

### 6.2 Phase 0 Kickoff (Week 1)
- [ ] Team reads all architecture docs (1-5.md)
- [ ] Team reads ROADMAP.md + QUICK_START.md
- [ ] Initialize GitHub repo with folder structure
- [ ] Set up local development environment (Docker Compose)
- [ ] First CI/CD pipeline runs successfully

### 6.3 Phase 1 Prep (End of Week 2)
- [ ] Event schema finalized
- [ ] API contract (OpenAPI) drafted
- [ ] SDK architecture designed
- [ ] Database schemas sketched

---

## ✅ Final Checklist: "Are We Ready?"

Before Phase 0 starts, ensure:

- [ ] Team size & composition finalized
- [ ] Tech Lead assigned
- [ ] AWS account ready (dev, staging, prod)
- [ ] All technology stack decisions made
- [ ] Budget approved
- [ ] Weekly sync scheduled
- [ ] Decision log created (track all choices)
- [ ] GitHub repo initialized
- [ ] Legal/compliance requirements documented
- [ ] Stakeholder alignment confirmed

---

## 🎯 Once This Is Completed...

**You are cleared for Phase 0 launch.** 🚀

Next document to read: **ROADMAP.md** (Phase 0 section)

---

**Document Version:** 1.0
**Last Updated:** [Today]
**Owner:** Tech Lead
**Approval Status:** ⏳ Pending
