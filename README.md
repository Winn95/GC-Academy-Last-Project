🏃‍♂️ RunningCrew Project

러닝 크루 운영 및 커뮤니티 관리를 위한
Spring Boot + React 기반 풀스택 웹 애플리케이션

📌 프로젝트 개요

RunningCrew Project는
러닝 크루를 중심으로 한 커뮤니티 운영, 회원 관리, 인증/권한 처리를 제공하는
풀스택 웹 애플리케이션입니다.

본 프로젝트는 기능 구현뿐 아니라 실무 환경을 고려한 설정 분리, 보안 설계, 협업을 위한 Git 관리를 목표로 설계되었습니다.

🛠 기술 스택
Backend

Java 17

Spring Boot 3.x

Spring Security

OAuth2

JPA (Hibernate)

MySQL

Gradle

Frontend

React (Vite)

JavaScript (ES6+)

Axios

CSS

Infra / DevOps

AWS (EC2, RDS, S3)

Docker

Nginx

Git / GitHub

📁 프로젝트 구조
RunningCrew Project
├─ backendspring
│  ├─ src/main/resources
│  │  ├─ application.yml
│  │  ├─ application-public.yml
│  │  ├─ application-secret.yml
│  │  ├─ oauth2.yml
│  │  ├─ oauth2-public.yml
│  │  └─ oauth2-secret.yml
│  └─ build.gradle
│
├─ vite-front
│  ├─ src
│  ├─ public
│  └─ package.json
│
├─ docker-compose.yml
├─ .gitignore
└─ README.md

🔐 설정 파일 분리 설계

본 프로젝트는 실무 환경을 고려하여
Spring Boot 설정 파일을 public / secret으로 분리하여 관리했습니다.

이는 GitHub에 민감 정보(DB 비밀번호, OAuth2 Client Secret 등)가
노출되는 것을 방지하고,
협업 및 배포 환경에서 설정 충돌을 최소화하기 위함입니다.

⚙️ application 설정 구조
application.yml

application.yml은 실제 설정 값을 직접 가지지 않고,
환경별 설정 파일을 import하는 엔트리 포인트 역할만 담당합니다.

spring:
  config:
    import:
      - classpath:application-public.yml
      - optional:classpath:application-secret.yml

application-public.yml

Git에 포함

서버 포트, JPA 설정 등 공개 가능한 설정

application-secret.yml

Git에 절대 포함되지 않음

DB 비밀번호, JWT Secret Key 등 민감 정보

🔑 OAuth2 설정 분리

OAuth2 설정 역시 동일한 기준으로 분리하여 관리했습니다.

oauth2-public.yml : provider 정보, scope 등 공개 가능 설정

oauth2-secret.yml : client-id, client-secret 등 민감 정보

이를 통해 OAuth2 Client Secret이
버전 관리 시스템에 노출되지 않도록 설계했습니다.

oauth2.yml (엔트리 포인트)
spring:
  config:
    import:
      - classpath:oauth2-public.yml
      - optional:classpath:oauth2-secret.yml

🔐 Git 관리 정책 요약
파일	Git 관리
application.yml	✅ 포함
application-public.yml	✅ 포함
application-secret.yml	❌ 제외
oauth2.yml	✅ 포함
oauth2-public.yml	✅ 포함
oauth2-secret.yml	❌ 제외

🚀 실행 방법
Backend
cd backendspring
./gradlew bootRun

Frontend
cd vite-front
npm install
npm run dev

🎯 설계 포인트 요약

설정 파일 public / secret 분리로 보안 리스크 최소화

application.yml, oauth2.yml을 엔트리 포인트로 사용해 로딩 구조 명확화

OAuth2 Client Secret 보호 설계

프론트/백엔드 책임 분리 및 협업 친화적 Git 정책

👨‍💻 개발자

GitHub: https://github.com/Winn95