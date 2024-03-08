### 개인 프로젝트 
#### 독서 기록 백엔드 서버 만들기
[api 명세서 링크](https://pollen-experience-ed3.notion.site/278039fcb4cf4826bc5840d5e1c9c659?pvs=4)

- 유저 부분
  회원가입, 로그인 로그아웃 회원탈퇴 회원정보 수정 구현


  로그인시 세션에 저장

- 책 부분
  책 등록, 책조회, 책정보수정, 책정보 삭제 구현

- 책 기록부분
- 글귀등록, 글귀수정, 책의 글귀조회, 글귀삭제

### 백앤드 기술스택
웹프레임워크: Express.js



패키지 매니저: yarn



모듈 시스템: ES6 



데이터베이스: AWS RDS에서 대여한 MySQL



ORM: Prisma ORM

### 사용 패키지
```javascript
    "@prisma/client": "^5.10.2",
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.4.5",
    "express": "^4.18.3",
    "express-session": "^1.18.0",
    "joi": "^17.12.2",,
    "nodemon": "^3.1.0",
    "prisma": "^5.10.2",
    "winston": "^3.12.0",
    "winston-daily-rotate-file": "^5.0.0"
  }
}
```

### Devlop
public폴더에 프론트 엔드 부분인 html, css, js를 넣고 express와 연결
public 폴더 안에 views, styles, scripts 하위 폴더를 만들어 css, javascript 연결 
```javascript
app.use(express.static('public'));
app.get('/styles/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/styles/style.css'));
});

app.get('/scripts/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scripts/script.js'));
});
```
