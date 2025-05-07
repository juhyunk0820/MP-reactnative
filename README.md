# MP-reactnative

### 프로젝트 실행 (Mac환경)

1. postgresql 설치

2. postgresql 실행 및 종료
   - 실행 명령어:`brew services start postgresql@14`
   - 종료 명령어:`brew services stop postgresql@14`
3. PG admin: DB 생성 및 관리

4. 서버 폴더 실행
   `npm run start:dev`
5. RN 프로젝트 실행
   `npx react-native start --reset-cache`
   -> Xcode에서 IOS빌드 실행 or 안드로이드 애뮬레이터 실행 후 안드로이드 device launch
