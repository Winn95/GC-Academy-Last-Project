# 🏃‍♂️ RunningCrew Project

러닝 크루 운영 및 커뮤니티 관리를 위한  
**Spring Boot + React 기반 풀스택 웹 애플리케이션**

---

## 📌 프로젝트 개요

**RunningCrew Project**는  
러닝 크루를 중심으로 한 커뮤니티 운영, 회원 관리, 인증/권한 처리를 제공하는  
풀스택 웹 애플리케이션입니다.

본 프로젝트는 기능 구현뿐 아니라  
**실무 환경을 고려한 설정 분리, 보안 설계, 협업을 위한 Git 관리**를 목표로 설계되었습니다.

---

## 🛠 Tech Stack (Tools)

### Backend
<p align="left">
  <img src="https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?logo=springsecurity&logoColor=white"/>
  <img src="https://img.shields.io/badge/OAuth2-000000?logo=auth0&logoColor=white"/>
  <img src="https://img.shields.io/badge/JPA-Hibernate-59666C?logo=hibernate&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white"/>
</p>

### Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white"/>
</p>

### Infra / DevOps
<p align="left">
  <img src="https://img.shields.io/badge/AWS-EC2/RDS/S3-232F3E?logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-GitHub-F05032?logo=git&logoColor=white"/>
</p>

---

## 📁 프로젝트 구조

### 기본 구조
<img src="https://github.com/user-attachments/assets/cf81a93c-a827-4709-ad3c-000c44f55293" width="300"/>

### Backend 구조
<img src="https://github.com/user-attachments/assets/971f5226-eed7-4704-bccc-8ada815e1a7c" width="300"/>

### Frontend(vite) 구조
<img src="https://github.com/user-attachments/assets/4b365d59-884f-4f86-be98-a69c8347db65" width="300"/>

---

## 🔐 설정 파일 분리 설계

본 프로젝트는 실무 환경을 고려하여  
**Spring Boot 설정 파일을 public / secret으로 분리하여 관리했습니다.**

이는 GitHub에 민감 정보(DB 비밀번호, OAuth2 Client Secret 등)가  
노출되는 것을 방지하고,  
**협업 및 배포 환경에서 설정 충돌을 최소화하기 위함입니다.**

---

## ⚙️ Application 설정 구조

### application.yml
`application.yml`은 실제 설정 값을 직접 가지지 않고,  
환경별 설정 파일을 import하는 **엔트리 포인트 역할**만 담당합니다.

```yml
spring:
  config:
    import:
      - classpath:application-public.yml
      - optional:classpath:application-secret.yml
application-public.yml
Git에 포함

서버 포트, JPA 설정 등 공개 가능한 설정

application-secret.yml
Git에 포함되지 않음

DB 비밀번호, JWT Secret Key 등 민감 정보

🔑 OAuth2 설정 분리
OAuth2 설정 역시 동일한 기준으로 분리하여 관리했습니다.

oauth2-public.yml : provider 정보, scope 등 공개 가능 설정

oauth2-secret.yml : client-id, client-secret 등 민감 정보

이를 통해 OAuth2 Client Secret이
버전 관리 시스템에 노출되지 않도록 설계했습니다.

oauth2.yml (엔트리 포인트)
yml
코드 복사
spring:
  config:
    import:
      - classpath:oauth2-public.yml
      - optional:classpath:oauth2-secret.yml
🔐 Git 관리 정책 요약
파일	Git 관리

gitIgnore 처리 (민감정보 다수 포함)
application-secret.yml
oauth2-secret.yml

gitIgnore 처리안함 (yml 틀)
application-public.yml
oauth2-public.yml

🚀 실행 방법
Backend
bash
코드 복사
cd backendspring
./gradlew bootRun
Frontend
bash
코드 복사
cd vite-front
npm install
npm run dev
🎯 설계 포인트 요약
설정 파일 public / secret 분리로 보안 리스크 최소화

application.yml, oauth2.yml을 엔트리 포인트로 사용해 로딩 구조 명확화

OAuth2 Client Secret 보호 설계

프론트엔드 / 백엔드 책임 분리

협업 친화적인 Git 관리 정책

👨‍💻 개발자
GitHub: https://github.com/Winn95
