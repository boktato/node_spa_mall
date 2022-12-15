const express = require("express");
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");
const connect = require("./schemas");
connect();

app.post("/", (req, res) => {
    console.log(req.body);

    res.send("기본 uri의 포스트 메시지 정상 실행");
});

app.get("/", (req, res) => {
    console.log(req.query);

    const obj = {
        key1: "value 입니다.",
        이름: "이름 입니다.",
    };

    res.status(400).json(obj);
});

app.get("/:id", (req, res) => {
    console.log(req.params);

    res.send(":id URI에 반환");
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// localhost:3000/api -> goodsRouter
// app.use("/api", [goodsRouter, usersRouter]); 이렇게 배열로 사용 가능

app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});
