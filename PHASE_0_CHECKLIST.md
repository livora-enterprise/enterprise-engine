# ✅ Phase 0 Checklist

**Week 1 | 2 Engineers | Foundation Setup**

---

## Day 1: Setup & Prerequisites

### Morning (4 hours)
- [ ] **AWS Setup** (Engineer 1)
  - [ ] Install AWS CLI
  - [ ] Configure credentials
  - [ ] Verify `aws sts get-caller-identity`
  - [ ] Create account alias
  - Estimated: 1 hour

- [ ] **GitHub Setup** (Engineer 2)
  - [ ] Create GitHub organization
  - [ ] Create repository
  - [ ] Add initial commit
  - [ ] Push to main
  - Estimated: 1 hour

- [ ] **Local Prerequisites** (Both)
  - [ ] Verify Node.js v20+
  - [ ] Verify npm v10+
  - [ ] Install Docker
  - [ ] Install AWS CDK
  - Estimated: 1 hour
  
- [ ] **Project Dependencies** (Both)
  - [ ] `npm install`
  - [ ] Verify workspaces installed
  - [ ] Verify no peer dependency errors
  - Estimated: 1 hour

### Afternoon (4 hours)
- [ ] **Local Environment** (Both)
  - [ ] `docker-compose up`
  - [ ] Wait for all services healthy
  - [ ] Verify all 4 services running
  - [ ] Check logs for errors
  - Estimated: 1 hour

- [ ] **Service Verification** (Both)
  - [ ] `curl http://localhost:3000/health`
  - [ ] `aws --endpoint-url=http://localhost:4566 s3 ls`
  - [ ] PostgreSQL connection test
  - [ ] Redis connection test
  - Estimated: 1 hour

- [ ] **Infrastructure Build** (Engineer 1)
  - [ ] `npm run build -w @livora/infrastructure`
  - [ ] `npm run cdk:synth`
  - [ ] Review cdk.out/ directory
  - Estimated: 1 hour

- [ ] **Backend Build & Test** (Engineer 2)
  - [ ] `npm run build -w @livora/backend`
  - [ ] `npm run test -w @livora/backend`
  - [ ] Verify all tests pass
  - Estimated: 1 hour

---

## Day 2: Deployment & APIs

### Morning (4 hours)
- [ ] **AWS CDK Bootstrap** (Engineer 1)
  - [ ] `npm run cdk:bootstrap`
  - [ ] Verify S3 bucket created
  - [ ] Verify IAM roles created
  - Estimated: 0.5 hour

- [ ] **Deploy to AWS** (Engineer 1)
  - [ ] `npm run deploy:dev`
  - [ ] Watch CloudFormation events
  - [ ] Verify 3 stacks deployed
  - [ ] Collect outputs (VPC, KMS, Log group)
  - Estimated: 2 hours

- [ ] **Verify AWS Resources** (Engineer 1)
  - [ ] Check VPC in AWS console
  - [ ] Check IAM roles created
  - [ ] Check KMS key
  - [ ] Check CloudWatch logs
  - [ ] Check SNS topic
  - Estimated: 1 hour

- [ ] **Frontend Build** (Engineer 2)
  - [ ] `npm run build -w @livora/frontend`
  - [ ] `npm run dev -w @livora/frontend`
  - [ ] Access http://localhost:5173
  - [ ] Verify dashboard displays
  - Estimated: 1 hour

### Afternoon (4 hours)
- [ ] **Backend Dev Server** (Engineer 2)
  - [ ] `npm run dev -w @livora/backend`
  - [ ] Verify port 3000 responsive
  - [ ] Test health endpoint
  - [ ] Test event ingestion placeholder
  - Estimated: 1 hour

- [ ] **Docker Image Build** (Engineer 1)
  - [ ] `docker build -t livora-enterprise:0.1.0 .`
  - [ ] Verify image built
  - [ ] Test image: `docker run -p 3000:3000 livora-enterprise:0.1.0`
  - [ ] Verify container runs
  - Estimated: 1 hour

- [ ] **GitHub Secrets Setup** (Engineer 1)
  - [ ] Create IAM user for CI/CD
  - [ ] Generate access keys
  - [ ] Add to GitHub secrets (3 secrets)
  - [ ] Verify secrets are private
  - Estimated: 1 hour

- [ ] **SDK & Packages** (Engineer 2)
  - [ ] `npm run build -w @livora/sdk`
  - [ ] Verify dist files generated
  - [ ] Check types exported
  - Estimated: 0.5 hour

---

## Day 3: CI/CD & Testing

### Morning (4 hours)
- [ ] **GitHub Actions Setup** (Both)
  - [ ] Verify workflows in `.github/workflows/`
  - [ ] CI pipeline configured
  - [ ] Deploy workflow configured
  - [ ] Verify no syntax errors
  - Estimated: 0.5 hour

- [ ] **Test CI Pipeline** (Both)
  - [ ] Create feature branch: `test/ci-pipeline`
  - [ ] Make small change
  - [ ] Push to GitHub
  - [ ] Watch Actions tab
  - [ ] Verify all checks pass
  - Estimated: 1 hour

- [ ] **Test Deployment Workflow** (Engineer 1)
  - [ ] Merge feature branch
  - [ ] Push to develop branch
  - [ ] Watch deploy-dev workflow
  - [ ] Verify deploy succeeds or check why
  - Estimated: 1 hour

- [ ] **Backend API Tests** (Engineer 2)
  - [ ] `npm run test -w @livora/backend`
  - [ ] Verify all tests pass
  - [ ] Check test coverage
  - [ ] Document any failing tests
  - Estimated: 1 hour

### Afternoon (4 hours)
- [ ] **Linting & Code Quality** (Both)
  - [ ] `npm run lint` for all workspaces
  - [ ] Fix any linting errors
  - [ ] Verify code style consistent
  - [ ] Prettier format check
  - Estimated: 1 hour

- [ ] **Documentation** (Engineer 1)
  - [ ] Create PHASE_0_COMPLETION.md
  - [ ] Update README.md
  - [ ] Create TROUBLESHOOTING.md
  - [ ] Review all docs for accuracy
  - Estimated: 1.5 hours

- [ ] **Final Verification** (Engineer 2)
  - [ ] Fresh clone of repo
  - [ ] Run setup from scratch
  - [ ] Verify all commands work
  - [ ] Document any issues
  - Estimated: 1.5 hours

---

## Day 4: Documentation & Handover

### Morning (4 hours)
- [ ] **Complete Documentation** (Both)
  - [ ] PHASE_0_GUIDE.md review
  - [ ] README.md finalization
  - [ ] Architecture diagrams (if needed)
  - [ ] Add troubleshooting guide
  - Estimated: 2 hours

- [ ] **Team Knowledge Transfer** (Both)
  - [ ] Walkthrough entire setup
  - [ ] Each engineer can reproduce setup
  - [ ] Document any gotchas
  - [ ] Create video walkthrough (optional)
  - Estimated: 2 hours

### Afternoon (4 hours)
- [ ] **Final Testing** (Both)
  - [ ] End-to-end test: new developer setup
  - [ ] Verify all services work
  - [ ] Verify CI/CD working
  - [ ] Verify AWS resources accessible
  - Estimated: 2 hours

- [ ] **Phase 1 Preparation** (Both)
  - [ ] Review ROADMAP.md Phase 1
  - [ ] Identify Phase 1 tasks
  - [ ] Create Phase 1 tickets
  - [ ] Prepare backlog
  - Estimated: 2 hours

---

## Day 5: Polish & Launch

### Morning (4 hours)
- [ ] **Code Review & Merge** (Both)
  - [ ] Review all Phase 0 code
  - [ ] Ensure quality standards
  - [ ] Merge all PRs to main
  - [ ] Tag v0.1.0 release
  - Estimated: 1 hour

- [ ] **Performance Baseline** (Engineer 1)
  - [ ] Measure backend startup time
  - [ ] Measure API response time
  - [ ] Measure Docker build time
  - [ ] Document metrics
  - Estimated: 1 hour

- [ ] **Security Audit** (Engineer 2)
  - [ ] Check dependencies for vulnerabilities
  - [ ] Verify secrets not in repo
  - [ ] Check IAM permissions minimized
  - [ ] Document security checklist
  - Estimated: 1 hour

- [ ] **Final Demo Prep** (Both)
  - [ ] Prepare Phase 0 demo
  - [ ] Create demo script
  - [ ] Verify all services running
  - [ ] Test demo flow
  - Estimated: 1 hour

### Afternoon (2 hours)
- [ ] **Team Standup** (Both)
  - [ ] Demonstrate all working services
  - [ ] Show CI/CD pipeline
  - [ ] Show CloudWatch dashboard
  - [ ] Confirm Phase 0 complete
  - Estimated: 1 hour

- [ ] **Phase 1 Kickoff** (Both)
  - [ ] Review Phase 1 goals
  - [ ] Assign Phase 1 owners
  - [ ] Schedule first Phase 1 meeting
  - [ ] Celebrate Phase 0! 🎉
  - Estimated: 1 hour

---

## Summary

**Total Hours:** 40 hours (5 days, 8 hours/day)  
**Team:** 2 engineers  
**Hours per Engineer:** ~20 hours

### Output by Day
- **Day 1:** Local environment ready
- **Day 2:** AWS deployed + APIs working
- **Day 3:** CI/CD tested + code quality verified
- **Day 4:** Full documentation complete
- **Day 5:** Phase 0 complete + Phase 1 ready

---

## Critical Blockers to Watch

⚠️ **If these aren't resolved, Phase 0 is NOT complete:**

1. **AWS Deployment Fails**
   - [ ] Verify AWS credentials valid
   - [ ] Verify IAM permissions sufficient
   - [ ] Check CDK version compatibility
   - [ ] Review CloudFormation events for errors

2. **Docker Issues**
   - [ ] Verify Docker daemon running
   - [ ] Check disk space (>20GB needed)
   - [ ] Verify Docker file permissions
   - [ ] Try `docker-compose down -v && docker-compose up --build`

3. **CI/CD Not Triggering**
   - [ ] Verify GitHub secrets created
   - [ ] Check workflow YAML syntax
   - [ ] Verify GitHub Actions enabled
   - [ ] Check PR/push to correct branch

4. **Node/npm Issues**
   - [ ] Verify Node.js v20+
   - [ ] Clear npm cache: `npm cache clean --force`
   - [ ] Delete node_modules, reinstall
   - [ ] Check for git conflicts in package-lock.json

---

## Success Metrics

✅ **Phase 0 Complete When:**

- [ ] All 4 Docker services healthy
- [ ] Backend responds to health check
- [ ] Frontend dashboard accessible
- [ ] CDK stacks deployed to AWS
- [ ] CloudWatch dashboard visible
- [ ] CI/CD pipeline working
- [ ] Docker image builds successfully
- [ ] Team can recreate setup from scratch in <30 minutes

---

## Next Steps (Phase 1)

🚀 **Phase 1 Begins with:**
- Event Ingestion API finalization
- Kinesis stream setup
- SDK event tracking
- First integration test
- Customer API key generation

**Expected Start:** Day 1 of Week 2

---

**Status: READY FOR PHASE 0 EXECUTION** ✅