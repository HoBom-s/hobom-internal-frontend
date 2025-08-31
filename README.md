# Analytics Hub

데이터 분석 및 시각화를 위한 현대적인 웹 대시보드 애플리케이션입니다. Elasticsearch/Kibana 기반의 데이터를 효과적으로 관리하고 시각화할 수 있는 통합 플랫폼입니다.

## 🚀 주요 기능

- **대시보드 관리**: 맞춤형 대시보드 생성 및 관리
- **인덱스 관리**: Elasticsearch 인덱스 관리 및 모니터링
- **시각화 관리**: 다양한 차트 및 그래프를 통한 데이터 시각화
- **데이터 검색**: 강력한 검색 기능으로 실시간 데이터 탐색
- **통계 및 분석**: 대시보드 통계 및 개요 기능
- **Kibana 통합**: 기존 Kibana 시각화와의 원활한 연동

## 🛠️ 기술 스택

### Core Framework

- **React 19** - 최신 React 버전 사용
- **TypeScript** - 타입 안전성 보장
- **Vite** - 빠른 개발 서버와 빌드 도구

### UI & Styling

- **Material-UI (MUI)** - 디자인 시스템 및 컴포넌트 라이브러리
- **Emotion** - CSS-in-JS 스타일링
- **Pretendard** - 한글 웹폰트

### Data & State Management

- **TanStack React Query** - 서버 상태 관리 및 데이터 페칭
- **React Router DOM** - 클라이언트 사이드 라우팅

### Visualization & Charts

- **Recharts** - React 기반 차트 라이브러리
- **SimpleBar React** - 커스텀 스크롤바

### Development Tools

- **ESLint** - 코드 품질 관리
- **TypeScript ESLint** - 타입 체킹

## 📁 프로젝트 구조

```
src/
├── app/                    # 애플리케이션 설정
│   ├── layouts/           # 레이아웃 컴포넌트
│   └── providers/         # React Context Providers
├── entities/              # 비즈니스 엔티티
├── features/              # 피처별 모듈
│   ├── manage-dashboard/  # 대시보드 관리
│   ├── manage-indices/    # 인덱스 관리
│   ├── manage-visualizations/ # 시각화 관리
│   └── search-data/       # 데이터 검색
├── pages/                 # 페이지 컴포넌트
├── shared/                # 공유 리소스
│   ├── config/           # 설정 파일
│   └── router/           # 라우터 설정
├── widgets/               # 위젯 컴포넌트
│   ├── app-header/       # 앱 헤더
│   ├── app-sidebar/      # 사이드바
│   ├── dashboard-overview/ # 대시보드 개요
│   ├── dashboard-stats/  # 통계 위젯
│   └── kibana-visualizations/ # Kibana 시각화
└── packages/              # 내부 패키지
    ├── bom/              # 함수형 프로그래밍 유틸리티
    └── core/             # 코어 유틸리티
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+
- Yarn 패키지 매니저

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 빌드 미리보기
yarn preview
```

### 코드 품질 관리

```bash
# ESLint 실행
yarn lint
```

## 🏗️ 아키텍처 원칙

### Feature-based Architecture

- 각 기능별로 독립적인 모듈로 구성
- 관심사 분리 및 유지보수성 향상

### Shared Components

- 재사용 가능한 컴포넌트들을 공유 리소스로 관리
- 일관된 디자인과 사용자 경험 보장

### Utility Library

- 자체 개발한 `bom` 패키지를 통한 함수형 프로그래밍 지원
- 코드 재사용성 및 가독성 향상

## 🔧 개발 환경 설정

### ESLint 설정

프로덕션 애플리케이션 개발 시 타입 인식 린팅 규칙을 활성화하는 것을 권장합니다:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

### React 전용 린팅 규칙 추가

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## 📚 추가 리소스

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [TanStack Query Documentation](https://tanstack.com/query/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
