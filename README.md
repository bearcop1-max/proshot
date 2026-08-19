# ProShot — 셀카 한 장으로 AI 프로필 사진

**ProShot**은 최첨단 생성형 AI 모델(Flux PuLID)을 사용하여 스마트폰 속 단 한 장의 셀카 사진을 자연스럽고 전문적인 비즈니스 헤드샷 및 프로필 사진으로 완성해 주는 프리미엄 랜딩 페이지 웹 애플리케이션입니다.

---

## 🛠️ 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: `@fal-ai/client` (Flux PuLID 모델 사용)

---

## 🚀 로컬 실행 방법

1. **의존성 패키지 설치**
   ```bash
   npm install
   ```

2. **환경변수 설정**
   - 프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래와 같이 API 키를 추가합니다. (이 파일은 `.gitignore`에 의해 깃 허브에 업로드되지 않고 로컬에만 안전하게 보관됩니다.)
   ```env
   FAL_KEY=여러분의_FAL_API_키_값
   ```

3. **로컬 개발 서버 실행**
   ```bash
   npm run dev
   ```
   실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

---

## ☁️ Vercel 배포 가이드 (Deployment Steps)

이 프로젝트는 서버리스 함수가 Node.js 런타임을 사용하며, `@fal-ai/client`와 `Buffer`를 기반으로 무거운 이미지 처리를 수행하므로 **Node.js 런타임**으로 구동되도록 설정되어 있습니다 (`/app/api/generate/route.ts`).

### 1단계: Git 저장소 생성 및 코드 푸시 (CLI/GitHub)
1. 로컬 폴더에서 Git 저장소를 초기화하고 원격 깃허브 저장소(GitHub Repository)에 코드를 푸시합니다.
   ```bash
   git init
   git add .
   git commit -m "feat: ProShot AI 프로필 웹앱 구현 완료"
   git branch -M main
   git remote add origin <여러분의-깃허브-레포지토리-주소>
   git push -u origin main
   ```

### 2단계: Vercel 대시보드 배포 설정
1. **[Vercel Dashboard](https://vercel.com/new)**에 로그인하여 **Add New Project**를 선택합니다.
2. 방금 푸시한 GitHub 레포지토리를 연동하여 **Import** 버튼을 누릅니다.
3. **Configure Project** 화면에서 다른 옵션들은 기본값(Next.js 자동 인식)으로 두고, 아래와 같이 **Environment Variables** 설정을 진행합니다.
   - **Key**: `FAL_KEY`
   - **Value**: 발급받으신 실제 Fal.ai API 키 값 입력
   - **Add** 버튼을 눌러 목록에 추가되었는지 확인합니다. (이 키는 서버 사이드에서만 안전하게 보관되고 클라이언트로 절대 유출되지 않습니다.)
4. 하단의 **Deploy** 버튼을 누르면 배포 빌드가 시작됩니다. 약 1분 후 배포가 완료되면 제공되는 도메인 주소로 웹에 접속할 수 있습니다!

---

## ⚠️ 중요 주의사항
- 로컬 환경변수 파일 `.env.local`은 절대로 Git 저장소에 커밋되어 노출되지 않도록 해야 합니다. 본 프로젝트는 이미 `.gitignore`에 안전하게 등록되어 있습니다.
